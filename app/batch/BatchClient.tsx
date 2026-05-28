"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { convertString, suggestOutputName } from "./converter";
import styles from "./batch.module.css";

const MAX_FILE_BYTES = 25 * 1024 * 1024;

type ZoneState = "idle" | "processing" | "success" | "error";

interface FileResult {
  inputName: string;
  outName: string;
  url: string;
  rowCount: number;
  skipped: number;
  warnings: string[];
}

interface FileError {
  name: string;
  error: string;
}

function readFileAsText(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = () => reject(reader.error || new Error("Read failed"));
    reader.readAsText(file, "utf-8");
  });
}

export default function BatchClient() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const objectUrlsRef = useRef<string[]>([]);

  const [zoneState, setZoneState] = useState<ZoneState>("idle");
  const [dragOver, setDragOver] = useState(false);
  const [fileLabel, setFileLabel] = useState("");
  const [results, setResults] = useState<FileResult[]>([]);
  const [errors, setErrors] = useState<FileError[]>([]);
  const [hasRun, setHasRun] = useState(false);

  const revokeAllUrls = useCallback(() => {
    while (objectUrlsRef.current.length) {
      const url = objectUrlsRef.current.pop();
      if (url) {
        try {
          URL.revokeObjectURL(url);
        } catch {
          /* noop */
        }
      }
    }
  }, []);

  useEffect(() => {
    const handler = () => revokeAllUrls();
    window.addEventListener("beforeunload", handler);
    return () => {
      window.removeEventListener("beforeunload", handler);
      revokeAllUrls();
    };
  }, [revokeAllUrls]);

  const reset = useCallback(() => {
    revokeAllUrls();
    setZoneState("idle");
    setDragOver(false);
    setFileLabel("");
    setResults([]);
    setErrors([]);
    setHasRun(false);
    if (fileInputRef.current) fileInputRef.current.value = "";
  }, [revokeAllUrls]);

  const handleFiles = useCallback(
    async (fileList: FileList | null) => {
      if (!fileList) return;
      const files = Array.from(fileList).filter(Boolean);
      if (files.length === 0) return;

      revokeAllUrls();
      setResults([]);
      setErrors([]);
      setHasRun(true);
      setZoneState("processing");

      const labels = files.map((f) => f.name);
      setFileLabel(labels.length === 1 ? labels[0] : `${labels.length} files`);

      const newResults: FileResult[] = [];
      const newErrors: FileError[] = [];

      for (const file of files) {
        if (file.size > MAX_FILE_BYTES) {
          newErrors.push({
            name: file.name,
            error: `File too large (${(file.size / 1024 / 1024).toFixed(1)} MB). Max 25 MB.`,
          });
          continue;
        }
        try {
          const text = await readFileAsText(file);
          const out = convertString(text);
          const outName = suggestOutputName(file.name);
          const blob = new Blob([out.csv], { type: "text/csv;charset=utf-8" });
          const url = URL.createObjectURL(blob);
          objectUrlsRef.current.push(url);
          newResults.push({
            inputName: file.name,
            outName,
            url,
            rowCount: out.rowCount,
            skipped: out.skipped,
            warnings: out.warnings,
          });
        } catch (err) {
          const message = err instanceof Error ? err.message : String(err);
          newErrors.push({ name: file.name, error: message });
        }
      }

      setResults(newResults);
      setErrors(newErrors);
      setZoneState(newResults.length === 0 ? "error" : "success");
    },
    [revokeAllUrls]
  );

  const onDragOver: React.DragEventHandler<HTMLDivElement> = (e) => {
    e.preventDefault();
    setDragOver(true);
  };
  const onDragLeave: React.DragEventHandler<HTMLDivElement> = () => {
    setDragOver(false);
  };
  const onDrop: React.DragEventHandler<HTMLDivElement> = (e) => {
    e.preventDefault();
    setDragOver(false);
    if (e.dataTransfer && e.dataTransfer.files) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const zoneClass = [
    styles.dropZone,
    dragOver ? styles.dragOver : "",
    zoneState === "processing" ? styles.processing : "",
    zoneState === "success" ? styles.success : "",
    zoneState === "error" ? styles.error : "",
  ]
    .filter(Boolean)
    .join(" ");

  const zoneIcon =
    zoneState === "processing"
      ? "⏳"
      : zoneState === "success"
        ? "✅"
        : zoneState === "error"
          ? "❌"
          : "📂";

  const zoneText =
    zoneState === "processing" ? (
      "Converting…"
    ) : zoneState === "success" ? (
      "Conversion complete!"
    ) : zoneState === "error" ? (
      "Conversion failed — see details below"
    ) : (
      <>
        Drag &amp; drop your Automix CSV here
        <br />
        or <strong>click to browse</strong>
      </>
    );

  const allWarnings = results.flatMap((r) =>
    r.warnings.map((w) => (results.length > 1 ? `[${r.inputName}] ${w}` : w))
  );
  const warningsDisplay =
    allWarnings.length > 30
      ? allWarnings.slice(0, 30).join("\n") + `\n… and ${allWarnings.length - 30} more`
      : allWarnings.join("\n");

  const resultTitle =
    results.length === 0
      ? "Error"
      : results.length === 1
        ? "Conversion Complete"
        : `Converted ${results.length} files`;

  return (
    <main className={styles.page}>
      <div className={styles.container}>
        <header className={styles.header}>
          <h1>Automix Data Bridge</h1>
          <p>
            Convert MHW Automix exports to ERP-ready CSV — runs in your browser,
            your data never leaves your device.
          </p>
        </header>

        <div
          className={zoneClass}
          onDragOver={onDragOver}
          onDragLeave={onDragLeave}
          onDrop={onDrop}
          onClick={() => fileInputRef.current?.click()}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              fileInputRef.current?.click();
            }
          }}
        >
          <div className={styles.dropIcon} aria-hidden="true">
            {zoneIcon}
          </div>
          <div className={styles.dropText}>{zoneText}</div>
          {fileLabel && <div className={styles.fileName}>{fileLabel}</div>}
          <input
            ref={fileInputRef}
            type="file"
            accept=".csv,text/csv"
            multiple
            hidden
            onChange={(e) => handleFiles(e.target.files)}
          />
        </div>

        {hasRun && (
          <section className={styles.result} aria-live="polite">
            <h3
              className={
                results.length === 0 ? styles.titleError : styles.titleSuccess
              }
            >
              {resultTitle}
            </h3>
            <div className={styles.stat}>
              {results.map((r, i) => (
                <div key={`r-${i}`}>
                  <strong>{r.inputName}</strong> → <span>{r.rowCount}</span> rows,{" "}
                  <span>{r.skipped}</span> skipped
                </div>
              ))}
              {errors.map((e, i) => (
                <div key={`e-${i}`} className={styles.statError}>
                  {e.name}: {e.error}
                </div>
              ))}
            </div>

            {allWarnings.length > 0 && (
              <div className={styles.warnList}>{warningsDisplay}</div>
            )}

            {results.length > 0 && (
              <div className={styles.btnRow}>
                {results.map((r, idx) => (
                  <a
                    key={`d-${idx}`}
                    href={r.url}
                    download={r.outName}
                    className={`${styles.btn} ${idx === 0 ? styles.btnPrimary : styles.btnSecondary}`}
                  >
                    Download {r.outName}
                  </a>
                ))}
              </div>
            )}

            <div className={styles.btnRow}>
              <button
                type="button"
                className={`${styles.btn} ${styles.btnSecondary}`}
                onClick={reset}
              >
                Convert another
              </button>
            </div>
          </section>
        )}

        <footer className={styles.footer}>
          WrenchIt Software Solutions · Automix Data Bridge
        </footer>
      </div>
    </main>
  );
}

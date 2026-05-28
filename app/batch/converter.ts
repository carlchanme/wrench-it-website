/**
 * Automix Data Bridge — Conversion Engine (browser TS port)
 *
 * Converts MHW Automix batch-plant CSV exports (R-prefixed files)
 * into ERP-ready CSV files matching the BG.csv column structure.
 */

export type TruckCompanyMap = Record<string, string>;
export type CustomerRates = Record<string, number>;

export interface ConverterConfig {
  minimumM3: number;
  defaultRate: number;
  truckCompanyMap: TruckCompanyMap;
  customerRates: CustomerRates;
}

export const DEFAULT_CONFIG: ConverterConfig = {
  minimumM3: 5,
  defaultRate: 35.0,
  truckCompanyMap: {
    EDF: "EXTROBRIGHT",
    L: "NBT",
  },
  customerRates: {},
};

export const ERP_HEADERS = [
  "TICKET",
  "DATE",
  "TIME",
  "CUSTOMER",
  "SITE",
  "GRADE",
  "TRUCKNO",
  "M³",
  "DRIVER",
  "MIN M³",
  "TOTAL M³",
  "RATE",
  "AMT",
  "DIST",
  "REMARKS",
] as const;

export type AutomixRow = Record<string, string>;
export type ErpRow = Record<(typeof ERP_HEADERS)[number], string>;

export interface ConvertResult {
  csv: string;
  rowCount: number;
  skipped: number;
  warnings: string[];
}

export function parseAutomixCSV(raw: string): AutomixRow[] {
  const lines = raw.split(/\r?\n/).filter((l) => l.trim().length > 0);
  if (lines.length < 2) {
    throw new Error("CSV file appears empty or has no data rows.");
  }

  const headers = lines[0].split(",").map((h) => h.trim());
  const rows: AutomixRow[] = [];

  for (let i = 1; i < lines.length; i++) {
    const values = lines[i].split(",");
    const row: AutomixRow = {};
    headers.forEach((h, idx) => {
      row[h] = (values[idx] || "").trim();
    });
    rows.push(row);
  }
  return rows;
}

function resolveDriver(truckNumber: string, truckCompanyMap: TruckCompanyMap): string {
  if (!truckNumber) return "";
  const prefixes = Object.keys(truckCompanyMap).sort((a, b) => b.length - a.length);
  for (const prefix of prefixes) {
    if (truckNumber.toUpperCase().startsWith(prefix.toUpperCase())) {
      return truckCompanyMap[prefix];
    }
  }
  return truckNumber;
}

function resolveRate(customerName: string, config: ConverterConfig): number {
  if (customerName && config.customerRates) {
    for (const [substr, rate] of Object.entries(config.customerRates)) {
      if (customerName.toUpperCase().includes(substr.toUpperCase())) {
        return rate;
      }
    }
  }
  return config.defaultRate;
}

function fmtNum(n: number): string {
  return n.toFixed(2);
}

export function convertRow(automixRow: AutomixRow, config: ConverterConfig): ErpRow {
  const loadSize = parseFloat(automixRow["Load Size"]) || 0;
  const minM3Threshold = config.minimumM3;

  let minM3 = 0;
  let totalM3 = loadSize;

  if (loadSize < minM3Threshold) {
    minM3 = minM3Threshold - loadSize;
    totalM3 = minM3Threshold;
  }

  const rate = resolveRate(automixRow["Customer Name"], config);
  const amt = totalM3 * rate;

  const truckNo = automixRow["Truck Number"] || "";
  const driver = resolveDriver(truckNo, config.truckCompanyMap);

  let time = automixRow["Time"] || "";
  if (time && (time.match(/:/g) || []).length === 1) {
    time = time + ":00";
  }
  if (time.startsWith("0")) {
    time = time.substring(1);
  }

  return {
    TICKET: automixRow["Docket Number"] || "",
    DATE: automixRow["Date"] || "",
    TIME: time,
    CUSTOMER: automixRow["Customer Name"] || "",
    SITE: automixRow["Location Name"] || "",
    GRADE: automixRow["Grade"] || "",
    TRUCKNO: truckNo,
    "M³": fmtNum(loadSize),
    DRIVER: driver,
    "MIN M³": minM3 > 0 ? fmtNum(minM3) : " \t-   ",
    "TOTAL M³": " \t" + fmtNum(totalM3) + " ",
    RATE: " \t" + fmtNum(rate) + " ",
    AMT: " \t" + fmtNum(amt) + " ",
    DIST:
      automixRow["DISTANCE"] && automixRow["DISTANCE"] !== "0"
        ? automixRow["DISTANCE"]
        : "",
    REMARKS: automixRow["Location Address"] || "",
  };
}

export function convertAll(
  automixRows: AutomixRow[],
  config: Partial<ConverterConfig> = {}
): { erpRows: ErpRow[]; warnings: string[] } {
  const cfg: ConverterConfig = { ...DEFAULT_CONFIG, ...config };
  const erpRows: ErpRow[] = [];
  const warnings: string[] = [];

  for (let i = 0; i < automixRows.length; i++) {
    const row = automixRows[i];

    const docket = (row["Docket Number"] || "").trim();
    const loadSize = parseFloat(row["Load Size"]) || 0;
    const customerName = (row["Customer Name"] || "").trim();

    if (!docket && loadSize === 0 && !customerName) {
      warnings.push(
        `Row ${i + 2}: Skipped — no docket number, zero load, no customer.`
      );
      continue;
    }

    if (!docket) {
      warnings.push(`Row ${i + 2}: Missing docket/ticket number (kept in output).`);
    }

    if (!customerName) {
      warnings.push(`Row ${i + 2}: Missing customer name.`);
    }

    erpRows.push(convertRow(row, cfg));
  }

  return { erpRows, warnings };
}

export function toCSV(erpRows: ErpRow[]): string {
  const headerLine = ERP_HEADERS.join(",") + ",";
  const dataLines = erpRows.map((row) => {
    return (
      ERP_HEADERS.map((h) => {
        const val = row[h] || "";
        if (val.includes(",")) return `"${val}"`;
        return val;
      }).join(",") + ","
    );
  });
  return [headerLine, ...dataLines].join("\n");
}

export function convertString(
  rawCSV: string,
  config: Partial<ConverterConfig> = {}
): ConvertResult {
  const automixRows = parseAutomixCSV(rawCSV);
  const { erpRows, warnings } = convertAll(automixRows, config);
  const csv = toCSV(erpRows);
  return {
    csv,
    rowCount: erpRows.length,
    skipped: automixRows.length - erpRows.length,
    warnings,
  };
}

export function suggestOutputName(inputName: string): string {
  const stem = inputName.replace(/\.[^.]+$/, "");
  return `BG_${stem}.csv`;
}

import type { Metadata } from "next";
import BatchClient from "./BatchClient";

export const metadata: Metadata = {
  title: "Automix Data Bridge",
  description: "Convert MHW Automix exports to ERP-ready CSV in your browser.",
  robots: { index: false, follow: false },
  alternates: { canonical: undefined },
};

export default function BatchPage() {
  return <BatchClient />;
}

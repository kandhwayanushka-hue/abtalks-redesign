import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CERTIFICATES } from "@/data/certificates";
import CertificateView from "@/components/certificate/CertificateView";

export const dynamicParams = false;

export function generateStaticParams() {
  return CERTIFICATES.map((c) => ({ part: String(c.part) }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ part: string }>;
}): Promise<Metadata> {
  const { part } = await params;
  const cert = CERTIFICATES.find((c) => c.part === Number(part));
  if (!cert) return { title: "Certificate · ABTalks Redesigned" };
  return {
    title: `Certificate of Achievement · Part ${cert.part} · ABTalks Redesigned`,
    description: `${cert.title} — ${cert.difficulty} difficulty, Days ${cert.start}–${cert.end}.`,
  };
}

export default async function CertificatePage({ params }: { params: Promise<{ part: string }> }) {
  const { part } = await params;
  const n = Number(part);
  if (!CERTIFICATES.some((c) => c.part === n)) notFound();
  return <CertificateView part={n} />;
}

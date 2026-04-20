// DNS lookups via Cloudflare DNS-over-HTTPS (CORS-enabled, no proxy needed).
// Returns simplified info about A, AAAA, MX, TXT, SPF, DMARC.

export interface DnsInfo {
  domain: string;
  hasA: boolean;
  aRecords: string[];
  hasAAAA: boolean;
  aaaaRecords: string[];
  hasMx: boolean;
  mxRecords: string[];
  hasSpf: boolean;
  spfRecord: string | null;
  hasDmarc: boolean;
  dmarcRecord: string | null;
  hasCaa: boolean;
  caaRecords: string[];
}

const DOH = "https://cloudflare-dns.com/dns-query";

interface DohAnswer {
  name: string;
  type: number;
  TTL: number;
  data: string;
}

async function query(name: string, type: string): Promise<DohAnswer[]> {
  try {
    const res = await fetch(`${DOH}?name=${encodeURIComponent(name)}&type=${type}`, {
      headers: { Accept: "application/dns-json" },
    });
    if (!res.ok) return [];
    const json = await res.json();
    return Array.isArray(json.Answer) ? (json.Answer as DohAnswer[]) : [];
  } catch {
    return [];
  }
}

function cleanTxt(data: string): string {
  // DoH wraps TXT records in quotes and may have multiple chunks
  return data.replace(/"/g, "").replace(/\s+/g, " ").trim();
}

export async function lookupDns(hostname: string): Promise<DnsInfo> {
  // Strip port and lowercase
  const domain = hostname.replace(/:\d+$/, "").toLowerCase();

  const [a, aaaa, mx, txt, dmarc, caa] = await Promise.all([
    query(domain, "A"),
    query(domain, "AAAA"),
    query(domain, "MX"),
    query(domain, "TXT"),
    query(`_dmarc.${domain}`, "TXT"),
    query(domain, "CAA"),
  ]);

  const txtClean = txt.map((r) => cleanTxt(r.data));
  const dmarcClean = dmarc.map((r) => cleanTxt(r.data));

  const spfRecord = txtClean.find((t) => /^v=spf1/i.test(t)) || null;
  const dmarcRecord = dmarcClean.find((t) => /^v=dmarc1/i.test(t)) || null;

  return {
    domain,
    hasA: a.length > 0,
    aRecords: a.map((r) => r.data),
    hasAAAA: aaaa.length > 0,
    aaaaRecords: aaaa.map((r) => r.data),
    hasMx: mx.length > 0,
    mxRecords: mx.map((r) => r.data),
    hasSpf: !!spfRecord,
    spfRecord,
    hasDmarc: !!dmarcRecord,
    dmarcRecord,
    hasCaa: caa.length > 0,
    caaRecords: caa.map((r) => r.data),
  };
}

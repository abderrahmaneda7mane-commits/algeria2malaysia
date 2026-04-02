const EUR_PER_MYR = 1 / 5;

let cachedRates: { eurPerMyr: number; updatedAt: number } = {
  eurPerMyr: EUR_PER_MYR,
  updatedAt: 0,
};

const ONE_DAY_MS = 24 * 60 * 60 * 1000;

export async function refreshRates(): Promise<void> {
  const now = Date.now();
  if (now - cachedRates.updatedAt < ONE_DAY_MS) return;
  try {
    const res = await fetch(
      "https://api.exchangerate-api.com/v4/latest/MYR",
    );
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = (await res.json()) as { rates: Record<string, number> };
    const rate = data.rates["EUR"];
    if (rate && rate > 0) {
      cachedRates = { eurPerMyr: rate, updatedAt: now };
    }
  } catch {
    cachedRates = { eurPerMyr: EUR_PER_MYR, updatedAt: now };
  }
}

export function myrToEur(myr: number): number {
  return Math.round(myr * cachedRates.eurPerMyr);
}

export function getRates() {
  return { ...cachedRates };
}

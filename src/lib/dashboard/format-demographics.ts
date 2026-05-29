type DemoRow = {
  country: string;
  ageRange: string;
  genderMalePct: number;
  genderFemalePct: number;
};

export function summarizeDemographics(rows: DemoRow[]) {
  if (!rows.length) return null;

  const byCountry = new Map<string, number>();
  const byAge = new Map<string, number>();
  let totalFemale = 0;
  let totalMale = 0;

  for (const row of rows) {
    byCountry.set(row.country, (byCountry.get(row.country) ?? 0) + 1);
    byAge.set(row.ageRange, (byAge.get(row.ageRange) ?? 0) + 1);
    totalFemale += row.genderFemalePct;
    totalMale += row.genderMalePct;
  }

  const topCountry = [...byCountry.entries()].sort((a, b) => b[1] - a[1])[0];
  const topAge = [...byAge.entries()].sort((a, b) => b[1] - a[1])[0];
  const avgFemale = Math.round(totalFemale / rows.length);
  const avgMale = Math.round(totalMale / rows.length);

  return {
    topCountry: topCountry?.[0],
    topAge: topAge?.[0],
    womenPct: avgFemale >= avgMale ? avgFemale : undefined,
    menPct: avgMale > avgFemale ? avgMale : undefined,
  };
}

const ALLOWED_UNI_DOMAINS = [
  "sutd.edu.sg",
  "u.nus.edu",
  "nus.edu.sg",
  "e.ntu.edu.sg",
  "ntu.edu.sg",
  "smu.edu.sg",
  "suss.edu.sg",
  "sit.singaporetech.edu.sg",
] as const;

export function extractEmailDomain(email: string) {
  return email.split("@")[1]?.toLowerCase() ?? "";
}

export function isAllowedUniversityEmail(email: string) {
  const domain = extractEmailDomain(email);
  return ALLOWED_UNI_DOMAINS.includes(
    domain as (typeof ALLOWED_UNI_DOMAINS)[number],
  );
}
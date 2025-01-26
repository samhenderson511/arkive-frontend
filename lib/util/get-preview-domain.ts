export function getPreviewDomain(hostname: string) {
  const previewDomains = process.env.PREVIEW_DOMAINS;

  const previewDomain = previewDomains
    ?.split(",")
    ?.find((domain) => hostname.includes(domain.replace("*.", "")))
    ?.replace("*", "");

  return previewDomain;
}

const PROTOCOL = /^[a-z][a-z\d+.-]*:/i;

/** JSON Resume URLs should include a protocol, but tolerate bare domains. */
export function toHref(url: string) {
  return PROTOCOL.test(url) ? url : `https://${url}`;
}

/** Display a URL without its protocol or trailing slash. */
export function toDisplay(url: string) {
  return url.replace(/^[a-z][a-z\d+.-]*:\/\//i, "").replace(/\/$/, "");
}

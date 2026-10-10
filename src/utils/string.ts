export function truncatedString(str: string, maxLength: number): string {
  if (maxLength < 0) {
    throw new Error("maxLength must be a non-negative number.");
  }

  if (str?.length <= maxLength) {
    return str;
  }

  return str?.slice(0, maxLength) + "...";
}

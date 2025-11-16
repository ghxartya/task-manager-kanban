export const normalizeWhitespace = (value: string) =>
  value
    ?.replace(/[\r\n]+/g, '\n')
    .replace(/[ \t]+/g, ' ')
    .replace(/\n /g, '\n')
    .trimStart()

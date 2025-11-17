export const ENV = {
  API_URL: String(import.meta.env.VITE_API_URL),
  UPLOAD_PRESET: String(import.meta.env.VITE_UPLOAD_PRESET)
} as const

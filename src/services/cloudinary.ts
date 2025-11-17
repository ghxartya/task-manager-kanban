import { ENV } from '@/consts/env'

import type { UploadResponse } from '@/types/api'

import { instance } from '@/api'

export const CloudinaryService = {
  uploadFile(file: File) {
    const formData = new FormData()
    formData.append('file', file)
    formData.append('upload_preset', ENV.UPLOAD_PRESET)

    return instance.post<UploadResponse>('/upload', formData)
  }
}

import axios, { type AxiosRequestConfig } from 'axios'

import { getContentType } from '@/helpers/api'

import { ENV } from '@/consts/env'

const config: AxiosRequestConfig = {
  baseURL: ENV.API_URL,
  headers: getContentType()
}

export const instance = axios.create(config)

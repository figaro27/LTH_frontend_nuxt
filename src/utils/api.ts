/**
 * This utility contains api-related functions that deals with tokens
 * and requests to the backend.
 * It also manages the localStorage and sessionStorage to manage the tokens
 */
import axios, { Method, ResponseType, AxiosResponse } from 'axios'
import qs from 'qs'

// primary client for backend requests

/**
 * Primary client used to perform backend requests.
 *
 * Signs all requests with an access token, if available.
 */
export const client = axios.create({
  baseURL: process.env.VUE_APP_API || 'http://localhost:3000',
  paramsSerializer: (params) => {
    return qs.stringify(params, { arrayFormat: 'comma' }).replace(/,/g, '%2C')
  }
})

// Primary client public interface

type AdditionalRequestOptions = { params?: any; responseType?: ResponseType }

/**
 * Main request method for use with the primary backend client
 */
export const request = async <T = any>(
  url: string,
  method: Method,
  data: any,
  options: AdditionalRequestOptions = {}
): Promise<AxiosResponse<T>> => client.request({ method, url, data, ...options })

/**
 * Utility method for downloading files from backend.
 *
 * Defaults to arraybuffer as response type.
 */
export const download = <T = any>(url: string, options: object = { responseType: 'arraybuffer' }) =>
  request<T>(url, 'get', null, options)

/**
 * Utility method for GET requests to the backend
 */
export const get = <T = any>(url: string, params?: object) =>
  request<T>(url, 'get', null, { params })

/**
 * Utility method for POST requests to the backend
 */
export const post = <T = any>(url: string, data?: object) => request<T>(url, 'post', data)

/**
 * Utility method for PUT requests to the backend
 */
export const put = <T = any>(url: string, data?: object) => request<T>(url, 'put', data)
export const remove = (url: string, data?: object) => request(url, 'delete', data)

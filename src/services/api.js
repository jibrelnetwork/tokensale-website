// @flow

import { assoc, compose } from 'ramda'

import { api } from '../config'

function getHeaders(authToken?: string, isUploading?: boolean): Object {
  if (!authToken) {
    return {
      'Content-Type': 'application/json',
    }
  }

  const headers = {
    Authorization: `Token ${authToken}`,
  }

  if (!isUploading) {
    return assoc('Content-Type', 'application/json')(headers)
  }

  return headers
}

function request(url: string, options: Object): Object {
  return fetch(`${api.apiUrl}/${url}`, options)
    .then((response) => response.json())
    .catch((err) => {
      throw new Error(err)
    })
}

function getURLQuery(query: ?Object): string {
  if (!query) {
    return ''
  }

  const keys: Array<string> = Object.keys(query)

  return keys.map((key: string, index: number): string => {
    if (!query) {
      return ''
    }

    const value: string = query[key]

    if ((value === null) || (value === undefined)) {
      return ''
    }

    const separator: string = ((keys.length - 1) === index) ? '' : '&'

    return `${key}=${value}${separator}`
  }).join('')
}

function get(url: string, query: ?Object, authToken?: string): Object {
  const urlQuery: string = getURLQuery(query)

  return request(
    urlQuery ? `${url}?${urlQuery}` : `${url}/`,
    assoc('headers', getHeaders(authToken))(api.apiOptions),
  )
}

function post(url: string, body: Object, authToken?: string): Object {
  return request(`${url}/`, compose(
    assoc('method', 'POST'),
    assoc('body', JSON.stringify(body)),
    assoc('headers', getHeaders(authToken)),
  )(api.apiOptions))
}

function put(url: string, body: Object, authToken: string): Object {
  return request(`${url}/`, compose(
    assoc('method', 'PUT'),
    assoc('body', JSON.stringify(body)),
    assoc('headers', getHeaders(authToken)),
  )(api.apiOptions))
}

function del(url: string, authToken: string): Object {
  return request(`${url}/`, compose(
    assoc('method', 'DELETE'),
    assoc('headers', getHeaders(authToken)),
  )(api.apiOptions))
}

function form(url: string, body: Object, authToken: string): Object {
  const formData = new FormData()
  Object.keys(body).forEach((key: string): void => formData.append(key, body[key]))

  return request(`${url}/`, compose(
    assoc('method', 'POST'),
    assoc('body', formData),
    assoc('headers', getHeaders(authToken, true)),
  )(api.apiOptions))
}

export default { get, post, put, form, delete: del }

// @flow

import webstorage from 'jwallet-web-storage'

import { storage } from '../config'

function set(authToken: string): void {
  webstorage.setItem(storage.storageKeyAuthToken, authToken)
}

function get(): string {
  return webstorage.getItem(storage.storageKeyAuthToken)
}

function remove(): void {
  return webstorage.removeItem(storage.storageKeyAuthToken)
}

export default { set, get, remove }

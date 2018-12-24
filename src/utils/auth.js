import Cookies from 'js-cookie'

const TokenKey = 'BZXT-Token'
const UserKey = 'BZXT-UserName'

/** Token operation */
export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

/** UserName operation */
export function getUserName() {
  return Cookies.get(UserKey)
}

export function setUserName(username) {
  return Cookies.set(UserKey, username)
}

export function removeUserName() {
  return Cookies.remove(UserKey)
}
export const ASSET_BASE_URL = 'https://assets.navdeepsingh.dev'

export function asset(path: string) {
  return `${ASSET_BASE_URL}/${path.replace(/^\/+/, '')}`
}

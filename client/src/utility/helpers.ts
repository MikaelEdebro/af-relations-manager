export function getFetchHeaders(method?: string, body?: any) {
  const headers: any = {
    method: method || 'GET',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
  }

  if (body) {
    headers.body = JSON.stringify(body)
  }

  return headers
}

export function getTextProperty(obj: object | undefined, propName: string): string {
  if (!obj) {
    return ''
  }

  return obj[propName] || ''
}

export function getArrayProperty(obj: object | undefined, propName: string): any[] {
  if (!obj) {
    return []
  }

  return obj[propName] || []
}

export const getFetchHeaders = (method?: string, body?: any) => {
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

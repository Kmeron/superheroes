import requestToServer from './utils'

export default function listHeroes (query = {}) {
  const params = new URLSearchParams(query).toString()
  return requestToServer('/superheroes?' + params, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' }
  })
}

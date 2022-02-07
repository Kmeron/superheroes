import requestToServer from './utils'

export default function createHero (payload) {
  return requestToServer('/superheroes', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  })
}

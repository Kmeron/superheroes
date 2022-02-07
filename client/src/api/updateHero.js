import requestToServer from './utils'

export default function updateHero (payload) {
  return requestToServer('/superheroes/' + payload.id, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  })
}

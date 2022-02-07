import requestToServer from './utils'

export default function deleteHero (id) {
  return requestToServer('/superheroes/' + id, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' }
  })
}

import requestToServer from './utils'

export default function showHero (id) {
  return requestToServer('/superheroes/' + id, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' }
  })
}

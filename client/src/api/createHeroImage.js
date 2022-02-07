import requestToServer from './utils'

export default function createHeroImage (payload) {
  return requestToServer('/superheroes/images', {
    method: 'POST',
    body: payload
  })
}

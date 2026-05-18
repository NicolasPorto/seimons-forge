const KEY = 'sf_voter_id'

export function getVoterId() {
  let id = localStorage.getItem(KEY)
  if (!id) {
    id = crypto.randomUUID()
    localStorage.setItem(KEY, id)
  }
  return id
}

const VOTED_KEY = 'sf_voted_pains'

export function getVotedPains() {
  try {
    return new Set(JSON.parse(localStorage.getItem(VOTED_KEY) || '[]'))
  } catch {
    return new Set()
  }
}

export function markAsVoted(painId) {
  const voted = getVotedPains()
  voted.add(painId)
  localStorage.setItem(VOTED_KEY, JSON.stringify([...voted]))
}

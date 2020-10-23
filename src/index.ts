import crypto from 'crypto'

function generateSalt(rounds = 12) {
  if(rounds > 15) {
    throw new Error(`${rounds} is greater than 15, must be less that 15`)
  }

  if(typeof rounds !== 'number') {
    throw new Error('Rounds must be a number')
  }

  return crypto.randomBytes(Math.ceil(rounds / 2)).toString('hex').slice(0, rounds)
}

function hasher(password: string, salt: string) {
  const hash = crypto.createHmac('sha512', salt)
  hash.update(password)

  const hashedPassword = hash.digest('hex')

  return { salt, hashedPassword }
}

function hash(password: string, salt: string) {
  if(!password || !salt) {
    throw new Error('Must provide password and salt values')
  }

  if (typeof password !== 'string' || typeof salt !== 'string') {
    throw new Error('password and salt must either be a string')
  }

  return hasher(password, salt)
}

function compare(password: string, hashToCompare: ReturnType<typeof hasher>) {
  if (!password || !hashToCompare) {
    throw new Error('password and hash is required to compare')
  }
  if (typeof password !== 'string' || typeof hashToCompare !== 'object') {
    throw new Error('password must be a String and hash must be an Object')
  }

  const passwordData = hash(password, hashToCompare.salt)

  return passwordData.hashedPassword === hashToCompare.hashedPassword
}

export {
  generateSalt,
  hash,
  compare
}

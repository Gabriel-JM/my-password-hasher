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

console.log(generateSalt(), generateSalt(15))

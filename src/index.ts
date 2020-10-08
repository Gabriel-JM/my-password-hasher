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

/*{
  salt: '9155e7ec4a0f',
  hashedPassword: '44d8f971f99ac15cdc62b264e2f7ac87245eab5f4f5c44d0cb342527edab0ca50faaed867ce4dacf5341ca452a32ecef41786e575a790e6504333a3521e81637'
}*/

console.log(
  hash('Wisdow', generateSalt())
)

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

console.log(generateSalt(), generateSalt(15))

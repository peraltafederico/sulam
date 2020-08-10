import * as jwt from 'jsonwebtoken'
import * as dotenv from 'dotenv'

dotenv.config()

const { TOKEN_SECRET, TOKEN_EXP } = process.env

export function generateAccessToken(payload: any): string {
  return jwt.sign(payload, TOKEN_SECRET, { expiresIn: TOKEN_EXP })
}

import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"
import CredentialsProvider from "next-auth/providers/credentials"
import GoogleProvider from 'next-auth/providers/google'
import { compare } from "bcryptjs"
import mysql from 'mysql2/promise'
export const authOptions = {
  // Configure one or more authentication providers
  session: {
    strategy: 'jwt'
  },
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
      type: 'credentials',
      credentials: {
        email: { label: "Email", type: "email", placeholder: "example@something.com" },
        password: { label: "Password", type: "password", placeholder: "**********" }
      },
      async authorize(credentials, req) {
        const { email, password } = credentials;
        const response = await handler(email,password);
        return response;
      }
    })
  ],
  pages: {
    signIn: "/auth/login"
  },
  secret: process.env.JWT_SECRET,
  callbacks: {
    async signIn({user, account, profile, email, credentials}) {
      return true
    }
  }
}
async function handler(email,password) {
  const conn =await mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASS,
    database: process.env.DATABASE_NAME,
})
  const [rows, fields] = await conn.execute("SELECT * FROM user WHERE email=?", [email]);
  const fetched_pass=rows[0]['password'];
  const res= await compare(password,fetched_pass);
  if(res)
  {
    return { "email":rows[0]['email'],image:rows[0]['profile_image_link'] };
  }
  return null;
}
export default NextAuth(authOptions)
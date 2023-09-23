import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"
import CredentialsProvider  from "next-auth/providers/credentials"
import GoogleProvider from 'next-auth/providers/google'
import axios from "axios"

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
      clientId:process.env.GOOGLE_CLIENT_ID,
      clientSecret:process.env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
      type: 'credentials',
      credentials: {
        email:{label:"Email",type:"email",placeholder:"example@something.com"},
        password:{label:"Password",type:"password",placeholder:"**********"}
      },
      async authorize(credentials, req) {
        const {email, password } = credentials;
        // const post_url = "https://64fc6e0b605a026163ae7bdc.mockapi.io/users";
        const post_url="/api/DB/fetch";
        const response =await axios.post(post_url,req.body);
        return {email:"rahim@123",name:"rahim"}
      }
    })
  ],
  pages:{
    signIn:"/auth/login"
  },
  secret: process.env.JWT_SECRET
}

export default NextAuth(authOptions)
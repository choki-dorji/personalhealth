import { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import { NextResponse } from "next/server";
import {
  getAuth,
  signOut,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { App1 } from "@/Firebase/setup";
export const authOptions: NextAuthOptions = {
  secret: process.env.NEXT_PUBLIC_AUTH_SECRET,
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      // @ts-ignore
      async authorize(credentials: any, req: any) {
        const auth = getAuth(App1);
        // console.log("dshbcjhsdbjhbas")
        try {
          // Perform authentication using Firebase
          const userCredential = await signInWithEmailAndPassword(
            auth,
            credentials?.email,
            credentials?.password
          );

          if (userCredential.user) {
            const user = userCredential.user;
            console.log(user);

            return Promise.resolve(user);
          }
        
          return Promise.resolve(null);
        } catch (error) {
          console.log("sncjasdkjbajsdndbv", error);
          // throw new Error({error: error})
          return Promise.reject(error);
          // return NextResponse.json({error: "Incorrect Email or password" }, {status: 500})
          
          // return Promise.resolve({ error: "Incorrect Email or password", status: 500 })
        }
      },
      //sign in
    }),
    GitHubProvider({
      clientId: "246984953ddd77c5683d",
      clientSecret: "4b1c0a673a24a6b261ed6949a139d5d68b947e74",
    }),
    // Credentials({
    //   name: "Signup",
    //   credentials: {
    //     email: { label: "Email", type: "email" },
    //     password: { label: "Password", type: "password" },
    //   },
    //   async authorize(credentials, req) {
    //     const auth = getAuth(App1);
    //     try {
    //       // Perform user registration using Firebase
    //       const userCredential = await createUserWithEmailAndPassword(auth, credentials?.email, credentials?.password);
    //       if (userCredential.user) {
    //         const user = userCredential.user;
    //         return Promise.resolve(user);
    //       }
    //       return Promise.resolve(null);
    //     } catch (error) {
    //       return Promise.resolve(null);
    //     }
    //   },
    // }),
  ],
  pages: {
    signIn: "/auth/signin",
  },
};

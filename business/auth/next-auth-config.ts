import { MongoDBAdapter } from '@auth/mongodb-adapter'
import { NextAuthOptions } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import clientPromise from '../db/connect'

export const authOptions: NextAuthOptions = {
  // see https://stackoverflow.com/questions/74089665/next-auth-credentials-provider-authorize-type-error
  // @ts-expect-error
  adapter: MongoDBAdapter(clientPromise),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  session: { strategy: 'jwt' },
  /*callbacks: {
    // more information on params https://next-auth.js.org/configuration/callbacks#sign-in-callback
    async signIn({ user }) {
      await connectDB()
      const userAccount = await UserAccount.findOne({ email: user?.email })
      if (!userAccount) {
        const dataToInsert: IUserAccount = {
          isFirstConnexion: true,
          email: user.email!,
          name: user.name!,
          image: user.image!,
        }
        const newUserAccount = new UserAccount(dataToInsert)
        await newUserAccount.save()
      }
      return true
    },
    async jwt({ token, trigger, user, session }) {
      await connectDB()
      if (trigger === 'update') {
        await setupToken(session.user.email!, token)
      }

      if (user) {
        await setupToken(user.email!, token)
      }

      return token
    },
    async session({ session, token }) {
      session.user.id = token.id
      session.user.isFirstConnexion = token.isFirstConnexion
      session.user.town = token.town
      session.user.availability = token.availability
      session.user.sport = token.sport
      session.user.formatedSport = token.formatedSport
      session.user.description = token.description
      session.user.contact = token.contact
      session.user.name = token.name
      session.user.image = token.image

      return session
    },
  },*/
}

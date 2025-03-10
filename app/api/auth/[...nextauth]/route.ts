import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"

// Configure NextAuth
const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code"
        }
      }
    }),
  ],
  // Customize pages
  pages: {
    signIn: '/admin',
    error: '/auth-help', // Redirect to auth-help page on error
  },
  // Callbacks
  callbacks: {
    async signIn({ user, account, profile }) {
      // Allow all users to sign in
      return true
    },
    async session({ session, token }) {
      // Add role to the session
      if (session.user) {
        session.user.role = 'admin' // You can implement more complex role logic here
      }
      return session
    },
    async redirect({ url, baseUrl }) {
      // Allows relative callback URLs
      if (url.startsWith("/")) return `${baseUrl}${url}`
      // Allows callback URLs on the same origin
      else if (new URL(url).origin === baseUrl) return url
      return baseUrl
    },
  },
  // Enable debug in development
  debug: process.env.NODE_ENV === 'development',
})

export { handler as GET, handler as POST } 
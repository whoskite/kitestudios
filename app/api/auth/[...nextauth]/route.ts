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
    error: '/admin',
  },
  // Callbacks
  callbacks: {
    async signIn({ user, account, profile }) {
      // Only allow specific email domains or users
      // For example, only allow your company email
      // This is optional but recommended for security
      const allowedEmails = process.env.ALLOWED_EMAILS?.split(',') || []
      if (allowedEmails.length > 0 && user.email) {
        return allowedEmails.includes(user.email)
      }
      return true
    },
    async session({ session, token }) {
      // Add role to the session
      if (session.user) {
        session.user.role = 'admin' // You can implement more complex role logic here
      }
      return session
    },
  },
  // Enable debug in development
  debug: process.env.NODE_ENV === 'development',
})

export { handler as GET, handler as POST } 
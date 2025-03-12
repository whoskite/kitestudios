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
    signIn: '/login',
    error: '/auth-help', // Redirect to auth-help page on error
  },
  // Callbacks
  callbacks: {
    async signIn({ user, account, profile }) {
      // Allow all users to sign in
      console.log("Sign in callback:", { user: user.email, provider: account?.provider });
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
      console.log("Redirect callback:", { url, baseUrl });
      
      // Redirect to hub page after sign in
      if (url.includes('/api/auth/callback')) {
        console.log("Auth callback detected, redirecting to hub page");
        return `${baseUrl}/hub`;
      }
      
      // Handle relative URLs (starting with /)
      if (url.startsWith("/")) {
        const redirectUrl = `${baseUrl}${url}`;
        console.log("Redirecting to:", redirectUrl);
        return redirectUrl;
      }
      
      // Handle absolute URLs on the same origin
      try {
        const urlObj = new URL(url);
        if (urlObj.origin === baseUrl) {
          console.log("Same origin redirect to:", url);
          return url;
        }
      } catch (error) {
        console.error("Error parsing URL:", error);
      }
      
      // Default fallback to hub page
      console.log("Fallback redirect to hub page");
      return `${baseUrl}/hub`;
    },
  },
  // Enable debug in development
  debug: true, // Always enable debug to help troubleshoot
  logger: {
    error(code, metadata) {
      console.error(`NextAuth Error: ${code}`, metadata);
    },
    warn(code) {
      console.warn(`NextAuth Warning: ${code}`);
    },
    debug(code, metadata) {
      console.log(`NextAuth Debug: ${code}`, metadata);
    },
  },
})

export { handler as GET, handler as POST } 
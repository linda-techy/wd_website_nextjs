import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import GitHubProvider from 'next-auth/providers/github';

const { handlers } = NextAuth({
  site: process.env.NEXTAUTH_URL || 'http://localhost:3000',
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        username: { label: 'Username', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      authorize: async (credentials) => {
        // Add your own authentication logic here
        if (credentials.username === process.env.ADMIN_USERNAME && credentials.password === process.env.ADMIN_PASSWORD) {
          // Return user object if credentials are valid
          return { id: 1, name: 'Admin', email: 'admin@example.com' };
        } else {
          // Return null if credentials are invalid
          return null;
        }
      },
    }),
  ],
});

export const { GET, POST } = handlers;

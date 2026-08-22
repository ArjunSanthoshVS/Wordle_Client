import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import axios from 'axios';

const BACKEND_URL = process.env.BACKEND_API_URL || 'http://localhost:5000';

export const authOptions = {
    providers: [
        ...(process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET
            ? [
                GoogleProvider({
                    clientId: process.env.GOOGLE_CLIENT_ID,
                    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
                }),
              ]
            : []),
    ],
    callbacks: {
        async jwt({ token, account, user }) {
            // This is the first sign-in or when account details are updated
            if (account && user) {
                token.accessToken = account.access_token;
                token.user = {
                    userName: user.name,
                    email: user.email,
                    image: user.image,
                };

                // Send the user info to your backend for storing in the database
                try {
                    await axios.post(`${BACKEND_URL}/googleLogin`, {
                        userName: user.name,
                        email: user.email,
                        image: user.image,
                    }, {
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    });
                } catch (error) {
                    console.error('Error saving user to the database:', error?.response?.data?.message || error.message);
                }
            }

            return token;
        },

        async session({ session, token }) {
            session.accessToken = token.accessToken;
            session.user = token.user;
            return session;
        },
    },
    secret: process.env.NEXTAUTH_SECRET || 'wordpop_secret_key_production_fallback',
};

export default NextAuth(authOptions);


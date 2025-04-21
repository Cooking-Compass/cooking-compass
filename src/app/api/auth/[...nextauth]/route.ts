import NextAuth from 'next-auth';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { PrismaClient } from '@prisma/client';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import bcrypt from 'bcrypt';


import authOptions from '@/lib/authOptions';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

const authOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID || '',
        clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    }),

    CredentialsProvider({
        name: 'Credentials',
        credentials: {
            email: { label: 'Email', type: 'text', placeholder: 'example@example.com' },
            password: { label: 'Password', type: 'password' },
        },

        async authorize(credentials) {
            if (!credentials?.email || !credentials.password) {
                throw new Error('Email and password are required');
            }

            // Find the user in the database
            const user = await prisma.user.findUnique({
                where: { email: credentials.email },
            });

            // if no user is found, throw an error
            if (!user) {
                throw new Error('No user found with this email');
            }

            // verify that the password is valid
            const isPasswordValid = await bcrypt.compare(credentials.password, user.password);
            if (!isPasswordValid) {
                throw new Error('Invalid password');
            }

            // return the user object if authentication is successful
            return { id: user.id, email: user.email, name: user.name };
          },
        }),
      ],
      
      session: {
        strategy: 'jwt',
      },
      callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                token.email = user.email;
                token.name = user.name;
            }
            return token;
        },
        async session({ session, token }) {
            if (token) {
                session.user.id = token.id;
                session.user.email = token.email;
                session.user.name = token.name;
            }
            return session;
          },
        },
        pages; { 
            // custom sign-in page
            signIn: '/auth/signin', 
            // custom error page
            error: '/auth/error',
        },
        // secret for signing tokens
        secret: process.env.NEXTAUTH_SECRET,
    };

    const handler = NextAuth(authOptions);
    export { handler as GET, handler as POST };

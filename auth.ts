import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { z } from "zod";
import { prisma } from "@/lib/prisma";

export interface DemoUserAccount {
  id: string;
  name: string;
  email: string;
  password: string;
  role: "RECRUITER" | "HR";
}

export const DEMO_USERS: DemoUserAccount[] = [
  {
    id: "demo_recruiter_sarah",
    name: "Sarah Jenkins",
    email: "recruiter@hiretrack.ai",
    password: "Password123!",
    role: "RECRUITER",
  },
  {
    id: "demo_hr_david",
    name: "David Vance",
    email: "hr@hiretrack.ai",
    password: "Password123!",
    role: "HR",
  },
  {
    id: "demo_talent_elena",
    name: "Elena Rostova",
    email: "talent@hiretrack.ai",
    password: "Password123!",
    role: "RECRUITER",
  },
  {
    id: "demo_test_user",
    name: "Test Recruiter",
    email: "test@hiretrack.ai",
    password: "Password123!",
    role: "RECRUITER",
  },
];

const loginSchema = z.object({
  email: z.string().trim().email(),
  password: z.string().min(6),
});

export const { handlers, auth, signIn, signOut } = NextAuth({
  session: {
    strategy: "jwt",
  },

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }

      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as string;
      }

      return session;
    },
  },

  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials) {
        const result = loginSchema.safeParse(credentials);

        if (!result.success) {
          return null;
        }

        const email = result.data.email.toLowerCase();

        // Match against in-memory demo accounts (no database lookups required for login)
        const demoUser = DEMO_USERS.find(
          (u) =>
            u.email.toLowerCase() === email &&
            u.password === result.data.password
        );

        if (!demoUser) {
          return null;
        }

        // Maintain foreign-key compatibility for jobs/applications if DB is active
        try {
          await prisma.user.upsert({
            where: { email: demoUser.email },
            update: { name: demoUser.name, role: demoUser.role },
            create: {
              id: demoUser.id,
              name: demoUser.name,
              email: demoUser.email,
              password: "dummy_portfolio_account",
              role: demoUser.role,
            },
          });
        } catch {
          // If DB is offline, continue without failing auth
        }

        return {
          id: demoUser.id,
          name: demoUser.name,
          email: demoUser.email,
          role: demoUser.role,
        };
      },
    }),
  ],
});
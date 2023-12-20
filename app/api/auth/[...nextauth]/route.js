import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { axiosInstance } from "../../../../hooks/useAxiosPrivate"
import apiRouter from "../../../../utils/apiRouter"
import routerConstants from "../../../../utils/routerConstants"

export const authOptions = {
	providers: [
		CredentialsProvider({
			name: 'Credentials',
			credentials: {
				email: { label: "Email", type: "text" },
				password: { label: "Password", type: "password" }
			},
			async authorize(credentials, req) {
				try {
					const result = await axiosInstance.post(apiRouter.SIGNIN, credentials);
					if (result.status == 200) return result;
					return Promise.reject(new Error(result));
				}
				catch (error) {
					return Promise.reject(new Error(error?.response?.data?.message));
				}
			}
		})
	],
	session: {
		strategy: "jwt",
		maxAge: 30 * 24 * 60 * 60, // 30 days	
		updateAge: 24 * 60 * 60, // 24 hours
	},
	jwt: {
		secret: "wJCE6UpQTazO2cnVcBnhCmUO3kHYzsVdI8oVT0gPRwEt1BPosNm5oHe8XL2DQTHy",
		maxAge: 60 * 60 * 24 * 30,
		//async encode() {},
		//async decode() {},
	},
	callbacks: {
		async signIn({ user, account, profile, email, credentials }) {
			return true
		},
		async session({ session, token, user }) {
			// Send properties to the client, like an access_token from a provider.
			session.accessToken = token.user.token
			session.user = token.user.data
			session.message = token.user.message
			//session.user = user
			return Promise.resolve(session);
		},
		async jwt({ token, trigger, session, user, account }) {
			try {
				if (trigger === "update" && session) {
					token.user.data.user = session
				}
				if (account) {
					token.accessToken = user.token;
					token.user = user.data
				}
				return Promise.resolve(token);
			}
			catch (err) {
				console.log(err)
			}
		}
	},


	pages: {
		signIn: routerConstants.SIGNIN,
		//signOut: '/api/auth/signout',
		//error: '/error', // Error code passed in query string as ?error=
		// verifyRequest: "/auth/verify-request", // (used for check email message)
		newUser: routerConstants.ERROR, // If set, new users will be directed here on first sign in
	},
	events: {
		async error(message) {
			console.log("error msg==>", message);
		},
	},
	debug: false,
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }

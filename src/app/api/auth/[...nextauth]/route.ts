import NextAuth from "next-auth";
import envConfig from "@/config";

type ProfileSpring={
    sub: string;
    name: string;
    email: string;
    picture: string;
}
export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    {
        id: "spring",
        name: "Spring oauth",
        type: "oauth",
        authorization: envConfig.OAUTH_AUTH_URL+ "/oauth2/authorize",
        token: envConfig.OAUTH_AUTH_URL+ "/oauth2/token",
        userinfo: envConfig.OAUTH_AUTH_URL+ "/userinfo",
        idToken: true,
        checks: ["pkce", "state"],
        profile(profile: ProfileSpring) {
          return {
            id: profile.sub,
            name: profile.name,
            email: profile.email,
            image: profile.picture,
          }
        },
      },
    // ...add more providers here
  ],
}

export default NextAuth(`authOptions`)
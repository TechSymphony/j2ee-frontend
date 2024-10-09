import { z } from "zod";

const configSchema = z.object({
  NEXT_PUBLIC_API_ENDPOINT: z.string(),
  NEXT_PUBLIC_URL: z.string(),
  NEXT_PUBLIC_ACCESS_TOKEN: z.string(),
  OAUTH_AUTH_URL: z.string().default("http://localhost:8080"),
  OAUTH_AUTH_ID: z.string().default("public-client"),
});

const configProject = configSchema.safeParse({
  NEXT_PUBLIC_API_ENDPOINT: process.env.NEXT_PUBLIC_API_ENDPOINT,
  NEXT_PUBLIC_URL: process.env.NEXT_PUBLIC_URL,
  NEXT_PUBLIC_ACCESS_TOKEN: process.env.NEXT_PUBLIC_ACCESS_TOKEN,
  OAUTH_AUTH_URL: process.env.NEXT_PUBLIC_OAUTH_AUTH_URL,
  OAUTH_AUTH_ID: process.env.NEXT_PUBLIC_OAUTH_AUTH_ID,
});

if (!configProject.success) {
  console.log(configProject.error.errors);
  throw new Error("Invalid environment variables");
}

const envConfig = configProject.data;

export default envConfig;

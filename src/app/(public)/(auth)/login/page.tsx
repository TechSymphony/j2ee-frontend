'use client';
import { useEffect } from "react";
import { userManager } from "@/lib/auth";


export default function AuthenticationPage() {
  useEffect(() => {
    async function handleLogin() {
      const user = await userManager.getUser();

      if (!user) {
        userManager.clearStaleState();
        await userManager.signinRedirect();
      }
    }

    handleLogin();
    return ()=>{}
  }, []);

  return (
    <div>
      <h1>Next.js OIDC Integration</h1>
      <p>Welcome to the authenticated section of your app!</p>
    </div>
  );
}

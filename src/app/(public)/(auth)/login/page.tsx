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
    return () => { }
  }, []);

  return (
    <div>
      <p>Đang đăng nhập ...</p>
    </div>
  );
}

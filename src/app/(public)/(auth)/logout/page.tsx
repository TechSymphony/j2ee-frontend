'use client';
import { useEffect } from 'react';
import { userManager } from "@/lib/auth";

export default function Logout() {
  useEffect(() => {
    async function handleLogout() {
      userManager.signoutRedirect();
    }

    handleLogout();
  }, []);

  return <p>Logging out...</p>;
}
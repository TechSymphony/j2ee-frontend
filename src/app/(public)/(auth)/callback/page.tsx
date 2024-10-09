"use client";
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react'
import { userManager } from '../../layout';

const SigninCallback = () => {
    const router = useRouter();

    useEffect(() => {
      async function handleCallback() {
        await userManager.signinRedirectCallback();
        router.push('/');
      }
  
      handleCallback();
    }, [router]);
  
    return <p>Redirecting...</p>;
}

export default SigninCallback
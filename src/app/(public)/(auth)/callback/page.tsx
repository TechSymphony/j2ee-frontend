"use client";
import React, { useEffect } from 'react'
import { userManager } from "@/lib/auth";
import { useUser } from '@/contexts/user-context';

const SigninCallback = () => {
    const userContext= useUser();

    useEffect(() => {
      async function handleCallback() {
        await userManager.signinRedirectCallback().then(user=>{
          // remove state oidc-ts
          window.history.replaceState({},
            window.document.title,
            window.location.origin + window.location.pathname);
            window.location.href = "/";
          userContext.dispatch({type: 'SET_USER', payload: user});
        })
      }

      handleCallback();
    }, [userContext]);

    return <p>Đang điều hướng...</p>;
}

export default SigninCallback
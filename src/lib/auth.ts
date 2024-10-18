import { UserManager, WebStorageStateStore } from "oidc-client-ts";

import envConfig from '@/config';
const isBrowser = typeof window !== 'undefined';
// import { WebStorageStateStore } from 'oidc-client-ts';
export const userManagerConfig = {
  authority: envConfig.OAUTH_AUTH_URL,
  token_endpoint: envConfig.OAUTH_AUTH_URL + '/oauth2/token',
  authorization_endpoint: envConfig.OAUTH_AUTH_URL + '/oauth2/authorize',

  client_id:  envConfig.OAUTH_AUTH_ID,
  redirect_uri: envConfig.NEXT_PUBLIC_URL+"/callback",
  response_type: "code",
  scope: "openid profile",
  post_logout_redirect_uri: envConfig.NEXT_PUBLIC_URL,
  loadUserInfo: true,
//   silent_redirect_uri: 'https://your-app.com/silent-renew.html', // URL for silent renew
//   automaticSilentRenew: true,            // Enable silent renewal of tokens
  userStore: isBrowser ? new WebStorageStateStore({ store: window.localStorage }) : undefined,
};


export const userManager = new UserManager(userManagerConfig);

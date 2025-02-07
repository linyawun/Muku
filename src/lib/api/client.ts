import createClient from 'openapi-fetch';

//import auth from "@/utils/auth";

import { paths } from './v1';

const BASE_URL = import.meta.env.VITE_APP_BASE_URL as string;

// const checkAuth = () => {
//   const token = JSON.parse(auth.getToken());
//   const identityToken = JSON.parse(auth.get(IDENTITY_TOKEN_KEY));
//   if (identityToken) {
//     return `Bearer ${identityToken}`;
//   } else if (token) {
//     return `Bearer ${token}`;
//   } else {
//     return;
//   }
// };

const client = createClient<paths>({
  baseUrl: BASE_URL,
  // querySerializer: function (params) {
  //   return qs.stringify(params, { encode: true });
  // },
  // headers: {
  //   get Authorization() {
  //     return checkAuth();
  //   },
  // },
});
export default client;

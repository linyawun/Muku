import createClient from 'openapi-fetch';

//import auth from "@/utils/auth";

import { paths } from './v1';

const BASE_URL = import.meta.env.VITE_APP_BASE_URL as string;

// const checkAuth = () => {
//   const token = JSON.parse(auth.getToken());
//   const identityToken = JSON.parse(auth.get(IDENTITY_TOKEN_KEY));
//   /**
//    * Note:
//    * 如果有identity token，表示他有切換身份的功能，優先使用該把身份的token
//    * 每次刷新頁面，都會清除identity token，亦即恢復身份
//    */
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

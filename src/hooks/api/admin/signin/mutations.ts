import { useMutation } from '@tanstack/react-query';
import { paths } from '@/lib/api/v1';
import { TSigninPayload, UseMutationOptions } from '@/types';
import axios from 'axios';

const ADMIN_SIGNIN = '/v2/admin/signin';
const ADMIN_LOGOUT = '/v2/logout';
const ADMIN_USER_CHECK = '/v2/api/user/check';

// adminSignin
const signIn = (payload: Partial<TSigninPayload> = {}) => {
  const { username, password } = payload;
  if (!username) throw new Error('username is empty');
  if (!password) throw new Error('password is empty');

  return axios.post(ADMIN_SIGNIN, payload);
};

export const useSignInMutation = ({
  reactQuery = {},
}: UseMutationOptions<paths[typeof ADMIN_SIGNIN]['post']> = {}) => {
  return useMutation({
    mutationFn: (payload: TSigninPayload) => signIn(payload),
    ...reactQuery,
  });
};

// admin user check
const userCheck = () => {
  return axios.post(ADMIN_USER_CHECK);
};

export const useUserCheckMutation = ({
  reactQuery = {},
}: UseMutationOptions<paths[typeof ADMIN_USER_CHECK]['post']> = {}) => {
  return useMutation({
    mutationFn: () => userCheck(),
    ...reactQuery,
  });
};

// logout
const logout = () => {
  return axios.post(ADMIN_LOGOUT);
};

export const useLogoutMutation = ({
  reactQuery = {},
}: UseMutationOptions<paths[typeof ADMIN_LOGOUT]['post']> = {}) => {
  return useMutation({
    mutationFn: () => logout(),
    ...reactQuery,
  });
};

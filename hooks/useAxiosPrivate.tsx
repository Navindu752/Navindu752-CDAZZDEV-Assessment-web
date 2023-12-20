import axios, { AxiosInstance, AxiosResponse, AxiosError } from 'axios';
import { signOut } from 'next-auth/react';
import { JWT_EXPIRED } from 'utils/constants';
import { NextApiRequest } from 'next';

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export const axiosInstance: AxiosInstance = axios.create({
  baseURL: baseUrl,
});

const useAxiosPrivate = (): AxiosInstance => {
  axiosInstance.interceptors.response.use(
    function (response: AxiosResponse) {
      return response;
    },
    function (error: AxiosError) {
      // check if token is expired or not and status code is 401
      if (error?.response?.status === 401 && error?.response?.data === JWT_EXPIRED) {
        // logout();
        signOut({ callbackUrl: routerConstants.SIGNIN });
      }
      return Promise.reject(error);
    }
  );
  return axiosInstance;
};

export default useAxiosPrivate;
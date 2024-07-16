import axiosInstance from '../axios/instance';
import Cookies from 'js-cookie';

export interface User {
  id: number;
  email: string;
  nickname: string;
  profileImageUrl: string;
  createdAt: string;
  updatedAt: string;
}

export async function login(email: string, password: string): Promise<User> {
  const response = await axiosInstance.post(`/auth/login`, {
    email,
    password,
  });

  if (response.status !== 201) {
    throw new Error(response.data.message || '로그인 요청에 실패했습니다.');
  }

  const { user, accessToken, refreshToken } = response.data;

  // 토큰을 쿠키에 저장
  Cookies.set('accessToken', accessToken);
  Cookies.set('refreshToken', refreshToken);

  return user;
}

export async function refreshToken() {
  const response = await axiosInstance.post(`/auth/tokens`);

  if (response.status !== 201) {
    throw new Error(
      response.data.message || '토큰 재발급 요청에 실패했습니다.'
    );
  }

  const { accessToken, refreshToken } = response.data;

  // 토큰을 쿠키에 저장
  Cookies.set('accessToken', accessToken);
  Cookies.set('refreshToken', refreshToken);
  return accessToken;
}

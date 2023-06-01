import { ENDPOINTS } from "@/constant";
import { API_URL } from "@/helpers";
import { ICommonResponse, IProfile } from "@/types";

export const checkEmail = async (email: string) => {
  const res = await fetch(API_URL + ENDPOINTS.CHECK_EMAIL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({ email }),
  });

  if (!res.ok) {
    return Promise.reject(res);
  }

  const data: ICommonResponse<null> = await res.json();

  return data;
};

export const login = async (email: string, password: string) => {
  const res = await fetch(API_URL + ENDPOINTS.LOGIN, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    credentials: "include",
    body: JSON.stringify({ email, password }),
  });

  if (!res.ok) {
    return Promise.reject(res);
  }

  const data: ICommonResponse<{
    access_token: string;
  }> = await res.json();

  return data;
};

export const logout = async () => {
  const res = await fetch(API_URL + ENDPOINTS.LOGOUT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    credentials: "include",
  });

  if (!res.ok) {
    return Promise.reject(res);
  }

  const data: ICommonResponse<null> = await res.json();

  return data;
};

export const registerAccount = async ({
  email,
  password,
  name,
}: {
  email: string;
  password: string;
  name: string;
}) => {
  const res = await fetch(API_URL + ENDPOINTS.REGISTER, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    credentials: "include",
    body: JSON.stringify({ email, password, name }),
  });

  if (!res.ok) {
    return Promise.reject(res);
  }

  const data: ICommonResponse<null> = await res.json();

  return data;
};

export const getProfile = async () => {
  const res = await fetch(API_URL + ENDPOINTS.USER, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    credentials: "include",
  });

  if (!res.ok) {
    return Promise.reject(res);
  }

  const data: ICommonResponse<IProfile> = await res.json();

  return data;
};

export const updateProfile = async (data: {
  name: string;
  email: string;
  phone: string;
}) => {
  const res = await fetch(API_URL + ENDPOINTS.USER, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    credentials: "include",
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    return Promise.reject(res);
  }

  const response: ICommonResponse<IProfile> = await res.json();

  return response;
};

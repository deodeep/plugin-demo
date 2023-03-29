import { ReactNode } from "react";

export interface ContainerProps {
  children: ReactNode;
}

export interface CardProps {
  children: ReactNode;
  title: string;
}

export type LoginProps = {
  handleLogin: (username: string, password: string) => void;
};

export interface UserInfoValues {
  user_id: string;
  user_name: string;
  access_token: string;
  alreadyLoggedIn: boolean;
  otp: string;
}

export interface SignInValues {
  email: string;
  password: string;
}

export interface SignUpValues {
  email: string;
  password: string;
  confirm_password: string;
}

export interface VerifyValues {
  otp: string;
}

export interface HeaderProps {
  username: string;
}

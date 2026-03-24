export interface AdminLoginDto {
  login: string; // accepts username or email
  password: string;
}

export interface AdminAuthTokens {
  accessToken: string;
  refreshToken: string;
}

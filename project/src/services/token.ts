const AUTH_TOKEN_KEY_NAME = 'six-cities-token';
const EMAIL_KEY_NAME = 'six-cities-email';

export type Token = string;
export type Email = string;

export const getToken = (): Token => {
  const token = localStorage.getItem(AUTH_TOKEN_KEY_NAME);
  return token ?? '';
};

export const saveToken = (token: Token): void => {
  localStorage.setItem(AUTH_TOKEN_KEY_NAME, token);
};

export const dropToken = (): void => {
  localStorage.removeItem(AUTH_TOKEN_KEY_NAME);
};

export const getEmail = (): Email => {
  const token = localStorage.getItem(EMAIL_KEY_NAME);
  return token ?? '';
};

export const saveEmail = (token: Email): void => {
  localStorage.setItem(EMAIL_KEY_NAME, token);
};

export const dropEmail = (): void => {
  localStorage.removeItem(EMAIL_KEY_NAME);
};

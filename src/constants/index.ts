export const getKeys = constant =>
  Reflect.ownKeys(constant).map(constantKey => constant[constantKey].key);

export const TOKEN_TYPES = {
  LOGIN: { key: 'LOGIN', label: 'LOGIN' },
  VERIFY_EMAIL: { key: 'VERIFY_EMAIL', label: 'VERIFY_EMAIL' },
  FORGOT_PASSWORD: { key: 'FORGOT_PASSWORD', label: 'FORGOT_PASSWORD' },
};

export const USER_ROLES = {
  TEACHER: { key: 'TEACHER', label: 'Teacher' },
  STUDENT: { key: 'STUDENT', label: 'Student' },
  ADMIN: { key: 'ADMIN', label: 'Admin' },
};

export const GENDER = {
  MALE: { key: 'MALE', label: 'Male' },
  FEMALE: { key: 'FEMALE', label: 'Female' },
};

export const JWT_CONSTANTS = {
  secret: process.env.SECRET || 'dontcare',
  expiresIn: '60s',
};

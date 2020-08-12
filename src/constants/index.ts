export const getKeys = constant =>
  Reflect.ownKeys(constant).map(constantKey => constant[constantKey].key);

export const USER_ROLES = {
  USER: { key: 'USER', label: 'User' },
  ADMIN: { key: 'ADMIN', label: 'Admin' },
};

export const JWT_CONSTANTS = {
  secret: process.env.SECRET || 'dontcare',
  expiresIn: '60s',
};

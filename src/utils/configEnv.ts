import 'dotenv/config';

const getEnv = (key: string): string => {
  const value = process.env[key];
  if (!value) {
    throw new Error(`A variável de ambiente ${key} não está definida.`);
  }
  return value;
};

export const configJWT = {
  secretKey: getEnv("JWT_SECRET"),
};

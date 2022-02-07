import bcrypt from 'bcrypt';
import config from './config';

export function hashString(str: string): Promise<string> {
  return bcrypt.hash(str, config.SALT_ROUNDS);
}

export function compareHashStrings(data: string | Buffer, encrypted: string): Promise<boolean> {
  return bcrypt.compare(data, encrypted);
}
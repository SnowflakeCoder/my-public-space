const BASE62_CHARS = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

export function generateBase62Code(length: number = 6): string {
  let result = '';
  for (let i = 0; i < length; i++) {
    result += BASE62_CHARS.charAt(Math.floor(Math.random() * BASE62_CHARS.length));
  }
  return result;
}

export function generateUniqueCode(existingCodes: string[], length: number = 6): string {
  let code: string;
  do {
    code = generateBase62Code(length);
  } while (existingCodes.includes(code));
  return code;
}
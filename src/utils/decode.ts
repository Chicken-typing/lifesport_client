import { jwtDecode } from 'jwt-decode';
export function decodeToken(token: string) {
  try {
    if (token) {
      const decoded: any = jwtDecode(token);
      return decoded;
    }
  } catch (error) {
    throw new Error('JWT verification failed: ' + error.message);
  }
}

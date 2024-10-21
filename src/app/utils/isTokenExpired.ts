import { jwtDecode } from "jwt-decode";

export function isTokenExpired(accessToken: string) {
  // Ko có token
  if (!accessToken) {
    return true;
  }
  // Có token, lớn hơn => hết hạn
  try {
    const decodedToken = jwtDecode(accessToken) as { exp: number };
    return decodedToken.exp < Date.now() / 1000;
  } catch (error) {
    console.log("Access token error:", error);
    return true;
  }
}

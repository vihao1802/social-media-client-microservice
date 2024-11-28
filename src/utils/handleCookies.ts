import { jwtDecode } from "jwt-decode";
function getCookie(name: string) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) {
    const part = parts.pop();
    if (part) {
      return part.split(";").shift();
    }
  }
}

interface CustomJwtPayload {
  nameid: string;
}
    
function getUserId_Cookie() {
  const cookie = getCookie("token");
  if (cookie) {
    const decodedToken = jwtDecode<CustomJwtPayload>(cookie);
    return decodedToken?.nameid;
  } else {
    // redirect to login page
    // window.location.href = "/signin";
    return null;
  }
}

export { getUserId_Cookie };
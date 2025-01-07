import { clsx } from "clsx";
import { twMerge } from "tailwind-merge"
import qs from "query-string";
import Cookies from 'js-cookie';

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}
export const formUrlQuery = ({ params, key, value }) => {
  const currentUrl = qs.parse(params);

  currentUrl[key] = value;

  return qs.stringifyUrl(
    {
      url: window.location.pathname,
      query: currentUrl,
    },
    { skipNull: true }
  );
};

export const removeKeysFromQuery = ({
  params,
  keysToRemove,
}) => {
  const currentUrl = qs.parse(params);

  keysToRemove.forEach((key) => {
    delete currentUrl[key];
  });

  return qs.stringifyUrl(
    {
      url: window.location.pathname,
      query: currentUrl,
    },
    { skipNull: true }
  );
};


const getToken = () => {
  // Log document.cookie for debugging
  console.log("Cookies:", document.cookie);

  // Split cookies into an array and find the `token`
  const tokenCookie = document.cookie.split('; ').find(cookie => cookie.trim().startsWith('token='));

  // If found, extract the value; otherwise, return null
  return tokenCookie ? tokenCookie.split('=')[1] : null;
};

export const isAuthenticated = () => {
  console.log(document.cookie);

  const token = getToken();
  
  if (!token){
    console.log("No token found");
    return false
    
  }

  // Optionally, you can also decode the token to check for expiry or validity
  const decodedToken = JSON.parse(atob(token.split('.')[1]));  // Decode the JWT payload (may need a library)
  const expiryTime = decodedToken?.exp * 1000;  // Token expiry time is usually in Unix format
  
  if (Date.now() >= expiryTime) {
    // If token is expired
    Cookies.remove('token');  // Optionally clear the cookie
    return false;
  }

  return true;  // Token is present and valid
};

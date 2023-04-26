import { createContext } from 'react';

export const AuthContext = createContext({
    userType: "notLoggedIn",
    setUserType: () => {},
    email: "null",
    setEmail: () => {},
    name: "null",
    setName: () => {},
    profileURL: "null",
    setProfileURL: () => {},
  });
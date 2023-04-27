import React from 'react';
import { GoogleLogin } from '@react-oauth/google';
import jwt_decode from "jwt-decode";
import { AuthContext } from "../AuthContext.js";
import { useContext } from 'react';
const clientId = '49524991744-m0uatjm8tp7b5n8u1ooavi0qfk4avdh9.apps.googleusercontent.com';

function GoogleButton() {

  const {userType, setUserType, email, setEmail, name, setName, profileURL, setProfileURL } = useContext(AuthContext);
  async function onSuccess(response) {
    var makeadmin = 1;
    var decoded = jwt_decode(response.credential);
    console.log(decoded);
    setEmail(decoded.email);
    setName(decoded.name);
    setProfileURL(decoded.picture);
    //here we make post req to determine if the person is an admin or not
    if((decoded.email === "cs20btech11021@iith.ac.in"||decoded.email === 'cs20btech11039@iith.ac.in') && makeadmin === 1)
    {
      setUserType("admin");
    }
    else{
      setUserType("user");
    }
    console.log(decoded);
    // /*here we will make a request to the authentication portion of the backend*/
    // const response = await fetch(url);
    // const data = await response.json();
    // setUserType(data); //check this for formatting of the response once 
    //`${process.env.REACT_APP_BACKEND_URL}/api/data`
  };

  const onFailure = (error) => {
    console.error(error);
  };

  return (
      <GoogleLogin
      onSuccess={onSuccess}
      onError={onFailure}
      />
  );
}

export default GoogleButton;
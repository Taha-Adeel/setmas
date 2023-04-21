import React from 'react';
import { GoogleLogin } from '@react-oauth/google';
import jwt_decode from "jwt-decode";
const clientId = '49524991744-m0uatjm8tp7b5n8u1ooavi0qfk4avdh9.apps.googleusercontent.com';

function GoogleButton() {
  const onSuccess = (response) => {
    var decoded = jwt_decode(response.credential);
    console.log(decoded);
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
import React,{useEffect} from 'react'
import {GoogleLogin} from '@react-oauth/google';
import jwt_decode from "jwt-decode";
import {useGoogleLogin} from '@react-oauth/google';
import axios from "axios"

const GoogleLoginComp = () => {

  const login = useGoogleLogin({
    onSuccess: async response => {
        try {
            const res = await axios.get("https://www.googleapis.com/oauth2/v3/userinfo", {
                headers: {
                    "Authorization": `Bearer ${response.access_token}`
                }
            })

            console.log(res.data)
        } catch (err) {
            console.log(err)

        }

    }
});

  return (
    <div className="signInButton">
      <button onClick={login}>
                    <i className="fa-brands fa-google"></i>
                   
                </button>
                <GoogleLogin
                    onSuccess={credentialResponse => {
                    //console.log(credentialResponse.credential);
                    var decoded = jwt_decode(credentialResponse.credential);
                    console.log(decoded)
                }}
                    onError={() => {
                    console.log('Login Failed');
                }}/>
    </div>
  )
}

export default GoogleLoginComp
import React from "react";
import jwtDecode from "jwt-decode";
import { GoogleLogin } from "@react-oauth/google";
import { GoogleOAuthProvider } from "@react-oauth/google";
import axios from "axios";

function App() {
  const successLoginWithGoogle = async (e) => {
    const token = jwtDecode(e.credential);

    const userObj = {
      name: token.name,
      email: token.email,
    };

    await axios
      .post("http://localhost:8000/api/register/client", userObj)
      .then((res) => {
        localStorage.setItem("token", res.data.token);
        // navigate("here will bt the path where user have to navigate after login")
      })
      .catch((err) => {
        console.log("Error: " + err.message);
      });
  };

  const failureLoginWithGoogle = (e) => {
    console.log("Error : ", e);
  };
  return (
    <>
      <div
        style={{
          width: "100%",
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "purple",
        }}
      >
        <div>
          <GoogleOAuthProvider clientId="201188651256-2blfps8odouqct7irmmh4gmn48s4lp1e.apps.googleusercontent.com">
            <GoogleLogin
              onSuccess={successLoginWithGoogle}
              onError={failureLoginWithGoogle}
            />
          </GoogleOAuthProvider>
        </div>
      </div>
    </>
  );
}

export default App;

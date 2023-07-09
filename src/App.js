import { gapi } from "gapi-script";
import { refreshTokenSetup } from "./refreshTokenSetup";
import GoogleLogin from "react-google-login";
import jwtDecode from "jwt-decode";

function App() {
  gapi.load("client:auth2", () => {
    gapi.client.init({
      clientId: "*****.apps.googleusercontent.com",
      plugin_name: "chat",
    });
  });

  const responseSuccessGoogle = (success) => {
    const token = jwtDecode(success.tokenObj.id_token);

    const userObj = {
      name: token.name,
      email: token.email,
    };

    console.log("User Obj : ", userObj);
  };

  const responseFailureGoogle = (failure) => {
    console.log("first failure : ", failure);
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
          <GoogleLogin
            clientId="340636402788-k287jmsa8kbmuhb3gi3ifdtg054vfu6l.apps.googleusercontent.com"
            buttonText="Login With Google"
            onSuccess={responseSuccessGoogle}
            onFailure={responseFailureGoogle}
            cookiePolicy={"single_host_origin"}
            refreshTokenSetup={refreshTokenSetup}
          />
        </div>
      </div>
    </>
  );
}

export default App;

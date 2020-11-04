import React from "react";
import { Button } from "antd";
import { GoogleLogin } from "react-google-login";
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";

export default function Login() {
  const responseGoogle = (data) => {
    if (data.tokenId !== undefined) {
      let params = {
        provider: "google",
        token: data.tokenId,
      };
      console.log(params);
    }
  };

  const responseFacebook = (data) => {
    if (data.accessToken !== undefined) {
      let params = {
        provider: "facebook",
        token: data.accessToken,
      };
      console.log(params);
    }
  };
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        marginTop: "50px",
      }}
    >
      <FacebookLogin
        appId={process.env.REACT_APP_FACEBOOK_APP_ID}
        callback={responseFacebook}
        render={(renderProps) => (
          <Button
            type="primary"
            onClick={renderProps.onClick}
            style={{ marginRight: "20px" }}
          >
            Facebook
          </Button>
        )}
      />
      <GoogleLogin
        clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
        render={(renderProps) => (
          <Button
            onClick={renderProps.onClick}
            disabled={renderProps.disabled}
            type="primary"
          >
            Google
          </Button>
        )}
        buttonText="Login"
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        cookiePolicy={"single_host_origin"}
      />
    </div>
  );
}

import React from "react";
import { Button } from "antd";
import { GoogleLogin } from "react-google-login";
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
import axios from "axios";

export default function Login() {
  const responseGoogle = (data) => {
    if (data.tokenId !== undefined) {
      axios
        .post(`http://localhost:5000/api/auth/google`, {
          tokenId: data.tokenId,
        })
        .then((res) => {
          console.log(res.data);
          localStorage.setItem("success", res.data.success);
        });
    }
  };

  const responseFacebook = (data) => {
    if (data.accessToken !== undefined) {
      axios
        .post(`http://localhost:5000/api/auth/facebook`, {
          token: data.accessToken,
        })
        .then((res) => {
          console.log(res.data);
          localStorage.setItem("success", res.data.success);
        });
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

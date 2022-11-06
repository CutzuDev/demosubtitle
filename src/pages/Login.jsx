import { GoogleLogin, GoogleLogout } from "react-google-login";
import { gapi } from "gapi-script";
import React from "react";
import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

import "./Login.css";

//////////////////////
const composer =
  process.env.REACT_APP_COMPOSER +
  (process.env.REACT_APP_STATE == "development" ? ":3050" : "");
//////////////////////
const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;

function Login() {
  const navigate = useNavigate();
  const introInfo = useRef();
  const mainTitle = useRef();

  const responseGoogle = (response) => {
    console.log(response);
    if ("profileObj" in response) {
      window.localStorage.token = response.profileObj.googleId;

      let headers = { "Content-Type": "application/json" };
      if (window.localStorage.affiliate !== undefined) {
        headers.affiliate = window.localStorage.affiliate;
      }
      fetch(process.env.REACT_APP_SECURITY + "://" + composer + "/api/signin", {
        method: "POST",
        body: JSON.stringify(response),
        headers: headers,
      }).then((data) => {
        navigate("/upload");
      });
    }
  };

  return (
    <div className="login">
      <nav className="navbar">
        <div className="navbar__container">
          <h1 className="navbar__title">Subtitle Plug</h1>
          <div className="navbar__links">
            <a
              href="mailto:thesubtitleplug@gmail.com?subject=support"
              target="_blank"
              className="navbar__contact--link"
            >
              <button
                className="navbar__button"
                //   onClick={(e) => {
                //     window.open(
                //       "mailto:thesubtitleplug@gmail.com?subject=support",
                //       "_blank"
                //     );
                //   }}
              >
                Contact
              </button>
            </a>

            <a href="https://www.paypal.com" className="contact__link">
              <button
                className="navbar__button"
                // onClick={(e) => {
                //   window.open(
                //     "https://www.paypal.com/paypalme/aleetllc%22,%22_blank%22"
                //   );
                // }}
              >
                Donate
              </button>
            </a>
            <a
              href="https://discord.gg"
              target="_blank"
              className="contact__link"
            >
              <button
                className="navbar__button bDiscord"
                // onClick={(e) => {
                //   window.open("https://discord.gg/2hst8cb7uY%22,%22_blank%22");
                // }}
              >
                Join The Discord
                <img
                  className="navbar__discord--icon"
                  src="https://cdn.discordapp.com/attachments/1038900522100477992/1038910960569688194/discord-mark-white.png"
                ></img>
              </button>
            </a>
          </div>
        </div>
      </nav>
      <div className="login__container">
        <div className="login__row">
          <div className="login__content--container">
            <div className="login__text--container">
              <h1 className="login__title" ref={mainTitle}>
                Make Subtitling <br></br>Your Videos <br></br> Easier
              </h1>
              <p className="login__para">
                You've been granted a beautiful life, and as someone who edits
                videos, a lot of your time can be spent subtitling videos. Time
                that you won't get back, so we have made the process of adding
                subtitles to your videos extremely simple. Your time is valuable
              </p>
              <GoogleLogin
                clientId={clientId}
                render={(renderProps) => (
                  <button
                    className="login__google--button"
                    onClick={renderProps.onClick}
                    onMouseOver={(e) => {
                      navigate("/");
                    }}
                    disabled={renderProps.disabled}
                  >
                    Continue With Google
                  </button>
                )}
                buttonText="Continue With Google"
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
                cookiePolicy={"single_host_origin"}
              />
            </div>

            <div className="login__img--container">
              <img
                className="login__img"
                src="https://subtitleplug.com/loreum.png"
              ></img>
            </div>
          </div>
        </div>
        <footer className="login__footer">
          <div className="login__footer--container">
            <a className="terms" href="/">
              <p className="terms">terms</p>
            </a>
            <p className="terms">thesubtitleplug@gmail.com</p>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default Login;

/* eslint-disable */

import React from "react";
import { useDispatch } from "react-redux";
import { kakaoLogin } from "../modules/kakao";

 const OAuth2RedirectHandler = (props) => {
  const dispatch = useDispatch();

  let code = new URL(window.location.href).searchParams.get("code");
  React.useEffect(async () => {
    await dispatch(kakaoLogin(code));
  }, []);
}

export default OAuth2RedirectHandler
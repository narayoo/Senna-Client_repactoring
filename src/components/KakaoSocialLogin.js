import React from "react";
import { useDispatch } from "react-redux";
import { kakaoLogin } from "../modules/kakaoReducer";



export default function KakaoSocialLogin() { 
    const dispatch = useDispatch();

    let code = new URL(window.location.href).searchParams.get("code");

    React.useEffect(async () => {
        await dispatch(kakaoLogin(code));
    }, []);
    

    return (
        <>
        <h1>hello world</h1>
        </>
    )
}
import React from "react";
import { useDispatch } from "react-redux";
import { kakaoLogin } from "../modules/kakaoReducer";
import { useHistory, Link } from 'react-router-dom'



export default function KakaoSocialLogin() { 
    const dispatch = useDispatch();
    const history = useHistory();

    let code = new URL(window.location.href).searchParams.get("code");

    React.useEffect(async () => {
        await dispatch(kakaoLogin(code));
    }, []);

    history.replace('./')

    return (
        <>
        <Link to='./' />
        </>
    )
}
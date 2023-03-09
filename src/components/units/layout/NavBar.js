import React, {useEffect, useState} from 'react';
import {NavBarWrapper} from "@/styles/styles";
import Link from "next/link";
import {useRecoilState} from "recoil";
import {accessTokenState} from "@/src/commons/recoil";
import {useRouter} from "next/router";

const NavBar = () => {
    // const [accessToken, setAccessToken] = useRecoilState(accessTokenState);
    const [jwt, setJwt] = useState("");
    const router = useRouter();
    useEffect(() => {
        setJwt(localStorage.getItem("jwt"));
    })

    const onClickLogout = async () => {
        localStorage.setItem("jwt", "");
        setJwt("");
        await router.push("/")
    }
    return (
        <NavBarWrapper>
            <Link href={"/"}>홈</Link>
            <div>
                {jwt ? <a href="#" onClick={onClickLogout}>로그아웃</a> : <Link href="/login">로그인</Link>}
                {!jwt && <Link href="/join">회원가입</Link>}
                 <Link href="/post/new">글작성하기</Link>
            </div>
        </NavBarWrapper>
    );
};

export default NavBar;
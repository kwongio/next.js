import React, {useEffect, useState} from 'react';
import {NavBarWrapper} from "@/styles/styles";
import Link from "next/link";
import {useRouter} from "next/router";
import {useMoveToPage} from "@/src/components/commons/hooks/useMoveToPage";

const NavBar = () => {
    const [jwt, setJwt] = useState("");
    const router = useRouter();
    useEffect(() => {
        setJwt(sessionStorage.getItem("jwt"));
    })

    const onClickLogout = async () => {
        sessionStorage.removeItem("jwt");
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
                <Link href="/kakaomap">카카오맵 이동</Link>
            </div>
        </NavBarWrapper>
    );
};

export default NavBar;
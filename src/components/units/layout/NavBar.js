import {NavBarWrapper} from "@/styles/styles";
import Link from "next/link";
import {useRouter} from "next/router";
import {useRecoilState} from "recoil";
import {accessTokenState} from "@/src/commons/recoil/recoil";
import axios from "axios";
import {useEffect} from "react";
import Cookies from 'js-cookie';

const NavBar = () => {
    const [jwt, setJwt] = useRecoilState(accessTokenState);
    const router = useRouter();
    const getToken = async () => {
        if (Cookies.get("refreshToken")) {
            const response = await axios.get("/refresh");
            setJwt(response.headers["authorization"]);
        }
    }
    useEffect(() => {
        getToken();
    }, []);


    const onClickLogout = async () => {
        setJwt("");
        Cookies.remove("refreshToken");
        void router.push("/")
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


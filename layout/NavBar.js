import React, {useEffect, useState} from 'react';
import Link from "next/link";
import {NavBar} from "../styles/emotion"
import axios from "axios";

const Nav = () => {
    return (<NavBar>
        <Link href={"/"}>홈</Link>
        <div>
            <Link href="/login">로그인</Link>
            <Link href="/join">회원가입</Link>
            <Link href="/post/new">글작성하기</Link>
        </div>

    </NavBar>);
};

export default Nav;
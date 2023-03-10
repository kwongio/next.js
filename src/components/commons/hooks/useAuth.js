import React, {useEffect} from 'react';
import {useRouter} from "next/router";

export  const UseAuth = () => {
    const router = useRouter();

    useEffect(() => {
        if(!sessionStorage.getItem("jwt")){
            void router.replace("/login");
            alert("로그인 후 이용가능합니다.");
        }
    }, [])
};


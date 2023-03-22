import React, {useEffect} from 'react';
import {useRouter} from "next/router";
import {useRecoilValue} from "recoil";
import {accessTokenState} from "@/src/commons/recoil/recoil";

export const UseAuth = () => {
    const router = useRouter();
    const jwt = useRecoilValue(accessTokenState);

    useEffect(() => {
        if (!jwt) {
            void router.replace("/");
        }
    }, [])
};


import React from 'react';
import {Hydrate, QueryClient, QueryClientProvider} from "react-query";
import {ReactQueryDevtools} from "react-query/devtools";
import axios from "axios";
import {useRecoilState} from "recoil";
import {accessTokenState} from "@/src/commons/recoil/recoil";
import {Modal} from "antd";

const GlobalSetting = (props) => {
    const [jwt, setJwt] = useRecoilState(accessTokenState);
    axios.defaults.baseURL = "http://localhost:8080"
    axios.defaults.withCredentials = true;
    axios.interceptors.response.use(response => response,
        async (error) => {
            const {config, response: {status}} = error;
            if (status === 401) {
                console.log("리프레시 토큰으로 access token 다시 가져오기");
                const originalRequest = config;
                const response = await axios.get("/refresh");
                setJwt(response.headers["authorization"]);
                originalRequest.headers.authorization = response.headers["authorization"];
                return axios(originalRequest);
            }
            return Promise.reject(error);
        });
    const errorHandler = (error) => {
        Modal.error({
            title: "네트워크에러",
            content: "네트워크에러"
        });

    }
    const [queryClient] = React.useState(() => new QueryClient({
        defaultOptions: {
            queries: {
                onError: errorHandler
            },
            mutations: {
                onError: errorHandler
            },
        }
    }));


    return (
        <QueryClientProvider client={queryClient}>
            <Hydrate state={props.pageProps.dehydratedState}>
                {props.children}
            </Hydrate>
            <ReactQueryDevtools/>
        </QueryClientProvider>
    );
};

export default GlobalSetting;
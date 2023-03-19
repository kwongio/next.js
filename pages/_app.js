import axios from "axios";
import Layout from "@/src/components/units/layout/Layout";
import {Global} from "@emotion/react";
import {globalStyle} from "@/styles/globalStyle";
import {RecoilRoot} from "recoil";

export default function App({Component, pageProps}) {
    axios.defaults.baseURL = "http://localhost:8080"
    axios.defaults.withCredentials = true;
    axios.interceptors.response.use(
        response => response,
        async error => {
            const status = error.response ? error.response.status : null;
            if (status === 401) {
                console.log("리프레시 토큰으로 access token 다시 가져오기");
                const response = await axios.get("/refresh");
                const jwt = response.headers["authorization"];
                console.log(jwt);
                sessionStorage.setItem("jwt", jwt);
            }
            return Promise.reject(error);
        }
    );

    return <>
        <RecoilRoot>
            <Global styles={globalStyle}/>
            <Layout>
                <Component {...pageProps} />
            </Layout>
        </RecoilRoot>
    </>
}

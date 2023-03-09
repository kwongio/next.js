import axios from "axios";
import Layout from "@/src/components/units/layout/Layout";
import {Global} from "@emotion/react";
import {globalStyle} from "@/styles/globalStyle";
import {RecoilRoot} from "recoil";
import {Head} from "next/document";

export default function App({Component, pageProps}) {
    axios.defaults.baseURL = "http://localhost:8080"

    return <>
        <RecoilRoot>

            <Global styles={globalStyle}/>
            <Layout>
                <Component {...pageProps} />
            </Layout>
        </RecoilRoot>
    </>
}

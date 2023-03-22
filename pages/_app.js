import Layout from "@/src/components/units/layout/Layout";
import {Global} from "@emotion/react";
import {globalStyle} from "@/styles/globalStyle";
import {RecoilRoot} from "recoil";
import GlobalSetting from "@/src/setting/GlobalSetting";

export default function App({Component, pageProps}) {
    return <>
        <RecoilRoot>
            <GlobalSetting pageProps={pageProps}>
                <Global styles={globalStyle}/>
                <Layout>
                    <Component {...pageProps} />
                </Layout>
            </GlobalSetting>
        </RecoilRoot>
    </>
}



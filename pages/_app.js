import '../styles/globals.css'
import axios from "axios";
import NavBar from "../layout/NavBar";
import Layout from "@/layout/Layout";

export default function App({Component, pageProps}) {
    axios.defaults.baseURL = "http://localhost:8080"

    return <>
        <Layout>
            <Component {...pageProps} />
        </Layout>
    </>
}

import {Container} from "@/styles/styles";
import NavBar from "@/src/components/units/layout/NavBar";
import Header from "@/src/components/units/layout/Header";
import Footer from "@/src/components/units/layout/Footer";
import Loading from "@/src/components/units/layout/Loading";

const Layout = (props) => {

    return (<>
            <NavBar/>
            <Container>
                <Header/>
                <Loading/>
                {props.children}
                <Footer/>
            </Container>
        </>


    );
};

export default Layout;
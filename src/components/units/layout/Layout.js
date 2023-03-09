import {Container} from "@/styles/styles";
import NavBar from "@/src/components/units/layout/NavBar";
import Header from "@/src/components/units/layout/Header";
import Footer from "@/src/components/units/layout/Footer";

const Layout = (props) => {
    return (<>
            <NavBar/>
            <Container>
                <Header/>
                {props.children}
                <Footer/>
            </Container>
        </>


    );
};

export default Layout;
import React from 'react';
import NavBar from "@/layout/NavBar";

const Layout = (props) => {
    return (
        <>
            <NavBar/>
            <div>배너</div>
            <div>메뉴</div>
            <div>{props.children}</div>
            <div>푸터</div>

        </>

    );
};

export default Layout;
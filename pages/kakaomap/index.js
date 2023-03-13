import React, {useEffect, useRef} from 'react';
import Head from "next/head";

const Index = () => {
    useEffect(() => {
        const script = document.createElement("script");
        script.src = "//dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=ac98c4d62c61ccd58e70f6a6d6b4cf4b"
        document.head.append(script);
        script.onload = () => {
            window.kakao.maps.load(function () {
                const container = document.getElementById('map'); //지도를 담을 영역의 DOM 레퍼런스
                const options = { //지도를 생성할 때 필요한 기본 옵션
                    center: new window.kakao.maps.LatLng(37.503370, 127.045340), //지도의 중심좌표.
                    level: 3 //지도의 레벨(확대, 축소 정도)
                };
                const map = new window.kakao.maps.Map(container, options); //지도 생성 및 객체 리턴
                console.log(map);
            })

        }

    }, []);

    return (<>
        <div id="map" style={{width: 500, height: 400}}></div>
    </>);
};

export default Index;
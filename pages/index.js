import React, {useEffect, useState} from 'react';
import axios from "axios";

const Main = () => {
    const [post, setPostList] = useState([]);

    useEffect(() => {
        axios.get("/posts").then((res) => setPostList(res.data.content));
    }, [])
    return (<>
        {post?.map(p => {
            return <div key={p.id}>번호: {p.id} 제목: {p.title} 콘텐트: {p.content} </div>
        })}
    </>)


};

export default Main;
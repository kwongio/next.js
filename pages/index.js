import React, {useEffect, useState} from 'react';
import axios from "axios";
import {Wrapper} from "@/styles/styles";
import Link from "next/link";

const Main = () => {
    const [post, setPostList] = useState([]);

    useEffect(() => {
        axios.get("/posts").then((res) => setPostList(res.data.content));
    }, [])

    const deletePost = async (event) => {
        await axios.delete(`/post/${event.target.id}`);
        await axios.get("/posts").then((res) => setPostList(res.data.content));
    }
    return (<Wrapper>
        {post?.map(p => (
                <div key={p.id}>
                    <Link href={`/post/${p.id}`}>{p.id}</Link>
                    <button id={p.id} onClick={deletePost}>삭제</button>
                </div>
            )
        )}
    </Wrapper>);


};

export default Main;
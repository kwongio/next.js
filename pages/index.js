import React, {useEffect, useState} from 'react';
import axios from "axios";
import {Wrapper} from "@/styles/styles";
import Link from "next/link";
import {Card} from "antd";

const Main = () => {
    const [post, setPostList] = useState([]);
    useEffect(() => {
        axios.get("/posts").then((res) => setPostList(res.data.content));
    }, [])

    const deletePost = async (event) => {
        const jwt = sessionStorage.getItem("jwt");
        try {
            await axios.delete(`/post/${event.target.id}`, {headers: {Authorization: jwt}});
            await axios.get("/posts").then((res) => setPostList(res.data.content));
            alert(`${event.target.id}번 삭제완료`);
        } catch (error) {
            alert(error.response.data.message);
        }

    }
    return (<Wrapper>
        {post?.map(p => (
                <Card key={p.id} title={p.title} extra={<Link href={`/post/${p.id}`}>{p.id}번</Link>}>
                    <p>내용: {p.content}</p>
                    <button id={p.id} onClick={deletePost}>삭제</button>
                </Card>
            )
        )}
    </Wrapper>);


};

export default Main;
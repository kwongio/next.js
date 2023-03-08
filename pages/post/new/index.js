import React, {useState} from 'react';
import {Button, Form, UserInput, Wrapper} from "@/styles/emotion";
import axios from "axios";
import {useRouter} from "next/router";

const PostWrite = () => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const router = useRouter();

    const onSubmitPost = async (event) => {
        event.preventDefault();
        const jwt = localStorage.getItem("jwt");
        await axios.post("/post/create", {title, content}, {
            headers: {Authorization: jwt}
        }).catch(res => {
            alert(res.response.data.message);
            router.push("/login");
        });
    }

    return (<Wrapper>
        <h1>글 작성</h1>
        <Form onSubmit={onSubmitPost}>
            타이틀
            <UserInput type={"text"} value={title} onChange={e => setTitle(e.target.value)}/>
            콘텐트
            <UserInput type={"text"} value={content} onChange={e => setContent(e.target.value)}/>
            <Button type={"submit"}>글등록하기</Button>
        </Form>
    </Wrapper>);
};

export default PostWrite;
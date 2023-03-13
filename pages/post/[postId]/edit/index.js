import {useForm} from "react-hook-form";
import {yupResolver} from '@hookform/resolvers/yup';
import React, {useEffect, useState} from 'react';
import {useRouter} from "next/router";
import axios from "axios";
import {Button, Error, Form, UserInput, Wrapper} from "@/styles/styles";
import {UseAuth} from "@/src/components/commons/hooks/useAuth";
import {PostSchema} from "@/src/components/validation/validation";


const Edit = () => {
    UseAuth();
    const {register, handleSubmit, formState: {errors}} = useForm({resolver: yupResolver(PostSchema)});
    const [post, setPost] = useState("");
    const [error, setError] = useState("");
    const router = useRouter();
    const [file, setFile] = useState(null);
    useEffect(() => {
        getPost();
    }, []);

    const onChangeFile = (event) => {
        setFile(event.target.files?.[0]);
    }
    const getPost = async () => {
        try {
            await axios.get(`/posts/${router.query.postId}`).then(res => setPost(res.data));
        } catch (error) {
            alert(error.response.data.message);
            await router.push("/")
        }

    }

    const onClickSubmit = async (data) => {
        const jwt = sessionStorage.getItem("jwt");
        try {
            const formData = new FormData();
            const post = {
                title: data.title,
                content: data.content
            }
            formData.append("file", file);
            const json = JSON.stringify(post);
            const blob = new Blob([json], {type: "application/json"});
            formData.append("post", blob);
            const res = await axios.put(`/posts/${router.query.postId}`, formData, {
                headers: {Authorization: jwt}
            })
            alert("글 수정이 완료되었습니다.");
            await router.push(`/post/${res.data.id}`);
        } catch (error) {
            setError(error.response.data.message);
        }
    }


    return (<Wrapper>
        <Form onSubmit={handleSubmit(onClickSubmit)}>
            <h1>글 수정</h1>
            <UserInput type="text" placeholder="title"  {...register("title")} defaultValue={post?.title}/>
            <Error>{errors.title?.message}</Error>
            <UserInput type="text" placeholder="content" {...register("content")} defaultValue={post?.content}/>
            <Error>{errors.content?.message}</Error>
            {error && <Error>{error}</Error>}
            <input type="file" onChange={onChangeFile} multiple/>
            <Button>글 수정하기</Button>
        </Form>
    </Wrapper>);
};

export default Edit;

export async function getServerSideProps() {
    return {
        props: {},
    };
}
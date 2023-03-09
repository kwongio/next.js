import {useForm} from "react-hook-form";
import * as yup from "yup";
import {yupResolver} from '@hookform/resolvers/yup';
import React, {useEffect, useState} from 'react';
import {useRouter} from "next/router";
import axios from "axios";
import {Button, Error, Form, UserInput, Wrapper} from "@/styles/styles";

const PostSchema = yup.object({
    title: yup.string().required("필수값이다"), content: yup.string().required("필수값이다")
});

const Edit = () => {
    const {register, handleSubmit, formState: {errors}} = useForm({resolver: yupResolver(PostSchema)});
    const [post, setPost] = useState("");
    const [error, setError] = useState("");
    const router = useRouter();
    useEffect(() => {
        getPost();
    }, []);

    const getPost = async () => {
        try {
            await axios.get(`/post/${router.query.postId}`).then(res => setPost(res.data));
        } catch (error) {
            alert(error.response.data.message);
            await router.push("/")
        }

    }

    const onClickSubmit = async (data) => {
        const jwt = localStorage.getItem("jwt");
        try {
            const res = await axios.put(`/post/${router.query.postId}`, {
                title: data.title,
                content: data.content
            }, {
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
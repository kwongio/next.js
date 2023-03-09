import {useForm} from "react-hook-form";
import * as yup from "yup";
import {yupResolver} from '@hookform/resolvers/yup';
import React, {useState} from 'react';
import {Button, Error, Form, UserInput, Wrapper} from "@/styles/styles";
import axios from "axios";
import {useRouter} from "next/router";


const PostSchema = yup.object({
    title: yup.string().required("필수값이다"), content: yup.string().required("필수값이다")
});

const PostWrite = () => {
    const {register, handleSubmit, formState: {errors}} = useForm({resolver: yupResolver(PostSchema)});
    const [error, setError] = useState("");
    const router = useRouter();


    const onClickSubmit = async (data) => {
        const jwt = localStorage.getItem("jwt");
        try {
            const res = await axios.post("/post/create", {
                title: data.title, content: data.content
            }, {
                headers: {Authorization: jwt}
            })
            alert("글 등록이 완료되었습니다.");
            await router.push(`/post/${res.data.id}`);
        } catch (error) {
            setError(error.response.data.message);
        }
    }

    return (<Wrapper>
        <Form onSubmit={handleSubmit(onClickSubmit)}>
            <h1>글 작성</h1>
            <UserInput type="text" placeholder="title"  {...register("title")}/>
            <Error>{errors.title?.message}</Error>
            <UserInput type="text" placeholder="content" {...register("content")}/>
            <Error>{errors.content?.message}</Error>
            {error && <Error>{error}</Error>}
            <Button>글등록하기</Button>
        </Form>
    </Wrapper>);
};

export default PostWrite;
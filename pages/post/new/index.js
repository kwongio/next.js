import {useForm} from "react-hook-form";
import {yupResolver} from '@hookform/resolvers/yup';
import React, {useState} from 'react';
import {Button, Error, Form, UserInput, Wrapper} from "@/styles/styles";
import axios from "axios";
import {useRouter} from "next/router";
import {UseAuth} from "@/src/components/commons/hooks/useAuth";
import {PostSchema} from "@/src/components/validation/validation";
import dynamic from "next/dynamic";
import 'react-quill/dist/quill.snow.css'

const ReactQuill = dynamic(() => import("react-quill"), {ssr: false})
const PostWrite = () => {
    UseAuth();
    const {register, handleSubmit, setValue, trigger, formState: {errors}} = useForm({
        resolver: yupResolver(PostSchema)
    });
    const [error, setError] = useState("");
    const router = useRouter();
    const [file, setFile] = useState(null);
    const onChangeFile = (event) => {
        setFile(event.target.files?.[0]);
    }

    const onChangeContent = (value) => {
        setValue("content", value);
        void trigger("content");
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
            const res = await axios.post("/post/create", formData, {
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
            content
            <ReactQuill onChange={onChangeContent} theme="snow"/>
            <Error>{errors.content?.message}</Error>
            {error && <Error>{error}</Error>}
            <input type="file" onChange={onChangeFile} multiple/>
            <Button>글등록하기</Button>
        </Form>
    </Wrapper>);
};

export default PostWrite;
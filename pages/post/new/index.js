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
import Image from "next/image";

const ReactQuill = dynamic(() => import("react-quill"), {ssr: false})
const PostWrite = () => {
    UseAuth();
    const {register, handleSubmit, setValue, trigger, formState: {errors}} = useForm({
        resolver: yupResolver(PostSchema)
    });
    const [error, setError] = useState("");
    const [file, setFile] = useState("");
    const router = useRouter();
    const [prevImageUrl, setPrevImageUrl] = useState(null);
    const onChangeFile = (event) => {
        const file = event.target.files?.[0];
        if (!file) return;
        console.log(file);
        //임시 url 생성 내 브라우저에서만 가능
        // const result = URL.createObjectURL(file);
        // setImageUrl(result);
        // console.log(result);
        const fileReader = new FileReader();
        fileReader.readAsDataURL(file);
        fileReader.onload = (event) => {
            setPrevImageUrl(event.target?.result);
            setFile(file);
        }

        // 다른 브라우저 에서 접근 가능
    }

    const onChangeContent = (value) => {
        setValue("content", value);
        void trigger("content");
    }
    const onClickSubmit = async (data) => {
        //먼저 스토리지에 이미지를 저장하고 주소를 받아와서 저장해야됨
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
            void router.push(`/post/${res.data}`);
        } catch (error) {
            setFile(error.response.data.message);
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
            {file && <Error>{file}</Error>}
            <input type="file" onChange={onChangeFile} multiple/>
            <img src={prevImageUrl} width={500} height={500}/>
            <Button>글등록하기</Button>
        </Form>
    </Wrapper>);
};

export default PostWrite;
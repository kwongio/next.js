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
    const [error, setError] = useState("");
    const {register, handleSubmit, setValue, trigger, formState: {errors}} = useForm({
        resolver: yupResolver(PostSchema), mode: "onChange",
    });
    const router = useRouter();
    const modules = {
        toolbar: [[{'header': [1, 2, false]}], ['bold', 'italic', 'underline', 'strike', 'blockquote'], [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}], ['link', 'image'], ['clean']],
    }
    const formats = ['header', 'bold', 'italic', 'underline', 'strike', 'blockquote', 'list', 'bullet', 'indent', 'link', 'image'];

    const onChangeContents = (value) => {
        setValue("contents", value);
        void trigger("contents");
    }

    const onClickSubmit = async (data) => {
        //먼저 스토리지에 이미지를 저장하고 주소를 받아와서 저장해야됨
        const jwt = sessionStorage.getItem("jwt");
        try {
            const res = await axios.post("/post/create", {
                title: data.title, content: data.contents,
            }, {
                headers: {Authorization: jwt}
            });

            void router.push(`/post/${res.data}`);
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
            <ReactQuill onChange={onChangeContents} theme="snow" modules={modules} formats={formats}/>
            <Error>{errors.contents?.message}</Error>
            {error && <Error>{error}</Error>}
            s <Button>글등록하기</Button>
        </Form>
    </Wrapper>);
};

export default PostWrite;
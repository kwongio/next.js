import {useForm} from "react-hook-form";
import {yupResolver} from '@hookform/resolvers/yup';
import React, {useEffect, useState} from 'react';
import {useRouter} from "next/router";
import axios from "axios";
import {Button, Error, Form, UserInput, Wrapper} from "@/styles/styles";
import {UseAuth} from "@/src/components/commons/hooks/useAuth";
import {PostSchema} from "@/src/components/reacthookform/schema";
import {useMutation, useQuery} from "react-query";
import {Modal} from "antd";
import {useRecoilValue} from "recoil";
import {accessTokenState} from "@/src/commons/recoil/recoil";
import {getPost, updatePost} from "@/src/post/post.query";



const Edit = () => {
    UseAuth();
    const jwt = useRecoilValue(accessTokenState);
    const router = useRouter();
    const {register, handleSubmit, setValue, formState: {errors}} = useForm({
        resolver: yupResolver(PostSchema)
    });
    const postId = router.query.postId;
    const {data} = useQuery(["post", postId], getPost(postId));
    const {mutateAsync} = useMutation((updateData) => updatePost(updateData, jwt, postId));

    useEffect(() => {
        setValue("title", data?.title);
        setValue("content", data?.content);
    }, [data]);


    const onClickSubmit = async (data) => {
        const id  = await mutateAsync({
            title: data.title, content: data.content,
        });
        Modal.success({
            title: "게시글",
            content: "수정완료"
        });
        void router.push(`/post/${id}`);
    }


    return (<Wrapper>
        <Form onSubmit={handleSubmit(onClickSubmit)}>
            <h1>글 수정</h1>
            <UserInput type="text" placeholder="title"  {...register("title")} />
            <Error>{errors.title?.message}</Error>
            <UserInput type="text" placeholder="content" {...register("content")} />
            <Error>{errors.content?.message}</Error>
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
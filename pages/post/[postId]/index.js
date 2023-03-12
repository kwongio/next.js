import React, {useEffect, useState} from 'react';
import axios from "axios";
import {useRouter} from "next/router";
import {Card} from "antd";
import Link from "next/link";
import Image from "next/image";

const Post = () => {
    const [post, setPost] = useState("");
    const router = useRouter();

    useEffect(() => {
        getPost();
    }, [])


    const getPost = async () => {
        try {
            await axios.get(`/post/${router.query.postId}`).then(res => setPost(res.data));
        } catch (error) {
            alert(error.response.data.message);
            await router.push("/")
        }

    }
    const onClickMoveToEdit = (event) => {
        router.push(`/post/${event.target.id}/edit`)
    }
    return (

        <Card key={post.id} title={post.title}  extra={<Link href={`/post/${post.id}`}>{post.id}번</Link>}>
            <div>{post?.id}</div>
            <div>{post?.title}</div>
            <div>{post?.content}</div>
            <Image src={`/images/${post?.imageSaveName}`} width={200} height={200} alt={"이미지"}/>
            <div>{post?.imageSaveName}</div>
            <div>{post?.imageUrl}</div>
            <div>{post?.imageOriginalName}</div>
            <div>{post?.mime}</div>
            <div>{post?.view}</div>
            <div>{post.user?.email}</div>
            <div>{post.user?.createAt}</div>
            <div>{post.user?.username}</div>
            <div>{post.user?.fullName}</div>

            <button id={post.id} onClick={onClickMoveToEdit}>수정하기</button>
        </Card>

    );
};

export default Post;

export async function getServerSideProps() {
    return {
        props: {},
    };
}
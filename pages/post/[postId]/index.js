import React, {useEffect, useState} from 'react';
import axios from "axios";
import {useRouter} from "next/router";

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
        <div>
            <div>{post?.id}</div>
            <div>{post?.title}</div>
            <div>{post?.content}</div>
            <div>{post?.view}</div>
            <div>{post.user?.email}</div>
            <div>{post.user?.createAt}</div>
            <div>{post.user?.username}</div>
            <div>{post.user?.fullName}</div>
            <button id={post.id} onClick={onClickMoveToEdit}>수정하기</button>
        </div>
    );
};

export default Post;

export async function getServerSideProps() {
    return {
        props: {},
    };
}
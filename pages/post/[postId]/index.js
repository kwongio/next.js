import React, {useEffect, useState} from 'react';
import axios from "axios";
import {useRouter} from "next/router";
import {Card} from "antd";
import Link from "next/link";
import Image from "next/image";
import Dompurify from 'dompurify'
import {useQuery} from "react-query";
import {getPost} from "@/src/post/post.query";


const Post = options => {
    const [load, setLoad] = useState(false);
    const router = useRouter();
    const postId = router.query.postId;
    const {data} = useQuery(["post", postId], getPost(postId));

    useEffect(() => {
        setLoad(true);
    }, [])


    const onClickMoveToEdit = (event) => {
        router.push(`/post/${event.target.id}/edit`)
    }

    return (

        <Card key={data?.id} title={data?.title} extra={<Link href={`/post/${data?.id}`}>{data?.id}번</Link>}>
            <div>{data?.id}</div>
            <div>{data?.title}</div>
            {load && <div dangerouslySetInnerHTML={{__html: Dompurify.sanitize(data?.content)}}/>}
            <div>{data?.view}</div>
            <div>{data?.user.email}</div>
            <div>{data?.user.createAt}</div>
            <div>{data?.user.username}</div>
            <div>{data?.user.fullName}</div>
            <button id={data?.id} onClick={onClickMoveToEdit}>수정하기</button>
        </Card>

    );
};

export default Post;

export async function getServerSideProps() {
    return {
        props: {},
    };
}
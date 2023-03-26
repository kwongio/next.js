import React, {useEffect, useState} from 'react';
import axios from "axios";
import {Wrapper} from "@/styles/styles";
import Link from "next/link";
import {Card, Pagination} from "antd";
import {useQuery, useQueryClient} from "react-query";
import {useRecoilValue} from "recoil";
import {accessTokenState} from "@/src/commons/recoil/recoil";
import {getPostList} from "@/src/post/post.query";


const Main = ({title}) => {
    const jwt = useRecoilValue(accessTokenState);
    const [currentPage, setCurrentPage] = useState(1);
    const {data} = useQuery(["posts", currentPage], getPostList(currentPage), {keepPreviousData: true});
    const queryClient = new useQueryClient();

    useEffect(() => {
        const nextPage = currentPage + 1;
        queryClient.prefetchQuery(["posts", nextPage], getPostList(nextPage));
    }, [currentPage, queryClient])

    const onClickPage = (value) => {
        setCurrentPage(value);
    }

    const deletePost = async (event) => {
        try {
            await axios.delete(`/post/${event.target.id}`, {headers: {Authorization: jwt}});
            await axios.get("/posts").then((res) => setPostList(res.data.content));
            alert(`${event.target.id}번 삭제완료`);
        } catch (error) {
            console.log(error);
            alert(error.response.data.message);
        }
    }
    console.log(title);


    return (<Wrapper>
        {data?.content?.map(p => (<Card key={p.id} title={p.title} extra={<Link href={`/post/${p.id}`}>{p.id}번</Link>}>
            <p>내용: {p.content}</p>
            <button id={p.id} onClick={deletePost}>삭제</button>
        </Card>))}
        <Pagination defaultCurrent={1} total={data?.totalElements} pageSize={10} onChange={onClickPage}/>
    </Wrapper>);


};

export default Main;


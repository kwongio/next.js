import {useForm} from "react-hook-form";
import {yupResolver} from '@hookform/resolvers/yup';
import {Button, Error, Form, UserInput, Wrapper} from "@/styles/styles";
import axios from "axios";
import {useRouter} from "next/router";
import {UseAuth} from "@/src/components/commons/hooks/useAuth";
import {PostSchema} from "@/src/components/reacthookform/schema";
import dynamic from "next/dynamic";
import 'react-quill/dist/quill.snow.css'
import {useRecoilValue} from "recoil";
import {accessTokenState} from "@/src/commons/recoil/recoil";
import {useMutation} from "react-query";
import {createPost} from "@/src/post/post.query";

const ReactQuill = dynamic(() => import("react-quill"), {ssr: false})


const PostWrite = () => {
    UseAuth();
    const jwt = useRecoilValue(accessTokenState);
    const router = useRouter();
    const {register, handleSubmit, setValue, trigger, formState: {errors}} = useForm({
        resolver: yupResolver(PostSchema),
        mode: "onChange",
    });
    const {mutateAsync} = useMutation(async (createData) => await createPost(createData, jwt));
    const modules = {toolbar: [[{'header': [1, 2, false]}], ['bold', 'italic', 'underline', 'strike', 'blockquote'], [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}], ['link', 'image'], ['clean']],}
    const formats = ['header', 'bold', 'italic', 'underline', 'strike', 'blockquote', 'list', 'bullet', 'indent', 'link', 'image'];

    const onChangeContents = (value) => {
        setValue("content", value);
        void trigger("content");
    }

    const onClickSubmit = async (data) => {
        const id = await mutateAsync({
            title: data.title,
            content: data.content,
        });
        void router.replace(`/post/${id}`);
    }

    return (<Wrapper>
        <Form onSubmit={handleSubmit(onClickSubmit)}>
            <h1>글 작성</h1>
            <UserInput type="text" placeholder="title"  {...register("title")}/>
            <Error>{errors.title?.message}</Error>
            content
            <ReactQuill onChange={onChangeContents} theme="snow" modules={modules} formats={formats}/>
            <Error>{errors.content?.message}</Error>
            <Button>글등록하기</Button>
        </Form>
    </Wrapper>);
};

export default PostWrite;
import * as yup from "yup";

export const LoginSchema = yup.object({
    username: yup.string().required("필수값이다"), password: yup.string().required("필수값이다").min(4, "4자리"),
});

export const PostSchema = yup.object({
    title: yup.string().required("필수값이다"), contents: yup.string().required("필수값이다")
});

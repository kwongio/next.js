import axios from "axios";
export const getPost = (postId) => async () => {
    const response = await axios.get(`/post/${postId}`)
    return response.data;
}

export const getPostList = (page) => async () => {
    const response = await axios.get(`/posts?page=${page}`);
    return response.data;
}

export const createPost = async (createData, jwt) => {
    try{
        const response = await axios.post("/post/create", createData, {
            headers: {Authorization: jwt}
        });
        return response.data;
    }catch(error){
        throw error;
    }
}

export const updatePost = async (updateData, jwt, postId) => {
    const response = await axios.post(`/post/${postId}`, updateData, {
        headers: {Authorization: jwt}
    });
    return response.data;

}
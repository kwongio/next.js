import {useRouter} from "next/router";

export const useMoveToPage = () => {
    const router = useRouter();

    const onClickMoveToPage = (path) => () => {
        void router.push(path);
    }
    return {onClickMoveToPage};
};


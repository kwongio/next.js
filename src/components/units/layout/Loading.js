import {useIsFetching, useIsMutating} from "react-query";
import {Spin} from "antd";

export default function Loading() {
    const isFetching = useIsFetching();
    const isMutating = useIsMutating();
    if (isFetching || isMutating) {
        return <Spin tip="Loading" size="large"/>;
    }
    return <></>;
}



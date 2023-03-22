import {atom} from "recoil";
import {recoilPersist} from "recoil-persist";

const {persistAtom} = recoilPersist();
export const accessTokenState = atom({
    key: "accessTokenState",
    default: "",

})

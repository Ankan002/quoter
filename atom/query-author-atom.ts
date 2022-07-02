import {atom} from "recoil";

export const queryAuthorAtom = atom<string>({
    key: "queryAuthorAtom",
    default: ""
});
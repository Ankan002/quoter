import {atom} from "recoil";

export const initialLoadingAtom = atom<boolean>({
    key: "initialLoadingAtom",
    default: false
})
import {atom} from "recoil";
import {QuoteComponentType} from "../types";

export const componentAtom = atom<QuoteComponentType>({
    key: "componentAtom",
    default: "random"
});
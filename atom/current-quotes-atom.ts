import {atom} from "recoil";
import {QuotesType} from "../types/quotes-type";

export const currentQuotesAtom = atom<Array<QuotesType>>({
    key: "currentQuotesAtom",
    default: []
})
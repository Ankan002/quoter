import React, {useState} from 'react';
import { BsArrowRepeat } from "react-icons/bs"
import {useRecoilState} from "recoil";
import {componentAtom} from "../../atom/component-atom";
import {useRecoilValue} from "recoil";
import {initialLoadingAtom} from "../../atom/initial-loading-atom";
import {QuoteComponentType} from "../../types";
import {fetchAQuote} from "../../helpers/fetch-a-quote";
import {toast} from "react-hot-toast";
import {QuotesType} from "../../types/quotes-type";
import {currentQuotesAtom} from "../../atom/current-quotes-atom";

const Navbar = () => {

    const [currentComponent, setCurrentComponent] = useRecoilState<QuoteComponentType>(componentAtom);
    const isInitialLoading = useRecoilValue<boolean>(initialLoadingAtom);
    const [currentQuotes, setCurrentQuotes] = useRecoilState<Array<QuotesType>>(currentQuotesAtom);

    const [isFetching, setIsFetching] = useState<boolean>(false)

    const onRandomClick = async() => {
        if(isInitialLoading || isFetching) return;

        setIsFetching(true);
        const loadingToastId = toast.loading("Quote coming in hot...");
        const response = await fetchAQuote();
        toast.dismiss(loadingToastId);
        setIsFetching(false);

        if(response.error){
            toast.error(`${response.error}`);
            return;
        }

        setCurrentQuotes(response.data);

        if(currentComponent !== "random") setCurrentComponent("random");
    }

    return (
        <nav className="w-full px-4 py-2 flex items-center justify-end">
            <button className="px-5 py-2 cursor-pointer transition-all ease-in-out flex justify-center items-center lg:text-xl md:text-lg sm:text-base text-xs shadow-[0_1px_12px_2px_rgba(247,223,148,0.7)] rounded-md font-extralight" onClick={onRandomClick}>
                random

                <BsArrowRepeat className="ml-2" />
            </button>
        </nav>
    );
};

export default Navbar;

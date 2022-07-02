import React, {useEffect, useRef, useState} from 'react';
import {toast} from "react-hot-toast";
import {fetchAuthorQuotes} from "../../helpers/fetch-author-quotes";
import {useRecoilState} from "recoil";
import {QuotesType} from "../../types/quotes-type";
import {currentQuotesAtom} from "../../atom/current-quotes-atom";
import Skeleton, {SkeletonTheme} from "react-loading-skeleton";
import Quote from "../quote";

interface Props{
    author: string;
}

const SpecificAuthor = (props: Props) => {
    const {author} = props;

    const [isFetching, setIsFetching] = useState<boolean>(false);
    const [currentQuotes, setCurrentQuotes] = useRecoilState<Array<QuotesType>>(currentQuotesAtom);

    const isMounted = useRef<boolean>(false);

    const getSpecificQuotes = async() => {
        if(isFetching) return;

        setIsFetching(true);
        const loadingToastId = toast.loading("Hold on the author is sending quotes...");

        const result = await fetchAuthorQuotes(author);

        toast.dismiss(loadingToastId);
        setIsFetching(false);

        if(!result.success){
            toast.error(`${result.error}`);
            return;
        }

        setCurrentQuotes(result.data);
    }

    useEffect(() => {
        if(!isMounted.current){
            isMounted.current = true;
            getSpecificQuotes()
                .catch(e => console.log(e));
        }
    }, [])

    return (
        <div className={`w-full flex-grow flex flex-col items-center px-3 py-3 ${isFetching ? "justify-center" : ""}`}>
            {
                isFetching ? (
                    <SkeletonTheme baseColor="#F7DF94" highlightColor="#FAEA48">
                        <div className="lg:w-1/3 md:w-1/2 w-full">
                            <Skeleton count={6} />
                        </div>
                    </SkeletonTheme>
                ) : (
                    <>
                        <h1 className="lg:text-3xl md:text-2xl sm:text-xl text-lg text-base font-raleway text-start lg:w-1/3 md:w-1/2 w-full mb-6 pl-8 pr-2">
                            {author}
                        </h1>

                        {
                            currentQuotes.length > 0 && currentQuotes.map((currentQuote) => (
                                <Quote quote={currentQuote.quoteText} key={currentQuote._id} />
                            ))
                        }
                    </>
                )
            }
        </div>
    );
};

export default SpecificAuthor;

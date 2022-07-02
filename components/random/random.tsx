import React from 'react';
import Quote from "../quote";
import {useRecoilValue} from "recoil";
import {initialLoadingAtom} from "../../atom/initial-loading-atom";
import Skeleton, {SkeletonTheme} from "react-loading-skeleton";
import {currentQuotesAtom} from "../../atom/current-quotes-atom";
import {QuotesType} from "../../types/quotes-type";
import Details from "../details";

const Random = () => {

    const initialLoading = useRecoilValue<boolean>(initialLoadingAtom);
    const currentQuotes = useRecoilValue<Array<QuotesType>>(currentQuotesAtom);

    return (
        <div className="w-full flex-grow flex flex-col justify-center items-center px-3 py-3">
            {
                !initialLoading && currentQuotes.length > 0 ? (
                    <Quote quote={currentQuotes[0].quoteText}/>
                ) : (
                    <SkeletonTheme baseColor="#F7DF94" highlightColor="#FAEA48">
                        <div className="lg:w-1/3 md:w-1/2 w-full">
                            <Skeleton count={6} />
                        </div>
                    </SkeletonTheme>
                )
            }

            {
                currentQuotes.length > 0 && (
                    <Details author={currentQuotes[0].quoteAuthor} genre={currentQuotes[0].quoteGenre} />
                )
            }
        </div>
    );
};

export default Random;

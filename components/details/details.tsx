import React from 'react';
import {IoMdArrowRoundForward} from "react-icons/io";
import {useSetRecoilState} from "recoil";
import {componentAtom} from "../../atom/component-atom";
import {queryAuthorAtom} from "../../atom/query-author-atom";
import {QuoteComponentType} from "../../types";

interface Props{
    author: string;
    genre: string;
}

const Details = (props: Props) => {
    const {author, genre} = props;

    const setCurrentComponent = useSetRecoilState<QuoteComponentType>(componentAtom);
    const setQueryAuthor = useSetRecoilState<string>(queryAuthorAtom);

    const onAuthorClick = () => {
        setQueryAuthor(author);
        setCurrentComponent("specific");
    }

    return (
        <button className="lg:w-1/3 md:w-1/2 w-full px-2 py-6 flex items-center justify-between text-black hover:text-white hover:bg-black mt-16 transition-all ease-in-out rounded-sm" onClick={onAuthorClick}>
            <div className="w-3/4">
                <h1 className="lg:text-2xl md:text-xl sm:text-lg text-base font-raleway text-start">
                    {author}
                </h1>
                <p className="lg:text-lg md:text-base sm:text-xs text-xs font-raleway font-thin text-start">
                    {genre}
                </p>
            </div>
            <div className="flex-grow flex items-center justify-end">
                <IoMdArrowRoundForward className="text-white lg:text-4xl md:text-3xl sm:text-2xl text-xl" />
            </div>
        </button>
    );
};

export default Details;

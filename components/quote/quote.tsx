import React from 'react';


interface Props{
    quote: string;
}

const Quote = (props: Props) => {
    const {quote} = props;

    return (
        <div className="lg:w-1/3 md:w-1/2 w-full pr-2 pl-8 py-1 border-l-8 border-l-primary-yellow my-5">
            <p className="lg:text-3xl md:text-2xl sm:text-xl text-lg font-raleway font-thin">
                {`"${quote}"`}
            </p>
        </div>
    );
};

export default Quote;

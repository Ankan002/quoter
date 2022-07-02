import type { NextPage } from 'next'
import CustomHead from "../components/custom-head";
import Navbar from "../components/navbar";
import {fetchAQuote} from "../helpers/fetch-a-quote";
import {currentQuotesAtom} from "../atom/current-quotes-atom";
import {useRecoilState, useRecoilValue} from "recoil";
import {initialLoadingAtom} from "../atom/initial-loading-atom";
import {QuotesType} from "../types/quotes-type";
import {useEffect, useRef} from "react";
import {toast} from "react-hot-toast";
import Random from "../components/random";
import {QuoteComponentType} from "../types";
import {componentAtom} from "../atom/component-atom";
import {queryAuthorAtom} from "../atom/query-author-atom";
import SpecificAuthor from "../components/specific-author";

const Home: NextPage = () => {

  const [initialLoading, setInitialLoading] = useRecoilState<boolean>(initialLoadingAtom);
  const [currentQuotes, setCurrentQuotes] = useRecoilState<Array<QuotesType>>(currentQuotesAtom);
  const currentComponent = useRecoilValue<QuoteComponentType>(componentAtom);
  const queryAuthor = useRecoilValue<string>(queryAuthorAtom);

  const isMounted = useRef<boolean>(false);

  const onLoad = async() => {
      if (initialLoading) return;

      const loadingToastId = toast.loading("Hold on while we fetch your quote....");

      setInitialLoading(true);
      const response = await fetchAQuote();
      setInitialLoading(false);
      toast.dismiss(loadingToastId);

      if(!response?.success){
          toast.error(`${response?.error}`);
          return;
      }

      setCurrentQuotes(response.data);
  }

  useEffect(() => {
      if(!isMounted.current) {
          isMounted.current = true;
          onLoad()
              .catch(e => console.log(e));
      }
  }, [])

  return (
    <div className="flex flex-col min-h-screen font-raleway">
      <CustomHead title="Quoter" />
      <Navbar/>
        {
            currentComponent === "random" ? (
                <Random/>
            ) : (
                <SpecificAuthor author={queryAuthor} />
            )
        }

    </div>
  )
}

export default Home

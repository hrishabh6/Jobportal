import  { useEffect, useMemo, useState } from "react";
import { ReloadIcon } from "@radix-ui/react-icons";
import GlobalFilters from "./GlobalFilters";

import { Link } from "react-router-dom";
import axios from "axios";

const GlobalResult = () => {
    const searchParams = useMemo(() => new URLSearchParams(location.search), [location.search]);
    const [isLoading, setIsLoading] = useState(false);
    const [result, setResult] = useState([]);
        
    
    const global = searchParams.get("global");
    const type = searchParams.get("type");

    useEffect(() => {
        const fetchResult = async () => {
            try {
                setIsLoading(true)
                const res = await axios.post(`${import.meta.env.VITE_GLOBAL_API_END_POINT}admin/search`,{query : global, type}, {
                    headers: {
                      "Content-Type": "application/json",
                    },
                    withCredentials: true,
                  } )
                  console.log(res);
                  
                  setResult(res.data)

                  if(res) {
                      setResult(JSON.parse(res))
                    }
                } catch (error) {
                console.log(error)
            } finally {
                setIsLoading(false)
            }

        }   
        fetchResult()
        console.log(result)
    }, [global, type]);

    const renderLink = (type, id) => {
        switch (type) {
            case 'company':
                return `/admin/companies/${id}`
            case 'job':
                return `/description/${id}`

            default:
                return '/';
        }

    };



    return (
        <div className="absolute top-full z-10 mt-3 w-full rounded-xl bg-light-800 py-5 shadow-sm dark:bg-dark-400 min-h-[50px]">
            <GlobalFilters />
            <div className="my-5 h-[1px] bg-light-700/50 dark:bg-dark-500/50"></div>
            <div className="space-y-5">
                <p className="text-dark400_light900 paragraph-semibold px-5">
                    Top Matches
                </p>
                {isLoading ? (
                    <div className="flex-center flex-col p-5">
                        <ReloadIcon className="my-2 h-10 w-10 text-primary-500 animate-spin" />
                        <p className="text-dark200_light800 body-regular">
                            Browsing the database
                        </p>
                    </div>
                ) : (
                    <div className="flex flex-col gap-2">
                        {result.length > 0 ? (
                            result.map((item, index) => (
                                <Link
                                    to={renderLink(item.type, item.id)}
                                    key={item.type + item.id + index}
                                    className="flex w-full cursor-pointer items-start gap-3 px-5 py-2.5 hover:bg-light-500/2    0 hover:first-letter:dark:bg-dark-500/50"
                                >
                                    <img
                                        alt="tag"
                                        width={18}
                                        height={18}
                                        src="/assets/icons/tag.svg"
                                        className="invert-colors mt-1 object-contain"
                                    />
                                    <div className="flex flex-col">
                                        <p className="body-medium text-dark200_light800 line-clamp-1">
                                            {item.title}
                                        </p>
                                        <p className="small-medium mt-1 text-dark400_light500 font-bold capitalize">
                                            {item.type}
                                        </p>
                                    </div>
                                </Link>
                            ))
                        ) : (
                            <div className="flex-center flex-col px-5">
                                <p className="text-dark200_light800 body-regular px-5 py-2.5">
                                    Oops no result found
                                </p>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default GlobalResult;

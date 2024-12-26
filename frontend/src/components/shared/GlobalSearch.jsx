import { Input } from "../ui/input";
import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { formUrlQuery, removeKeysFromQuery } from "@/lib/utils";
import GlobalResult from "./GlobalResult";

const GlobalSearch = () => {

    const navigate = useNavigate();
    const location = useLocation();
    const searchParams = useMemo(() => new URLSearchParams(location.search), [location.search]);
    const searchContainerRef = useRef(null);
    const query = searchParams.get("q");

    useEffect(() => {
        const handleClickOutside = (event) => {
            // @ts-ignore
            if (searchContainerRef.current && !searchContainerRef.current.contains(event.target)) {
                setopen(false);
                setSearch('');
            }
        };
        setopen(false);
        document.addEventListener("click", handleClickOutside);

        return () => {
            document.removeEventListener("click", handleClickOutside);
        };

    }, [location.pathname]);


    const [search, setSearch] = useState(query || "");
    const [open, setopen] = useState(false);

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            if (search) {
                const newUrl = formUrlQuery({
                    params: searchParams.toString(),
                    key: "global",
                    value: search,
                });
                navigate(newUrl, { replace: true });
            } else {
                if (query) {
                    const newUrl = removeKeysFromQuery({
                        params: searchParams.toString(),
                        keysToRemove: ["global", "type"],
                    });
                    navigate(newUrl, { replace: true });
                }
            }
        }, 300);

        return () => clearTimeout(delayDebounceFn);
    }, [search, location.pathname, navigate, searchParams, query]);

    return (
        <div ref={searchContainerRef} className="flex items-center w-full">

            <img
                src="/assets/icons/search.svg"
                width={24}
                height={24}
                alt="search"
                className="cursor-pointer"
            />
            <Input
                type="text"
                placeholder="Search anything globally..."
                value={search}
                className="w-full no-focus paragraph-regular placeholder text-dark400_light700 border-none shadow-none outline-none bg-transparent"
                onChange={(e) => {
                    setSearch(e.target.value);
                    if (!open) {
                        setopen(true);
                    }
                    if (e.target.value === "") {
                        setopen(false);
                    }
                }}
            />

            {open && <GlobalResult />}
        </div>
    );
};

export default GlobalSearch;

import PropTypes from "prop-types";

import parse from "html-react-parser";
import { useEffect } from "react";

const ParseHTML = ({ data }) => {

    useEffect(() => {
        console.log(data)
    }, [data])

    return <div className={"markdown w-full min-w-full prose"}>{data &&  parse(data)}</div>;
};
ParseHTML.propTypes = {
    data: PropTypes.string.isRequired,
};

export default ParseHTML;

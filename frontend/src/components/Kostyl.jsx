import React from "react";
import { Navigate, useSearchParams } from "react-router-dom";

const Costyl = () => {
    const [params, _] = useSearchParams();
    return <Navigate to={`/post/${params.get("id")}`}/>
};

export default Costyl;
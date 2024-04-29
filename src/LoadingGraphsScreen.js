import React from 'react';
import ClipLoader from "react-spinners/ClipLoader";
// import { BookLoader } from "react-awesome-loaders";

function LoadingGraphsScreen() {

    return (
        <div className="loadinggraphs">
            <ClipLoader size={50}/>
        </div>
    )
}

export default LoadingGraphsScreen;
import React from "react";

const Loading = () => {
    return (
        <i
            className='fa-solid fa-circle-notch'
            style={{ animation: "spin 1.5s linear infinite", color: "white", padding: "0" }}
        />
    );
};

export default Loading;

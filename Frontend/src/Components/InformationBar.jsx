import React, { useEffect, useState } from "react";

const dummyText = "We are going under maintenance on Sunday for approximately 3 hours";

const InformationBar = () => {
    // * we should get the show condition and text from api.
    // when the api endpoint is ready
    const [info, setInfo] = useState("");
    const [show, setShow] = useState(false);

    useEffect(() => {
        // TODO api call
        setShow(true);
        setInfo(dummyText);
    }, []);

    return show ? <div className="text-center p-[8px] bg-[#7675FF] text-white">{info}</div> : <></>;
};

export default InformationBar;

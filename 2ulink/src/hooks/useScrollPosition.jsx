import {useEffect, useState} from "react";

const useScrollPosition = () => {
    const [position, setPosition] = useState(0);

    const handleScroll = () => setPosition(window.scrollY);

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return {position, setPosition};
};

export default useScrollPosition;

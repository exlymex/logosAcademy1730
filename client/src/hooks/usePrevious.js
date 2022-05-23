import {useEffect, useRef} from "react";

export const usePrevious = (value) => {

    const valueRef = useRef(null);

    useEffect(() => {
        update(value);
    }, [])

    const update = (newValue) => {
        valueRef.current = newValue
    }

    return {value: valueRef.current, update};
}
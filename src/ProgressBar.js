import { Progress } from "@chakra-ui/react";
import { useEffect } from "react";

function ProgressBar({ value }) {
    useEffect(() => {

    }, [value]);
    return (
        <Progress colorScheme="green" marginTop={2} value={value} hasStripe isAnimated borderRadius={10} />
    );
}

export default ProgressBar;
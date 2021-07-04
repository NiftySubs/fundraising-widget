import { extendTheme, withDefaultColorScheme } from "@chakra-ui/react";

const theme = extendTheme({ 
    fonts: {
        heading: "Inter",
        body: "Inter"
    },
    components: {
        Text: {
            baseStyle: {
                fontWeight: "semibold",
                fontFamily: "Inter",
                color: "white"
            }
        },
        Tag: {
            baseStyle: {
                background: "rgba(230,1,122,0.08)",
                color: "#E6017A"
            }
        },
        Button: {
            baseStyle: {
                fontFamily: "Inter"
            }
        },
        Heading: {
            baseStyle: {
                fontFamily: "Inter",
                color: "white"
            }
        }
    }
});

export default theme;
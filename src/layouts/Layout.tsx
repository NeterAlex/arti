import {Navbar} from "@/components/Navbar";
import {Box} from "@chakra-ui/react";


export default function Layout({children}: any) {
    return (
        <>
            <Navbar></Navbar>
            <Box>
                {children}
            </Box>
        </>
    )
}
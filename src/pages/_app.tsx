import '@/styles/globals.css'
import type {AppProps} from 'next/app'
import {ChakraProvider} from '@chakra-ui/react'
import Layout from "@/layouts/Layout";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import axios from 'axios';

export const queryClient = new QueryClient()
axios.interceptors.request.use(config => {
    if (window.localStorage.getItem("userToken")) {
        config.headers.Authorization = window.localStorage.getItem("userToken")
        //console.log(config)
    }
    return config
})
export default function App({Component, pageProps}: AppProps) {
    return (
        <QueryClientProvider client={queryClient}>
            <ChakraProvider>
                <Layout>
                    <Component {...pageProps} />
                </Layout>
            </ChakraProvider>
        </QueryClientProvider>
    )
}

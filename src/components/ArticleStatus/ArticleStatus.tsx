import {Box, SimpleGrid} from '@chakra-ui/react'
import {Stat} from './Stat'
import axios from "axios";
import {useQuery} from "@tanstack/react-query";


export function ArticleStatus() {
    async function getArticleCounts() {
        const query = await axios.get('http://localhost:8080/api/articles', {
            params: {
                capacity: 200
            }
        })
        const result = JSON.parse(JSON.stringify(query.data.data))
        //console.log(result)
        return result
    }

    const {isLoading, error, data} = useQuery({
        queryKey: ["getArticleCounts"],
        queryFn: () => getArticleCounts(),
    })

    if (isLoading) return <></>
    if (error) return <></>

    const stats = [
        {label: '文章', value: data.total},
    ]

    return (
        <Box as="section">
            <SimpleGrid columns={{base: 1, md: 3}} gap={{base: '2', md: '2'}}>
                {stats.map(({label, value}) => (
                    <Stat key={label} label={label} value={value}/>
                ))}
            </SimpleGrid>
        </Box>
    )
}
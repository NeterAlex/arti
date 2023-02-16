import {
    Box,
    Button,
    Container,
    Flex,
    Input,
    InputGroup,
    InputLeftAddon,
    InputRightElement,
    List
} from "@chakra-ui/react";
import ArticleListItem from "@/components/ArticleList/ArticleListItem";
import React, {useState} from "react";
import {useQuery} from '@tanstack/react-query';
import axios from "axios";

interface displayItem {
    id: number,
    title: string,
    author: string,
    time: string
}

async function getAllArticles() {
    let result: displayItem[] = []
    const queryResult = await axios.get('http://localhost:8080/api/articles', {
        params: {
            capacity: 20
        }
    })
    const resJson = JSON.parse(JSON.stringify(queryResult.data))
    for (let article of resJson.data.lists) {
        let newDisplayData = {
            id: article.ID,
            title: article.title,
            author: article.author,
            time: article.publish_time
        }
        result.push(newDisplayData)
    }
    //console.log(result)
    return result
}

export default function ArticleList() {
    const [isSearchByTitle, setType] = useState(false)
    const [search, setSearch] = useState("")
    //const [useSearch,setUseSearch] = useState(false)
    const useSearch = !(search === '')
    const handleClick = () => setType(!isSearchByTitle)
    const getArticlesQuery = useQuery(['getArticles'], getAllArticles)


    return (
        <Box maxW="7xl" mx="auto" my={{base: '6', md: '12'}} px={{base: '0', lg: '12'}}>
            <>
                <Container>
                    <Flex justify={"space-between"}>
                        <InputGroup mb={'10'}>
                            <InputLeftAddon>搜索</InputLeftAddon>
                            <Input type='search' value={search} onChange={(e) => {
                                setSearch(e.target.value)
                            }} placeholder='请输入内容'/>
                            <InputRightElement mr={'10px'} width='4.5rem'>
                                <Button h='1.75rem' size='sm' onClick={handleClick}>
                                    {isSearchByTitle ? '标题' : '作者'}
                                </Button>
                            </InputRightElement>
                        </InputGroup>
                    </Flex>
                </Container>
                {getArticlesQuery.isInitialLoading && <Container>Loading...</Container>}
                {getArticlesQuery.error && <div>Something error</div>}
                <List spacing='20px'>
                    {
                        useSearch ? (
                            isSearchByTitle ? (
                                getArticlesQuery.data?.filter(item => item.title.includes(search)).map((item, index) => (
                                    <ArticleListItem key={index} time={item.time} title={item.title}
                                                     author={item.author} id={item.id}/>
                                ))
                            ) : (
                                getArticlesQuery.data?.filter(item => item.author.includes(search)).map((item, index) => (
                                    <ArticleListItem key={index} time={item.time} title={item.title}
                                                     author={item.author} id={item.id}/>
                                ))
                            )
                        ) : (
                            getArticlesQuery.data?.map((item, index) => (
                                <ArticleListItem key={index} time={item.time} title={item.title} author={item.author}
                                                 id={item.id}/>
                            ))
                        )
                    }
                </List>
            </>
        </Box>
    )
}
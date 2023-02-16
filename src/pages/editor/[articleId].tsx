import 'md-editor-rt/lib/style.css';
import React, {useEffect, useRef, useState} from "react";
import {
    Badge,
    Button,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    Center,
    Container,
    Divider,
    FormControl,
    FormLabel,
    Heading,
    HStack,
    Input,
    Spacer,
    Stack,
    useBreakpointValue,
    useColorMode,
    useToast,
    VStack
} from "@chakra-ui/react";
import {useRouter} from "next/router";
import axios from "axios";
import {useMutation, useQuery} from "@tanstack/react-query";
import MdEditor, {ExposeParam} from "md-editor-rt";


interface Props {
    source: string
}

async function getArticle(id: string) {
    const queryResult = await axios.get(`http://localhost:8080/api/articles/${id}`, {
        params: {}
    })
    return JSON.parse(JSON.stringify(queryResult.data.data))
}

export default function Editor(props: Props) {
    //storeToken("admin", "adminp")

    const router = useRouter()
    const {articleId} = router.query
    const qs = require('qs');

    const {status, data, error} = useQuery({
        queryKey: ['getArticle', articleId],
        queryFn: () => getArticle(typeof articleId === "string" ? articleId : ""),
    })

    const toast = useToast()
    const [title, setTitle] = useState("")
    const [author, setAuthor] = useState("")
    const [category, setCategory] = useState("")
    const [ptime, setPtime] = useState("2022-12-12")
    const [content, setContent] = useState("")

    const {colorMode, toggleColorMode} = useColorMode()

    const mutation = useMutation({
        mutationFn({author, category, ptime, title, content}: any) {
            //console.log({author, category, publish_time, title})
            axios.interceptors.request.use(config => {
                if (window.localStorage.getItem("userToken")) {
                    config.headers.Authorization = window.localStorage.getItem("userToken")
                    //console.log(config)
                }
                return config
            })
            return axios.put(`http://localhost:8080/api/articles/${articleId}`, qs.stringify({
                author: author,
                category: category,
                ptime: ptime,
                title: title,
                content: content
            })).catch((e) => {
                console.log(e)
                return toast({
                    title: '登录失效',
                    description: "请你重新登陆。",
                    status: 'error',
                    duration: 5000,
                    isClosable: true,
                })
            }).then(() => {
                router.reload()
            })
        },
    })

    const editorRef = useRef<ExposeParam>();
    useEffect(() => {
        editorRef.current?.togglePreview(true);
    }, [])

    const isDesktop = useBreakpointValue({base: false, lg: true})
    useEffect(() => {
        if (status === 'success') {
            setTitle(data.title)
            setPtime(data.publish_time)
            setAuthor(data.author)
            setCategory(data.category)
            setContent(data.content)
        }
    }, [status, data])
    if (status === 'loading') return 'loading...'
    if (status === 'error') return 'An error occurred'

    return (
        <Container maxW='90vw'>
            <Card m={10}>
                <CardHeader>
                    <VStack gap={3}>
                        <Heading size='md'>{data.title}</Heading>
                        <Stack direction='row'>
                            <Badge>{data.ID}</Badge>
                            <Badge colorScheme='green'>{data.author}</Badge>
                            <Badge colorScheme='purple'>{data.category}</Badge>
                            <Badge colorScheme='red'>{data.publish_time}</Badge>
                        </Stack>
                    </VStack>
                </CardHeader>
                <Divider colorScheme={"blue"} color={"gray.200"}/>
                <CardBody>
                    {
                        colorMode === 'light' ? (
                            <MdEditor modelValue={content} theme={"light"} toolbarsExclude={['github']}
                                      onChange={setContent} previewOnly={false}/>
                        ) : (
                            <MdEditor modelValue={content} theme={"dark"} toolbarsExclude={['github']}
                                      onChange={setContent} previewOnly={false}/>
                        )
                    }

                </CardBody>
                <Divider colorScheme={"blue"} color={"gray.200"}/>
                {isDesktop ? (
                    <CardFooter justify='space-between' flexWrap='nowrap'>
                        <HStack gap={5}>
                            <FormControl>
                                <FormLabel>标题</FormLabel>
                                <Input type='text' value={title} onChange={e => setTitle(e.target.value)}/>
                            </FormControl>
                            <FormControl>
                                <FormLabel>作者</FormLabel>
                                <Input type='text' value={author} onChange={e => setAuthor(e.target.value)}/>
                            </FormControl>
                            <FormControl>
                                <FormLabel>分类</FormLabel>
                                <Input type='text' value={category} onChange={e => setCategory(e.target.value)}/>
                            </FormControl>
                            <FormControl>
                                <FormLabel>时间</FormLabel>
                                <Input type='date' value={ptime} onChange={e => setPtime(e.target.value)}/>
                            </FormControl>
                        </HStack>
                        <Spacer/>
                        <Center>
                            <Button onClick={() => {
                                mutation.mutate({
                                    author: author,
                                    category: category,
                                    ptime: ptime,
                                    title: title,
                                    content: content
                                })
                                if (localStorage.getItem("userToken")) {
                                    return toast({
                                        title: '你的文章已保存',
                                        description: "刷新页面来查看文章。",
                                        status: 'success',
                                        duration: 5000,
                                        isClosable: true,
                                    })
                                }
                            }}>保存</Button>
                        </Center>
                    </CardFooter>
                ) : (
                    <CardFooter justify='space-between' flexWrap='wrap' flexDirection={"column"}>
                        <VStack gap={5}>
                            <FormControl>
                                <FormLabel>标题</FormLabel>
                                <Input type='text' value={title} onChange={e => setTitle(e.target.value)}/>
                            </FormControl>
                            <FormControl>
                                <FormLabel>作者</FormLabel>
                                <Input type='text' value={author} onChange={e => setAuthor(e.target.value)}/>
                            </FormControl>
                            <FormControl>
                                <FormLabel>分类</FormLabel>
                                <Input type='text' value={category} onChange={e => setCategory(e.target.value)}/>
                            </FormControl>
                            <FormControl>
                                <FormLabel>时间</FormLabel>
                                <Input type='date' value={ptime} onChange={e => setPtime(e.target.value)}/>
                            </FormControl>
                        </VStack>
                        <Spacer/>
                        <Center>
                            <Button mt={10} onClick={() => {
                                mutation.mutate({
                                    author: author,
                                    category: category,
                                    ptime: ptime,
                                    title: title,
                                    content: content
                                })
                                if (localStorage.getItem("userToken")) {
                                    return toast({
                                        title: '你的文章已保存',
                                        description: "刷新页面来查看文章。",
                                        status: 'success',
                                        duration: 5000,
                                        isClosable: true,
                                    })
                                }
                            }}>保存</Button>
                        </Center>
                    </CardFooter>
                )
                }

            </Card>
        </Container>
    )
}

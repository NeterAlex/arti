import {
    Button,
    ButtonGroup,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    Container,
    Divider,
    FormControl,
    FormErrorMessage,
    FormHelperText,
    FormLabel,
    Heading,
    Input,
    Textarea,
    useToast,
    VStack
} from "@chakra-ui/react";
import {useEffect, useState} from "react";
import {useMutation} from "@tanstack/react-query";
import axios from "axios";
import {useRouter} from "next/router";

export default function ArticleAdd() {

    const router = useRouter()
    const qs = require('qs');
    const toast = useToast()
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState(' ')
    const [ptime, setPtime] = useState('2023-01-01')
    const [category, setCategory] = useState(' ')
    const [content, setContent] = useState(' ')
    const isTitleError = title === ''
    const isAuthorError = author === ''
    const isPtimeError = ptime === ''
    const isCategoryError = category === ''
    const isContentError = content === ''

    const [isLogin, setLoginState] = useState(false)
    useEffect(() => {
        setLoginState(!!localStorage.getItem("userToken"))
    }, [])

    const mutation = useMutation({
        mutationFn({author, category, ptime, title, content}: any) {
            //console.log({author, category, publish_time, title})
            axios.interceptors.request.use(config => {
                if (window.localStorage.getItem("userToken")) {
                    config.headers.Authorization = window.localStorage.getItem("userToken")
                }
                return config
            })
            return axios.post(`http://localhost:8080/api/articles/create`, qs.stringify({
                author: author,
                category: category,
                ptime: ptime,
                title: title,
                content: content,
                preview: "",
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
                router.push('/articleList')
            })
        },
    })

    return (
        <Container mt={10}>
            {isLogin ? (
                <Card>
                    <CardHeader>
                        <Heading size='md' textAlign={"center"} color={"blue.500"}>新建文章</Heading>
                    </CardHeader>
                    <Divider color={"gray.200"}></Divider>
                    <CardBody>
                        <VStack>
                            <FormControl isRequired isInvalid={isTitleError}>
                                <FormLabel>标题</FormLabel>
                                <Input type='text' value={title} placeholder={"title"}
                                       onChange={(e) => setTitle(e.target.value)}/>
                                {!isTitleError ? (
                                    <FormHelperText></FormHelperText>
                                ) : (
                                    <FormErrorMessage>标题不可为空</FormErrorMessage>
                                )}
                            </FormControl>
                            <FormControl isRequired isInvalid={isAuthorError}>
                                <FormLabel>作者</FormLabel>
                                <Input type='text' value={author} placeholder={"author"}
                                       onChange={(e) => setAuthor(e.target.value)}/>
                                {!isAuthorError ? (
                                    <FormHelperText></FormHelperText>
                                ) : (
                                    <FormErrorMessage>作者不可为空</FormErrorMessage>
                                )}
                            </FormControl>
                            <FormControl isRequired isInvalid={isCategoryError}>
                                <FormLabel>分类</FormLabel>
                                <Input type='text' value={category} placeholder={"category"}
                                       onChange={(e) => setCategory(e.target.value)}/>
                                {!isCategoryError ? (
                                    <FormHelperText></FormHelperText>
                                ) : (
                                    <FormErrorMessage>分类不可为空</FormErrorMessage>
                                )}
                            </FormControl>
                            <FormControl isRequired isInvalid={isPtimeError}>
                                <FormLabel>发布日期</FormLabel>
                                <Input type='date' value={ptime} placeholder={"publish date"}
                                       onChange={(e) => setPtime(e.target.value)}/>
                                {!isPtimeError ? (
                                    <FormHelperText></FormHelperText>
                                ) : (
                                    <FormErrorMessage>日期不可为空</FormErrorMessage>
                                )}
                            </FormControl>
                            <FormControl isRequired isInvalid={isContentError}>
                                <FormLabel>内容</FormLabel>
                                <Textarea value={content} placeholder={"content"}
                                          onChange={(e) => setContent(e.target.value)}/>
                                {!isContentError ? (
                                    <FormHelperText>支持 Markdown </FormHelperText>
                                ) : (
                                    <FormErrorMessage>内容不可为空</FormErrorMessage>
                                )}
                            </FormControl>
                        </VStack>
                    </CardBody>
                    <Divider color={"gray.200"}></Divider>
                    <CardFooter justify={"flex-end"}>
                        <ButtonGroup spacing='2'>
                            <Button variant='ghost' colorScheme='red' onClick={() => {
                                setPtime("2023-01-01")
                                setTitle("")
                                setAuthor("")
                                setContent("")
                                setCategory("")
                            }}>
                                重置
                            </Button>
                            <Button variant='solid' colorScheme='blue' onClick={() => {
                                if (window.localStorage.getItem("userToken")) {
                                    mutation.mutate({
                                        author: author,
                                        category: category,
                                        ptime: ptime,
                                        title: title,
                                        content: content
                                    })
                                    return toast({
                                        title: '你的文章已保存',
                                        description: "将为你转到文章列表。",
                                        status: 'success',
                                        duration: 5000,
                                        isClosable: true,
                                    })
                                }
                            }}>
                                提交
                            </Button>
                        </ButtonGroup>
                    </CardFooter>
                </Card>
            ) : (
                <Card align='center' my={{base: '12', md: '24'}}>
                    <CardHeader>
                        <Heading size='md'>您尚未登录</Heading>
                    </CardHeader>
                    <CardBody>
                        请登录以添加文章
                    </CardBody>
                    <Divider color={"gray.200"}/>
                    <CardFooter gap={3}>
                        <Button colorScheme='blue' onClick={() => {
                            router.push("/login")
                        }
                        }>登录</Button>
                    </CardFooter>
                </Card>
            )
            }


        </Container>
    )
}
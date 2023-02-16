import {
    Box,
    Button,
    Card,
    CardFooter,
    CardHeader,
    Container,
    Divider,
    FormControl,
    FormErrorMessage,
    FormLabel,
    Heading,
    HStack,
    IconButton,
    Input,
    InputGroup,
    InputRightElement,
    Stack,
    Text,
    useToast,
} from '@chakra-ui/react'
import {OAuthButtonGroup} from '@/components/Auth/OAuthButtonGroup'
import {useRouter} from "next/router";
import {PreviewCloseOne, PreviewOpen} from "@icon-park/react";
import {useEffect, useState} from 'react';
import {useMutation} from "@tanstack/react-query";
import axios from "axios";

export default function Login() {
    const router = useRouter()

    const [isLogin, setLoginState] = useState(false)
    useEffect(() => {
        setLoginState(!!localStorage.getItem("userToken"))
    }, [])

    const [show1, setShow1] = useState(false)

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const [eUsername, setEUsername] = useState("用户名不应为空")
    const [ePassword, setEPassword] = useState("用户名与密码不匹配")

    const [error1, setError1] = useState(false)
    const [error3, setError3] = useState(false)

    const qs = require('qs')
    const toast = useToast()
    const mutation = useMutation({
        mutationFn({username, password}: any) {
            return axios.post(`http://localhost:8080/api/auth/login`, qs.stringify({
                username: username,
                password: password,
            })).catch((e) => {
                console.log(e);
                if (e) {
                    setError3(true)
                } else {
                    setError3(false)
                }
                return toast({
                    title: '登录失败',
                    description: "请重试",
                    status: 'error',
                    duration: 5000,
                    isClosable: true,
                })
            }).finally(() => {
            })
        },
    })

    function validate() {
        if (username === '' || username.length > 15) {
            setError1(true)
        } else {
            setError1(false)
        }
    }

    return (
        <Container maxW="lg" my={{base: '12', md: '24'}} py={{base: '12', md: '24'}} px={{base: '0', sm: '8'}}>
            {
                isLogin ? (
                    <Card align='center'>
                        <CardHeader>
                            <Heading size='md'>您已登录</Heading>
                        </CardHeader>
                        <Divider color={"gray.200"}/>
                        <CardFooter gap={3}>
                            <Button colorScheme='blue' onClick={() => {
                                router.push("/articleList")
                            }
                            }>管理文章</Button>
                            <Button colorScheme='red' onClick={() => {
                                localStorage.removeItem("userToken")
                                localStorage.removeItem("username")
                                router.reload()
                            }
                            }>退出登录</Button>
                        </CardFooter>
                    </Card>
                ) : (
                    <Stack spacing="8">
                        <Box
                            py={{base: '0', sm: '8'}}
                            px={{base: '4', sm: '10'}}
                            bg={{base: 'transparent', sm: 'bg-surface'}}
                            boxShadow={{base: 'none', sm: 'md'}}
                            borderRadius={{base: 'none', sm: 'xl'}}
                        >
                            <Stack spacing="6">
                                <Stack spacing="5">
                                    <FormControl isInvalid={error1}>
                                        <FormLabel>用户名</FormLabel>
                                        <Input type="text" value={username}
                                               onChange={(e) => setUsername(e.target.value)}/>
                                        <FormErrorMessage>{eUsername}</FormErrorMessage>
                                    </FormControl>
                                    <FormControl isInvalid={error3}>
                                        <FormLabel>密码</FormLabel>
                                        <InputGroup size='md'>
                                            <Input
                                                pr='4.5rem'
                                                type={show1 ? 'text' : 'password'}
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                            />
                                            <InputRightElement width='4.5rem'>
                                                <IconButton
                                                    variant="link"
                                                    aria-label={show1 ? 'Mask password' : 'Reveal password'}
                                                    icon={show1 ?
                                                        <PreviewCloseOne theme="outline" size="24" fill="#a3aebe"/> :
                                                        <PreviewOpen theme="outline" size="24" fill="#a3aebe"/>}
                                                    onClick={() => setShow1(!show1)}
                                                />
                                            </InputRightElement>
                                        </InputGroup>
                                        <FormErrorMessage>{ePassword}</FormErrorMessage>
                                    </FormControl>
                                </Stack>
                                <Stack spacing="6">
                                    <Button colorScheme='blue' onClick={() => {
                                        validate()
                                        const isValid = !(username === '' || username.length > 15)
                                            && !(password === '' || password.length < 6 || password.length > 18)
                                        if (isValid) {
                                            mutation.mutate({
                                                username: username,
                                                password: password,
                                            }, {
                                                onSuccess(data) {
                                                    const result = JSON.parse(JSON.stringify(data))
                                                    //console.log(result.data.data.token)
                                                    if (result.data.code == "20004") {
                                                        setError3(true)
                                                        return toast({
                                                            title: '登录错误',
                                                            description: "请重试",
                                                            status: 'error',
                                                            duration: 5000,
                                                            isClosable: true,
                                                        })
                                                    } else {
                                                        setError3(false)
                                                        localStorage.setItem("userToken", result.data.data.token)
                                                        localStorage.setItem("username", username)
                                                        router.reload()
                                                        return toast({
                                                            title: '登录成功',
                                                            description: "",
                                                            status: 'success',
                                                            duration: 5000,
                                                            isClosable: true,
                                                        })
                                                    }
                                                },
                                                onError(err) {
                                                    return toast({
                                                        title: '登录错误',
                                                        description: "请重试",
                                                        status: 'error',
                                                        duration: 5000,
                                                        isClosable: true,
                                                    })
                                                }
                                            })
                                        }

                                    }}>登录</Button>
                                    <HStack spacing="1" justify="center">
                                        <Text color="muted">没有账号？</Text>
                                        <Button variant="link" colorScheme="blue"
                                                onClick={() => router.push('/signup')}>
                                            注册
                                        </Button>
                                    </HStack>
                                    <HStack>
                                        <Divider/>
                                    </HStack>
                                    <OAuthButtonGroup/>
                                </Stack>
                            </Stack>
                        </Box>
                    </Stack>
                )
            }

        </Container>
    )
}
import {
    Box,
    Button,
    Container,
    Divider,
    FormControl,
    FormErrorMessage,
    FormLabel,
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
import {useState} from 'react';
import {useMutation} from "@tanstack/react-query";
import axios from "axios";

export default function Signup() {
    const router = useRouter()

    const [show1, setShow1] = useState(false)
    const [show2, setShow2] = useState(false)

    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirm, setConfirm] = useState("")

    const [eUsername, setEUsername] = useState("用户名不应为空，且应少于15位")
    const [eEmail, setEEmail] = useState("邮箱地址不合法")
    const [ePassword, setEPassword] = useState("密码不可为空，且应多于6位，少于18位")
    const [eConfirm, setEConfirm] = useState("两次密码输入不一致")

    const [error1, setError1] = useState(false)
    const [error2, setError2] = useState(false)
    const [error3, setError3] = useState(false)
    const [error4, setError4] = useState(false)

    const qs = require('qs')
    const toast = useToast()
    const mutation = useMutation({
        mutationFn({username, password, email}: any) {
            return axios.post(`http://localhost:8080/api/auth/register`, qs.stringify({
                username: username,
                password: password,
                email: email,
            })).catch((e) => {
                console.log(e)
                return toast({
                    title: '注册失败',
                    description: "请重试",
                    status: 'error',
                    duration: 5000,
                    isClosable: true,
                })
            }).then(() => {
                router.push('/login')
            })
        },
    })

    function validate() {
        if (username === '' || username.length > 15) {
            setError1(true)
        } else {
            setError1(false)
        }

        if (email === '' || !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
            setError2(true)
        } else {
            setError2(false)
        }

        if (password === '' || password.length < 6 || password.length > 18) {
            setError3(true)
        } else {
            setError3(false)
        }

        if (confirm === '' || password !== confirm) {
            setError4(true)
        } else {
            setError4(false)
        }
    }

    return (
        <Container maxW="lg" my={{base: '3', md: '3'}} py={{base: '12', md: '24'}} px={{base: '0', sm: '8'}}>
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
                                <Input type="text" value={username} onChange={(e) => setUsername(e.target.value)}/>
                                <FormErrorMessage>{eUsername}</FormErrorMessage>
                            </FormControl>
                            <FormControl isInvalid={error2}>
                                <FormLabel>邮箱</FormLabel>
                                <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                                <FormErrorMessage>{eEmail}</FormErrorMessage>
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
                                            icon={show1 ? <PreviewCloseOne theme="outline" size="24" fill="#a3aebe"/> :
                                                <PreviewOpen theme="outline" size="24" fill="#a3aebe"/>}
                                            onClick={() => setShow1(!show1)}
                                        />
                                    </InputRightElement>
                                </InputGroup>
                                <FormErrorMessage>{ePassword}</FormErrorMessage>
                            </FormControl>
                            <FormControl isInvalid={error4}>
                                <FormLabel>确认密码</FormLabel>
                                <InputGroup size='md'>
                                    <Input
                                        pr='4.5rem'
                                        type={show2 ? 'text' : 'password'}
                                        value={confirm}
                                        onChange={(e) => setConfirm(e.target.value)}
                                    />
                                    <InputRightElement width='4.5rem'>
                                        <IconButton
                                            variant="link"
                                            aria-label={show2 ? 'Mask password' : 'Reveal password'}
                                            icon={show2 ? <PreviewCloseOne theme="outline" size="24" fill="#a3aebe"/> :
                                                <PreviewOpen theme="outline" size="24" fill="#a3aebe"/>}
                                            onClick={() => setShow2(!show2)}
                                        />
                                    </InputRightElement>
                                </InputGroup>
                                <FormErrorMessage>{eConfirm}</FormErrorMessage>
                            </FormControl>
                        </Stack>
                        <Stack spacing="6">
                            <Button colorScheme='blue' onClick={() => {
                                validate()
                                const isValid = !(username === '' || username.length > 15)
                                    && !(email === '' || !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email))
                                    && !(password === '' || password.length < 6 || password.length > 18)
                                    && !(confirm === '' || password !== confirm)
                                if (isValid) {
                                    mutation.mutate({
                                        username: username,
                                        password: password,
                                        email: email
                                    })
                                    return toast({
                                        title: '注册成功',
                                        description: "将为您跳转到登录页面",
                                        status: 'success',
                                        duration: 5000,
                                        isClosable: true,
                                    })
                                }

                            }}>注册</Button>
                            <HStack spacing="1" justify="center">
                                <Text color="muted">已有账号？</Text>
                                <Button variant="link" colorScheme="blue" onClick={() => router.push('/login')}>
                                    登录
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
        </Container>
    )
}
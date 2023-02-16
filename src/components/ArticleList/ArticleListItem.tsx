import {
    Box,
    Button,
    Flex,
    Heading,
    Link,
    LinkBox,
    LinkOverlay,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Text,
    useBreakpointValue,
    useDisclosure,
    useToast,
    VStack
} from '@chakra-ui/react'
import NextLink from 'next/link'
import React from "react";
import axios from "axios";
import {useRouter} from 'next/router';

interface Props {
    id: number
    time: string
    title: string
    author: string
}

export default function ArticleListItem(props: Props) {
    const {id, time, title, author} = props
    const isDesktop = useBreakpointValue({base: false, lg: true})
    const isLogin = localStorage.getItem("userToken")
    const {isOpen, onOpen, onClose} = useDisclosure()
    const toast = useToast()
    const router = useRouter()

    async function deleteArticle(id: number) {
        if (isLogin) {
            axios.interceptors.request.use(config => {
                config.headers.Authorization = window.localStorage.getItem("userToken")
                return config
            })
            await axios.delete(`http://localhost:8080/api/articles/${id}`)
                .catch((e) => {
                    console.log(e)
                    return toast({
                        title: '登录失效',
                        description: "请你重新登陆。",
                        status: 'error',
                        duration: 5000,
                        isClosable: true,
                    })
                }).then(() => {
                    onClose()
                    router.reload()
                })
        } else {
            return toast({
                title: '登录失效',
                description: "请你重新登陆。",
                status: 'error',
                duration: 5000,
                isClosable: true,
            })
        }
    }

    return (
        <>
            <Modal onClose={onClose} isOpen={isOpen} isCentered>
                <ModalOverlay/>
                <ModalContent>
                    <ModalHeader>确认删除</ModalHeader>
                    <ModalCloseButton/>
                    <ModalBody>
                        你确认要删除《{title}》这篇文章吗？删除后不可恢复。
                    </ModalBody>
                    <ModalFooter gap={3}>
                        <Button onClick={onClose}>取消</Button>
                        <Button onClick={() => {
                            deleteArticle(id)
                        }} color={"white"} bg={"red.500"}>确认</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>

            {isDesktop ? (
                <LinkBox as='article' maxW='auto' p='5' borderWidth='1px' rounded='md'>
                    <Flex minWidth={'max-content'} alignItems={'center'} justify={'space-between'}>
                        <Box onClick={() => {
                            router.push(`/articles/${id}`)
                        }}>
                            <Heading maxW={'1000px'} color={"blue.500"} size='md' my='2'>
                                <LinkOverlay href='#'>
                                    {title}
                                </LinkOverlay>
                            </Heading>
                            <Text maxW={'auto'} fontSize={15} color={"gray.500"} noOfLines={1}
                                  overflowWrap={"break-word"}>
                                {author}
                            </Text>
                            <Text fontSize={12} color={"gray.800"}>
                                {time}
                            </Text>
                        </Box>
                        <VStack>
                            {isLogin ? (
                                <VStack>
                                    <Link as={NextLink} href={`/editor/${id}`}>编辑</Link>
                                    <Button variant='link' onClick={onOpen} color={"red.500"}>删除</Button>
                                </VStack>
                            ) : (
                                <></>
                            )
                            }
                        </VStack>
                    </Flex>
                </LinkBox>
            ) : (
                <LinkBox as='article' margin='5' maxW='auto' p='5' borderWidth='1px' rounded='md' onClick={() => {
                    router.push(`/articles/${id}`)
                }}>
                    <Flex minWidth={'max-content'} alignItems={'center'} justify={'space-between'}>
                        <Box onClick={() => {
                            router.push(`/articles/${id}`)
                        }}>
                            <Heading maxW={'1000px'} color={"blue.500"} size='md' my='2'>
                                <LinkOverlay href='#'>
                                    {title}
                                </LinkOverlay>
                            </Heading>
                            <Text maxW={'auto'} fontSize={15} color={"gray.500"} noOfLines={1}
                                  overflowWrap={"break-word"}>
                                {author}
                            </Text>
                            <Text fontSize={12} color={"gray.800"}>
                                {time}
                            </Text>
                        </Box>
                        <VStack>
                            {isLogin ? (
                                <VStack>
                                    <Link as={NextLink} href={`/editor/${id}`}>编辑</Link>
                                    <Button variant='link' onClick={onOpen} color={"red.500"}>删除</Button>
                                </VStack>
                            ) : (
                                <></>
                            )
                            }
                        </VStack>
                    </Flex>
                </LinkBox>
            )
            }
        </>
    )
}
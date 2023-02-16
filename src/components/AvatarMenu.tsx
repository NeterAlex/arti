import {
    Avatar,
    AvatarBadge,
    Button,
    Center,
    Container,
    Flex,
    Image,
    Menu,
    MenuButton,
    MenuDivider,
    MenuGroup,
    MenuItem,
    MenuList,
    Spacer,
    Switch,
    useColorMode,
    VStack
} from "@chakra-ui/react";
import {useRouter} from "next/router";
import {useEffect, useState} from "react";

interface Avatar {
    image: string
    username: string
}

export const AvatarMenu = () => {

    const [isLogin, setLoginState] = useState(false)
    const [isAdmin, setIsAdmin] = useState(false)
    const [username, setUsername] = useState("")
    useEffect(() => {
        setLoginState(!!localStorage.getItem("userToken"))
        setUsername(localStorage.getItem("username") || "")
    }, [])
    const router = useRouter()
    const {colorMode, toggleColorMode} = useColorMode()

    return (
        <>
            {isLogin ? (
                <Flex justify="center" align="center" gap={{base: '2', md: '2'}}>
                    <Menu autoSelect={false}>
                        <MenuButton as={Button} colorScheme='white'>
                            {
                                username === 'admin' ? (
                                    <Avatar src="/rin.png">
                                        <AvatarBadge boxSize='1em' bg='green.500'/>
                                    </Avatar>
                                ) : (
                                    <Avatar>
                                        <AvatarBadge boxSize='1em' bg='green.500'/>
                                    </Avatar>
                                )
                            }
                        </MenuButton>
                        <MenuList>
                            <MenuItem minH='96px'>
                                <Container>
                                    <VStack>
                                        <Center>
                                            <Image boxSize='4rem' borderRadius='full' src='/rin.png' alt='user'/>
                                        </Center>
                                        <Center>
                                            {username}
                                        </Center>
                                    </VStack>
                                </Container>
                            </MenuItem>
                            <MenuDivider/>
                            <MenuItem>
                                <Flex maxW={"max"} justify='space-between' gap={12}>
                                    <span>夜间模式</span>
                                    <Spacer></Spacer>
                                    <Switch id='toggle-theme' onChange={() => {
                                        toggleColorMode()
                                    }}/>
                                </Flex>
                            </MenuItem>
                            <MenuDivider/>
                            <MenuItem textAlign={"center"} onClick={() => {
                                localStorage.removeItem("userToken")
                                localStorage.removeItem("username")
                                setLoginState(false);
                                router.reload()
                            }}>
                                <Center>
                                    退出登录
                                </Center>
                            </MenuItem>
                        </MenuList>
                    </Menu>
                </Flex>
            ) : (
                <Menu>
                    <MenuButton as={Button} colorScheme='white'>
                        <Avatar>
                            <AvatarBadge boxSize='1em' bg='blue.500'/>
                        </Avatar>
                    </MenuButton>
                    <MenuList>
                        <MenuGroup title='账号'>
                            <MenuItem onClick={() => router.push('/login')}> 登录</MenuItem>
                            <MenuItem onClick={() => router.push('/signup')}> 注册</MenuItem>
                        </MenuGroup>
                    </MenuList>
                </Menu>
            )}
        </>


    )
}
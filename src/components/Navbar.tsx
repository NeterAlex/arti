import {
    Box,
    Button,
    ButtonGroup,
    Container,
    Flex,
    HStack,
    IconButton,
    Link,
    Menu,
    MenuButton,
    MenuGroup,
    MenuItem,
    MenuList,
    useBreakpointValue,
    useColorMode,
} from '@chakra-ui/react'
import {HamburgerButton, Plus} from '@icon-park/react'
import {AvatarMenu} from "@/components/AvatarMenu";
import {useRouter} from 'next/router';

export const Navbar = () => {
    const router = useRouter()
    const isDesktop = useBreakpointValue({base: false, lg: true})
    const {colorMode, toggleColorMode} = useColorMode()

    return (
        <Box as="section">
            <Box as="nav" bg="bg-surface" boxShadow="sm">
                <Container maxW="90%" py={{base: '4', lg: '5'}}>
                    <HStack spacing="10" justify="space-between">
                        {isDesktop ? (
                            <>
                                <Link href={'/'} color={"blue.500"} colorScheme={"blue"}>ARTI</Link>
                                <Flex justify="space-between" flex="1">
                                    <ButtonGroup variant="link" spacing="8">
                                        <Button onClick={() => router.push('/')}>概览</Button>
                                        <Button onClick={() => router.push('/articleList')}>文章</Button>
                                    </ButtonGroup>
                                    <HStack spacing="3">
                                        <ButtonGroup size='sm' isAttached variant='outline'>
                                            <Button onClick={() => {
                                            }}>文章</Button>
                                            <IconButton aria-label='文章'
                                                        icon={<Plus theme="outline" size="18" fill="#333"/>}
                                                        onClick={() => {
                                                            router.push("/articleAdd")
                                                        }}/>
                                        </ButtonGroup>
                                        <AvatarMenu/>
                                    </HStack>
                                </Flex>
                            </>
                        ) : (
                            <>
                                <Flex justify="space-between" flex="1">
                                    <Menu>
                                        {
                                            colorMode === 'light' ? (
                                                <MenuButton as={IconButton} variant="ghost"
                                                            icon={<HamburgerButton theme="outline" size="24"
                                                                                   fill="#333"/>}
                                                            colorScheme='white'>
                                                </MenuButton>
                                            ) : (
                                                <MenuButton as={IconButton} variant="ghost"
                                                            icon={<HamburgerButton theme="outline" size="24"
                                                                                   fill="#FFF"/>}
                                                            colorScheme='white'>
                                                </MenuButton>
                                            )
                                        }
                                        <MenuList>
                                            <MenuGroup title='ARTI'>
                                                <MenuItem onClick={() => {
                                                    router.push("/")
                                                }}> 概览</MenuItem>
                                                <MenuItem onClick={() => {
                                                    router.push("articleList")
                                                }}> 文章</MenuItem>
                                            </MenuGroup>
                                        </MenuList>
                                    </Menu>
                                    <HStack spacing="3">
                                        <ButtonGroup size='sm' isAttached variant='outline'>
                                            <Button>文章</Button>
                                            <IconButton aria-label='新增文章' icon={<Plus/>} onClick={() => {
                                                router.push("/articleAdd")
                                            }}/>
                                        </ButtonGroup>
                                        <AvatarMenu/>
                                    </HStack>
                                </Flex>
                            </>
                        )}
                    </HStack>
                </Container>
            </Box>
        </Box>
    )
}

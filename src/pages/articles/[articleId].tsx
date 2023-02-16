import {
    Badge,
    Card,
    CardBody,
    CardHeader,
    Container,
    Divider,
    Heading,
    HStack,
    IconButton,
    Stack,
    useColorMode,
    VStack
} from "@chakra-ui/react"
import {useRouter} from "next/router";
import axios from "axios";
import {useQuery} from '@tanstack/react-query'
import MdEditor, {ExposeParam} from 'md-editor-rt';
import 'md-editor-rt/lib/style.css';
import {useEffect, useRef, useState} from "react";
import {Editor} from "@icon-park/react";

interface Props {
    id: number
}

async function getArticle(id: string) {
    const queryResult = await axios.get(`http://localhost:8080/api/articles/${id}`, {
        params: {}
    })
    const result = JSON.parse(JSON.stringify(queryResult.data.data))
    //console.log(result)
    return result
}

export default function Article(props: Props) {
    const router = useRouter()
    const {articleId} = router.query

    const {isLoading, error, data} = useQuery({
        queryKey: ['getArticle', articleId],
        queryFn: () => getArticle(typeof articleId === "string" ? articleId : ""),
    })

    const [text, setText] = useState('')
    const {colorMode, toggleColorMode} = useColorMode()

    const editorRef = useRef<ExposeParam>();
    useEffect(() => {
        editorRef.current?.togglePreview(true);
    }, []);

    if (isLoading) return 'loading...'
    if (error) return 'An error occurred'

    return (
        <Container mt={10} maxW='80vw'>
            <Card>
                <CardHeader>
                    <VStack gap={3}>
                        <HStack>
                            <Heading size='md'>{data.title}</Heading>
                            {localStorage.getItem("userToken") ? (
                                <IconButton variant='link' colorScheme={"blue"} onClick={() => {
                                    router.push(`/editor/${articleId}`)
                                }} icon={<Editor theme="outline" size="18" fill="#4880c8" strokeLinejoin="miter"/>}
                                            aria-label={"编辑"}></IconButton>
                            ) : (
                                <></>
                            )}
                        </HStack>
                        <Stack direction='row'>
                            <Badge>{data.ID}</Badge>
                            <Badge colorScheme='green'>{data.author}</Badge>
                            <Badge colorScheme='purple'>{data.category}</Badge>
                            <Badge colorScheme='red'>{data.publish_time}</Badge>
                        </Stack>

                    </VStack>
                </CardHeader>
                <Divider colorScheme={"blue"} color={"gray.200"}/>
                <CardBody>{
                    colorMode === 'light' ? (
                        <MdEditor theme={"light"} modelValue={data.content} onChange={setText} previewOnly={true}/>
                    ) : (
                        <MdEditor theme={"dark"} modelValue={data.content} onChange={setText} previewOnly={true}/>
                    )
                }
                </CardBody>
            </Card>
        </Container>
    )
}
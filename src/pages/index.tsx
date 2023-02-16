import NextLink from 'next/link'
import {Box, Flex, Heading, HStack, Image, Link, Skeleton, Stack, useColorModeValue} from '@chakra-ui/react'
import {ArticleStatus} from "@/components/ArticleStatus/ArticleStatus";
import {ArrowRight} from '@icon-park/react'
import React from "react";

export default function Home() {

    return (
        <Box maxW="7xl" mx="auto" my={{base: '12', md: '24'}} px={{base: '0', lg: '12'}} py={{base: '0', lg: '12'}}>
            <Stack direction={{base: 'column-reverse', lg: 'row'}} spacing={{base: '0', lg: '20'}}>
                <Box
                    width={{lg: 'sm'}}
                    transform={{base: 'translateY(-50%)', lg: 'none'}}
                    bg={{base: useColorModeValue('blue.50', 'gray.700'), lg: 'transparent'}}
                    mx={{base: '6', md: '8', lg: '0'}}
                    px={{base: '6', md: '8', lg: '0'}}
                    py={{base: '6', md: '8', lg: '12'}}
                >
                    <Stack spacing={{base: '8', lg: '10'}}>
                        <Stack spacing={{base: '2', lg: '4'}}>
                            <Heading size="xl" color={useColorModeValue('blue.500', 'blue.300')}>
                                ARTI
                            </Heading>
                            <Heading size="xl" fontWeight="normal">
                                一站式文章管理
                            </Heading>
                        </Stack>
                        <ArticleStatus/>
                        <HStack spacing="3">
                            <Link as={NextLink} href='/' color={useColorModeValue('blue.500', 'blue.300')}
                                  fontWeight="bold" fontSize="lg">
                                查看文章
                            </Link>
                            <ArrowRight size="20" fill="#4880c8"/>
                        </HStack>
                    </Stack>
                </Box>
                <Flex flex="1" overflow="hidden">
                    <Image
                        src="/banner.jpg"
                        alt="Blue Mountain"
                        fallback={<Skeleton/>}
                        maxH="450px"
                        minW="300px"
                        objectFit="cover"
                        flex="1"
                    />
                </Flex>
            </Stack>
        </Box>
    )
}

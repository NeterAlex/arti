import {Divider, Heading, Stack, Text, useColorModeValue} from '@chakra-ui/react'

interface Props {
    label: string
    value: string
}

export const Stat = (props: Props) => {
    const {label, value} = props
    return (
        <Stack>
            <Text fontSize="sm" color={useColorModeValue('blue.500', 'blue.300')}>
                {label}
            </Text>
            <Divider/>
            <Heading size={{base: 'sm', md: 'md'}}>{value}</Heading>
        </Stack>
    )
}
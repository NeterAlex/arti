import {
    FormControl,
    FormLabel,
    IconButton,
    Input,
    InputGroup,
    InputProps,
    InputRightElement,
    useDisclosure,
    useMergeRefs,
} from '@chakra-ui/react'
import {PreviewCloseOne, PreviewOpen} from '@icon-park/react'
import {forwardRef, useRef} from 'react'

export const PasswordField = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
    const {isOpen, onToggle} = useDisclosure()
    const inputRef = useRef<HTMLInputElement>(null)

    const mergeRef = useMergeRefs(inputRef, ref)
    const onClickReveal = () => {
        onToggle()
        if (inputRef.current) {
            inputRef.current.focus({preventScroll: true})
        }
    }

    return (
        <FormControl>
            <FormLabel htmlFor="password">密码</FormLabel>
            <InputGroup>
                <InputRightElement>
                    <IconButton
                        variant="link"
                        aria-label={isOpen ? 'Mask password' : 'Reveal password'}
                        icon={isOpen ? <PreviewCloseOne theme="outline" size="24" fill="#a3aebe"/> :
                            <PreviewOpen theme="outline" size="24" fill="#a3aebe"/>}
                        onClick={onClickReveal}
                    />
                </InputRightElement>
                <Input
                    id="password"
                    ref={mergeRef}
                    name="password"
                    type={isOpen ? 'text' : 'password'}
                    autoComplete="current-password"
                    required
                    {...props}
                />
            </InputGroup>
        </FormControl>
    )
})

PasswordField.displayName = 'PasswordField'
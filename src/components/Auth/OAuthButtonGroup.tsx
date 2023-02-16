import {Button, ButtonGroup, VisuallyHidden} from '@chakra-ui/react'
import {DegreeHat} from '@icon-park/react'

const providers = [
    {name: 'neau', icon: <DegreeHat theme="outline" size="24" fill="#333"/>},
]

export const OAuthButtonGroup = () => (
    <ButtonGroup variant="outline" spacing="4" width="full">
        {providers.map(({name, icon}) => (
            <Button key={name} width="full">
                <VisuallyHidden>Sign in with {name}</VisuallyHidden>
                {icon}
            </Button>
        ))}
    </ButtonGroup>
)
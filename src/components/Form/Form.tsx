import { FC, HTMLProps, PropsWithChildren } from 'react';

interface Props extends PropsWithChildren, HTMLProps<HTMLFormElement> {}

const Form: FC<Props> = props => {
    return <form {...props} />;
};

export default Form;

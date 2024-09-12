import React, { ReactNode } from 'react';

interface Props {
    children: ReactNode;
}

interface State {
    hasError: boolean;
    error: string;
}

class ErrorBoundary extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            hasError: false,
            error: '',
        };
    }

    static getDerivedStateFromError(error: any, infor: any) {
        console.log('err', error);
        return {
            hasError: true,
            error: infor.componentStack,
        };
    }

    render(): ReactNode {
        if (this.state.hasError) return this.state.error;

        return this.props.children;
    }
}

export default ErrorBoundary;

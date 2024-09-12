import { Box } from '@mui/material';
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

    static getDerivedStateFromError() {
        return {
            hasError: true,
        };
    }

    componentDidCatch(_error: any, info: any) {
        this.setState({
            hasError: true,
            error: info.componentStack,
        });
    }

    render(): ReactNode {
        if (this.state.hasError) {
            return (
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        width: '100vw',
                        height: '100vh',
                        fontSize: '1.2rem',
                    }}
                >
                    There is something wrong with our app {this.state.error}
                </Box>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;

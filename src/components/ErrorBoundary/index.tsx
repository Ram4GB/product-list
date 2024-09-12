import withError from '@/HOC/withError';

import ErrorBoundary from './ErrorBoundary';

const withErrorBoundary = withError(ErrorBoundary);

export default withErrorBoundary;

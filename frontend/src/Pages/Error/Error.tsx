const Error = ({error, resetErrorBoundary}: any) => {
    return (
        <div role="alert">
            <p>Error:</p>
            <pre>{error.message}</pre>
            <button onClick={resetErrorBoundary}>
                Try again
            </button>
        </div>
    );
}

export default Error;

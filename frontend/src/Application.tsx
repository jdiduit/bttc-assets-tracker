import {MantineProvider} from "@mantine/core";
import {Notifications} from "@mantine/notifications";
import {ErrorBoundary} from "react-error-boundary";
import Error from "@/Pages/Error/Error.tsx";
import {theme} from "./theme.ts";
import {ModalsProvider} from "@mantine/modals";
import '@mantine/notifications/styles.css';
import {router} from "./components/Routes/routes.tsx";
import {RouterProvider} from "react-router-dom";
import {NavigationProgress} from "@mantine/nprogress";
import {MetaMaskProvider} from "metamask-react";

const Application = () => {
    if (!chrome.extension) {
        import('@/assets/styles/webStyles.css')
    }

    return <ErrorBoundary FallbackComponent={Error}>
        <MantineProvider defaultColorScheme={'dark'} theme={theme}>
            <Notifications limit={2} style={{marginInline: 5}}/>
            <NavigationProgress/>
            <ModalsProvider>
                <MetaMaskProvider>
                    <RouterProvider router={router}/>
                </MetaMaskProvider>
            </ModalsProvider>
        </MantineProvider>
    </ErrorBoundary>
}

export default Application
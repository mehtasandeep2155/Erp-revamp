import type { AppProps } from "next/app";
import { QueryClient, QueryClientProvider, QueryCache } from "react-query";
import { Hydrate } from "react-query/hydration";
import { useState } from "react";
import { CacheProvider } from "@emotion/react";
import { emotionCache } from "../css/emotion";
import { lightMode } from "../css/css-var";
import AppHead from "../component/app-head";
import AppLayout from "../component/app-layout";
import AuthContext from "../component/utils/auth-provider";

function MyApp({ Component, pageProps }: AppProps) {
	const [colorTheme, setColorTheme] = useState<any>(lightMode);

	const queryCache = new QueryCache({
		onError: (error) => {}
	});

	const [queryClient] = useState(
		() =>
			new QueryClient({
				queryCache,
				defaultOptions: {
					queries: {
						refetchOnWindowFocus: false,
						refetchOnMount: false,
						refetchOnReconnect: false,
						retryOnMount: false,
						retry: false
					}
				}
			})
	);

	return (
		<>
			<AppHead colorTheme={colorTheme} />
			<CacheProvider value={emotionCache}>
				<QueryClientProvider client={queryClient}>
					<Hydrate state={pageProps?.dehydratedState} >
						<AppLayout>
							<AuthContext Component={Component} pageProps={pageProps} />
						</AppLayout>
					</Hydrate>
				</QueryClientProvider>
			</CacheProvider>
		</>
	);
}

export default MyApp;

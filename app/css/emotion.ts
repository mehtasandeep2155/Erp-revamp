import createCache from "@emotion/cache";

export const emotionCache = createCache({
	prepend: true,
	key: "e-css"
});

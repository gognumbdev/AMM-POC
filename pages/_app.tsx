import "../styles/globals.css";
import type { AppProps } from "next/app";
import BalanceProvider from "../BalanceContext";

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <BalanceProvider>
            <Component {...pageProps} />
        </BalanceProvider>
    );
}

export default MyApp;

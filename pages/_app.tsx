import "../styles/globals.css"
import type { AppProps } from "next/app"
import WalletContextProvider from "../components/WalletContextProvider"
import Head from "next/head"


function MyApp({ Component, pageProps }: AppProps) {
  return (
      <WalletContextProvider>
        <Head>
          <title>Boca Chica</title>
        </Head>
        <Component {...pageProps} />
      </WalletContextProvider>
  )
}

export default MyApp

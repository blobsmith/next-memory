import { AppProps } from "next/app"
import { StoreProvider } from '@/lib/zustandProvider'
import { useHydrate } from '@/lib/store'

import "styles/globals.scss"
import "styles/nav.scss"
import "styles/content.scss"
import "styles/aside.scss"
import "styles/search.scss"
import "styles/radio.scss"

export default function App({ Component, pageProps }: AppProps) {
  const store = useHydrate(pageProps.initialZustandState)

  return (
      <StoreProvider store={store}>
        <Component {...pageProps} />
      </StoreProvider>
    )
}

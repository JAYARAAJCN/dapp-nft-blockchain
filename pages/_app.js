import '../styles/globals.css'
import { MoralisProvider } from 'react-moralis'
import { NFTProvider } from '../context/NFTContext'

function MyApp({ Component, pageProps }) {
  return (
  <MoralisProvider
  serverUrl={process.env.NEXT_PUBLIC_MORALIS_SERVER}
  appId={process.env.NEXT_PUBLIC_MORALIS_APP_ID}
  >
    <NFTProvider>
    <Component {...pageProps} />
    </NFTProvider>
       
  </MoralisProvider>
  )
}

export default MyApp

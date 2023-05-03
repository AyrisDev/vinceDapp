import type { AppProps } from 'next/app';
import type { NextPageWithLayout } from '@/types';
// import { Fira_Code } from 'next/font/google';
import Head from 'next/head';
import { ThemeProvider } from 'next-themes';
import { QueryClient, QueryClientProvider } from 'react-query';
import ModalsContainer from '@/components/modal-views/container';
import DrawersContainer from '@/components/drawer-views/container';
import SettingsButton from '@/components/settings/settings-button';
import SettingsDrawer from '@/components/settings/settings-drawer';
import { WalletProvider } from '@/lib/hooks/use-connect';
import 'overlayscrollbars/overlayscrollbars.css';
// base css file
import 'swiper/css';
import 'swiper/css/pagination';
import '@/assets/css/scrollbar.css';
import '@/assets/css/globals.css';
import '@/assets/css/range-slider.css';
import { useState } from 'react';

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

import '@rainbow-me/rainbowkit/styles.css';

import {
  getDefaultWallets,
  RainbowKitProvider,
  Theme,
  darkTheme,
} from '@rainbow-me/rainbowkit';
import { chain, configureChains, createClient, WagmiConfig } from 'wagmi';
import { publicProvider } from 'wagmi/providers/public';
import { mainnet, polygon } from 'wagmi/chains';

import { vinceChain } from '@/hooks/chains';

import merge from 'lodash-es/merge';
const rainbowkitTheme = merge(darkTheme(), {
  colors: {
    accentColor: 'var(--blue-link)',
  },
  fonts: {
    body: "'Space Grotesk', sans-serif",
  },
} as Theme);

const { chains, provider } = configureChains(
  [mainnet, vinceChain],
  [publicProvider()]
);

const { connectors } = getDefaultWallets({
  appName: 'My RainbowKit App',
  chains,
});

const wagmiClient = createClient({
  connectors,
  provider,
});

// const firaCode = Fira_Code({
//   weight: ['400', '500', '700'],
//   style: ['normal'],
//   subsets: ['latin'],
//   variable: '--font-body',
// });

function CustomApp({ Component, pageProps }: AppPropsWithLayout) {
  //could remove this if you don't need to page level layout
  const getLayout = Component.getLayout ?? ((page) => page);
  const [queryClient] = useState(() => new QueryClient());
  return (
    <>
      <Head>
        {/* maximum-scale 1 meta tag need to prevent ios input focus auto zooming */}
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1 maximum-scale=1"
        />
        <title>Criptic - React Next Web3 NFT Crypto Dashboard Template</title>
      </Head>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider
          attribute="class"
          enableSystem={false}
          defaultTheme="dark"
        >
          <WagmiConfig client={wagmiClient}>
            <RainbowKitProvider chains={chains} theme={rainbowkitTheme}>
              {/* <div className={`${firaCode.variable} font-body`}> */}
              {getLayout(<Component {...pageProps} />)}
              <SettingsButton />
              <SettingsDrawer />
              <ModalsContainer />
              <DrawersContainer />
              {/* </div> */}
            </RainbowKitProvider>
          </WagmiConfig>
        </ThemeProvider>
      </QueryClientProvider>
    </>
  );
}

export default CustomApp;

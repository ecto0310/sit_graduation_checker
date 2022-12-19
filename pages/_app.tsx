import '../styles/globals.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import type { AppProps } from 'next/app'
import Head from 'next/head';
import Layout from '../components/Common/Layout';

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Head>
        <title>SIT Graduation Checker</title>
      </Head>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  );
}

export default App;

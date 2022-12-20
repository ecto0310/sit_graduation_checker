import '../styles/globals.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import type { AppProps } from 'next/app'
import Head from 'next/head';
import Layout from '../components/Common/Layout';
import Alert from 'react-bootstrap/Alert';
import { Container } from 'react-bootstrap';

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Head>
        <title>SIT Graduation Checker</title>
      </Head>
      <Layout>
        <Container>
          <Alert variant={"danger"} className="mt-1">
            判定結果は参考値です。万が一誤りがあった場合でも、製作者は一切責任を負いません。
          </Alert>
          <Component {...pageProps} />
        </Container>
      </Layout>
    </>
  );
}

export default App;

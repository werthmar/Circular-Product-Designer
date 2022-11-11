// Stylesheets
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/globals.scss';
import '../styles/footer.scss';

// Base Layout containing standard header...
import Layout from '../components/Layout';

function MyApp({ Component, pageProps }) {
  return (
    <Layout pageTitle="Landing Page Nextjs">
      <Component {...pageProps} />
    </Layout>
  )
}

export default MyApp
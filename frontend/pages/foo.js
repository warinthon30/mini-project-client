import Head from "next/head";
import Layout from "../components/layout";
import Navbar from "../components/navbar";
import styles from "../styles/Home.module.css";
import Image from "next/image";

export default function Home({ token }) {


  const addProducts = async (name, numberproduct) => {
    let product = await axios.post(
      `${config.URL}/products`,

      { name, numberproduct }
    );
    setProducts(product.data);
  };
  return (
    <Layout>
      <Head>
        <title>First Page</title>
      </Head>
      <div className={styles.container}>
        <Navbar />
        <h1>หูฟัง Gaming </h1>
        <div className={styles.pic}>

          <Image src="/k5.jpg" alt="my picture" width={200} height={200} />
          <p>หูฟัง Gaming รุ่น K5 Pro Wired Stereo - Black/Blue</p>
          <h2>$19.66</h2>
          <div class="button">
          <button onClick={() => addProducts(name, numberproduct)}>
            Add to cat
          </button>
        </div><br></br>

          <Image src="/ega.jpg" alt="my picture" width={200} height={200} />
          <p>EGA หูฟังเกม Type-H6 - Black</p>
          <h2>$16</h2>
          
          <div class="button">
          <button onClick={() => addProducts(name, numberproduct)}>
            Add to cat
          </button>
        </div><br></br>

          <Image src="/signo.jpg" alt="my picture" width={200} height={200} />
          <p>SIGNO หูฟังเกม HP-829</p>
          <h2>$16.63</h2>
          <div class="button">
          <a href="/products" className={styles.card}>
              <h3>Add To Cat</h3>
            </a>
        </div><br></br>

        </div>
      </div>
      
    </Layout>
  );
}

export function getServerSideProps({ req, res }) {
  // console.log("token from cookie: ",cookie.get("token"))
  // console.log('req: ', req.headers)
  return { props: { token: req.cookies.token || "" } };
}

import Head from "next/head";
import Layout from "../components/layout";
import { useState } from "react";
import Navbar from "../components/navbar";
import styles from "../styles/Home.module.css";
import axios from "axios";
import config from "../config/config";

export default function Login({ token }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState("");
  const [ischeck, setRemember] = useState("");

  const login = async (req, res) => {
    try {
      let result = await axios.post(
        `${config.URL}/login`,
        { username, password, ischeck },
        { withCredentials: true }
      );
      console.log("result: ", result);
      console.log("result.data:  ", result.data);
      console.log("token:  ", token);
      setStatus(result.status + ": " + result.data.user.username);
    } catch (e) {
      console.log("error: ", JSON.stringify(e.response));
      setStatus(JSON.stringify(e.response).substring(0, 80) + "...");
    }
  };

  const loginForm = () => (
    <div class={styles.gridContainer}>
      <div>
        <input
          type="text"
          name="username"
          placeholder="username"
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>

      <div>
        <input
          type="password"
          name="password"
          placeholder="password"
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
    </div>
  );

  return (
    <Layout>
      <Head>
        <title>Login</title>
      </Head>
      <div className={styles.container}>
        <Navbar />
        <h1>Login</h1>

        <br />
        <div>
          Status: {status}
          check: {ischeck}
        </div>
        <br />
        {loginForm()}
        <div>
          <input
            type="checkbox"
            name="IsRememberMe"
            onChange={(e) => setRemember(e.target.value)}
          />
          Remember me!
          <br />
          <br />
        </div>

        <div>
          <button onClick={login}>Login</button>
        </div>
      </div>
    </Layout>
  );
}

export function getServerSideProps({ req, res }) {
  return { props: { token: req.cookies.token || "" } };
}

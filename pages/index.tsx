import { NextPage } from "next"
import styles from "../styles/Home.module.css"
import { AppBar } from "../components/AppBar"
import Card from "../components/Card"


const Home: NextPage = () => {

  return (
    <div className={styles.App}>
      <AppBar />
      <section className={styles.AppBody}>
        <Card />
      </section>
    </div>
  )
}

export default Home

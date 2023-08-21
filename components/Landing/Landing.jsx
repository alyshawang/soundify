import styles from "./Landing.module.css"
import spotify from "./spotify"

export default function Landing() {
    return <div className={styles.container}>
         <style jsx global>{`
      body {
        margin: 0px;
        padding: 0px;

      }
  
    `}</style>
        <h1 className={styles.header}>Convert Spotify to Youtube.</h1>
        <button id="loginButton" className = {styles.button}>Log in with Spotify</button> 

    </div>
}


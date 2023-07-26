import styles from "./Landing.module.css"
import spotify from "./spotify"

export default function Landing() {
    return <div className={styles.container}>
        <h1 className={styles.header}>Spotify and Soundcloud. Mixed.</h1>
        <button id="loginButton" className = {styles.button}>Log in with Spotify</button> 

    </div>
}


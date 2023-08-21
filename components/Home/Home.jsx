
import React, { useEffect, useState } from 'react';
import { fetchUserPlaylists } from '../spotifyAPI'; 
import PlaylistConversionButton from '../playlist'; 
import styles from "./Home.module.css";
import axios from 'axios';
import playlistImage from "../../public/Images/image2.svg";
import Image from 'next/image'

function extractAccessToken() {
  const storedAccessToken = localStorage.getItem('accessToken');
  if (storedAccessToken) {
    return storedAccessToken;
  }

  const hash = window.location.hash.substring(1);
  const params = new URLSearchParams(hash);
  return params.get('access_token');
}

export default function Home() {
  const [playlists, setPlaylists] = useState([]);

  useEffect(() => {
    // fetchUserPlaylists function and pass the access token to it
    const accessToken = extractAccessToken();
    fetchUserPlaylists(accessToken)
      .then((userPlaylists) => {
        setPlaylists(userPlaylists);
      })
      .catch((error) => {
        console.error('Error fetching playlists:', error);
      });
  }, []);

  const handleConvertPlaylist = (playlistId) => {
    axios.post('http://127.0.0.1:5000/convert_playlist', { playlistId })
      .then((response) => {
        console.log(response.data.message);
      })
      .catch((error) => {
        console.error('Error converting playlist:', error);
      });
  };

  return (
    <div className={styles.background}>
      <style jsx global>{`
      body {
        margin: 0px;
        padding: 0px;
      }
    `}</style>
      <h2 className = {styles.title}>Your Playlists</h2>
      <div className={styles.playlistsContainer}>
        {playlists.map((playlist) => (
          <div key={playlist.id} className={styles.playlistItem}>
            {playlist.image && (
              <a href={`https://open.spotify.com/playlist/${playlist.id}`} target="_blank" rel="noopener noreferrer">
                <img src={playlist.image} alt={playlist.name} className={styles.playlistImage} />
              </a>
            )}
            <a href={`https://open.spotify.com/playlist/${playlist.id}`} target="_blank" rel="noopener noreferrer" className={styles.playlistTitle}>
              {playlist.name}
            </a>
            <button onClick={() => handleConvertPlaylist(playlist.id)} className={styles.convertButton}>
            <Image src={playlistImage} className={styles.image} />
              
            </button>
          </div>
        ))}
      </div>
    </div>
  );
            }  

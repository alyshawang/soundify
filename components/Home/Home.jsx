import React, { useEffect, useState } from 'react';
import { fetchUserPlaylists } from '../spotifyAPI'; // Import the function
import PlaylistConversionButton from '../playlist'; // Replace the path with the actual path to your component


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
    // Call the fetchUserPlaylists function and pass the access token to it
    const accessToken = extractAccessToken();
    fetchUserPlaylists(accessToken)
      .then((userPlaylists) => {
        setPlaylists(userPlaylists);
      })
      .catch((error) => {
        console.error('Error fetching playlists:', error);
      });
  }, []);

  return (
    <div>
      {/* Display the playlists */}
      <h2>Your Playlists</h2>
      <ul>
        {playlists.map((playlist) => (
          <li key={playlist.id}>{playlist.name}</li>
        ))}
      </ul>
      <PlaylistConversionButton />
    </div>
  );
}

// import React, { useEffect, useState } from 'react';
// import { fetchUserPlaylists } from '../spotifyAPI';
// import PlaylistConversionButton from '../playlist'; // Replace the path with the actual path to your component

// function extractAccessToken() {
//   const storedAccessToken = localStorage.getItem('accessToken');
//   if (storedAccessToken) {
//     return storedAccessToken;
//   }

//   const hash = window.location.hash.substring(1);
//   const params = new URLSearchParams(hash);
//   return params.get('access_token');
// }

// export default function Home() {
//   const [playlists, setPlaylists] = useState([]);

//   useEffect(() => {
//     // Call the fetchUserPlaylists function and pass the access token to it
//     const accessToken = extractAccessToken();
//     fetchUserPlaylists(accessToken)
//       .then((userPlaylists) => {
//         setPlaylists(userPlaylists);
//       })
//       .catch((error) => {
//         console.error('Error fetching playlists:', error);
//       });
//   }, []);

//   // Function to handle playlist conversion for a specific playlist
//   const handleConvertPlaylist = (playlistId) => {
//     axios.post('http://127.0.0.1:5000/convert_playlist', { spotifyPlaylistId: playlistId })
//       .then((response) => {
//         console.log(response.data.message);
//       })
//       .catch((error) => {
//         console.error('Error converting playlist:', error);
//       });
//   };

//   return (
//     <div>
//       {/* Display the playlists */}
//       <h2>Your Playlists</h2>
//       <ul>
//         {playlists.map((playlist) => (
//           <li key={playlist.id}>
//             {playlist.name}
//             <PlaylistConversionButton playlistId={playlist.id} />
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }

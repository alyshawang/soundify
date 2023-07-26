import React from 'react';
import axios from 'axios';

export default function PlaylistConversionButton() {
  const handleConvertPlaylist = () => {
    axios.post('http://127.0.0.1:5000/convert_playlist')
      .then((response) => {
        console.log(response.data.message);
      })
      .catch((error) => {
        console.error('Error converting playlist:', error);
      });
  };

  return (
    <button onClick={handleConvertPlaylist}>Convert Playlist</button>
  );
}

// import React from 'react';
// import axios from 'axios';

// export default function PlaylistConversionButton({ playlistId }) {
//   const handleConvertPlaylist = () => {
//     axios.post('http://127.0.0.1:5000/convert_playlist', { spotifyPlaylistId: playlistId })
//       .then((response) => {
//         console.log(response.data.message);
//       })
//       .catch((error) => {
//         console.error('Error converting playlist:', error);
//       });
//   };

//   return (
//     <button onClick={handleConvertPlaylist}>Convert Playlist</button>
//   );
// }


// export async function fetchUserPlaylists(accessToken) {
//   try {
//     const response = await fetch('https://api.spotify.com/v1/me/playlists', {
//       headers: {
//         Authorization: `Bearer ${accessToken}`,
//       },
//     });

//     if (!response.ok) {
//       throw new Error('Failed to fetch playlists');
//     }

//     const data = await response.json();
//     const playlists = data.items; // Assuming data.items contains the playlists array

//     return playlists;
//   } catch (error) {
//     console.error('Error fetching playlists:', error);
//     throw error;
//   }
// }

export async function fetchUserPlaylists(accessToken) {
  try {
    const response = await fetch('https://api.spotify.com/v1/me/playlists', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch playlists');
    }

    const data = await response.json();
    const playlists = data.items.map((playlist) => ({
      id: playlist.id,
      name: playlist.name,
      image: playlist.images.length ? playlist.images[0].url : null, // Get the first image of the playlist, if available
    }));

    return playlists;
  } catch (error) {
    console.error('Error fetching playlists:', error);
    throw error;
  }
}

// export async function fetchUserPlaylists(accessToken) {
//   try {
//     const response = await fetch('https://api.spotify.com/v1/me/playlists', {
//       headers: {
//         Authorization: `Bearer ${accessToken}`,
//       },
//     });

//     if (!response.ok) {
//       const errorData = await response.json();
//       throw new Error(`Failed to fetch playlists: ${errorData.error.message}`);
//     }

//     const data = await response.json();
//     const playlists = data.items;

//     return playlists;
//   } catch (error) {
//     console.error('Error fetching playlists:', error);
//     throw error;
//   }
// }

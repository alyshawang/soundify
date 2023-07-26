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
    const playlists = data.items; // Assuming data.items contains the playlists array

    return playlists;
  } catch (error) {
    console.error('Error fetching playlists:', error);
    throw error;
  }
}

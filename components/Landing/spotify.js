function handleLogin() {
    // Set the necessary configuration
    const clientId = "b8628316e4ef4d4181f264bd90ba954b";
    const redirectUri = 'http://localhost:3000/home';
    const scopes = 'user-top-read';
  
    // Generate the authorization URL
    const authorizeUrl = `https://accounts.spotify.com/authorize?response_type=token&client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&scope=${encodeURIComponent(scopes)}`;
  
    // Redirect the user to the authorization URL
    window.location.href = authorizeUrl;
  }
  
  export { handleLogin };

  // Attach the click event handler to the login button
  if (typeof window !== 'undefined') {
  const loginButton = document.getElementById('loginButton');
  loginButton.addEventListener('click', handleLogin);
  }

// const clientId = 'b8628316e4ef4d4181f264bd90ba954b';
// const clientSecret = 'bebe0abd8e6944bbad6d53c0e5af5c70';
// const redirectUri = 'http://localhost:3010/home';
// const scopes = ['user-read-playback-state', 'streaming'];

// function handleLogin() {
//   const authorizationUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=code&redirect_uri=${encodeURIComponent(redirectUri)}&scope=${scopes.join('%20')}`;

//   if (typeof window !== 'undefined') {
//     window.location.href = authorizationUrl;
//   } else {
//     console.error('Window object is not available. Unable to redirect.');
//   }
// }

// function handleAuthorizationCode() {
//   const urlParams = new URLSearchParams(window.location.search);
//   const authorizationCode = urlParams.get('code');

//   const tokenRequestBody = new URLSearchParams({
//     grant_type: 'authorization_code',
//     code: authorizationCode,
//     redirect_uri: redirectUri
//   });

//   const tokenEndpoint = 'https://accounts.spotify.com/api/token';
//   const authorizationHeader = btoa(`${clientId}:${clientSecret}`);

//   fetch(tokenEndpoint, {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/x-www-form-urlencoded',
//       'Authorization': `Basic ${authorizationHeader}`
//     },
//     body: tokenRequestBody
//   })
//     .then(response => response.json())
//     .then(data => {
//       const accessToken = data.access_token;
//       initializeWebPlaybackSDK(accessToken);
//     })
//     .catch(error => {
//       console.error('Error:', error);
//     });
// }

// if (typeof window !== 'undefined') {
//   const loginButton = document.getElementById('loginButton');
//   if (loginButton) {
//     loginButton.addEventListener('click', handleLogin);
//   }
// }

// // Call handleAuthorizationCode when the user is redirected back to your redirect URI
// handleAuthorizationCode();

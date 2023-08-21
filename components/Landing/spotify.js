function handleLogin() {
    // necessary configuration
    const clientId = "b8628316e4ef4d4181f264bd90ba954b";
    const redirectUri = 'http://localhost:3000/home';
    const scopes = 'user-top-read';
  
    // authorization URL
    const authorizeUrl = `https://accounts.spotify.com/authorize?response_type=token&client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&scope=${encodeURIComponent(scopes)}`;
  
    // redirect the user to the authorization URL
    window.location.href = authorizeUrl;
  }
  
  export { handleLogin };

  //  click event handler to the login button
  if (typeof window !== 'undefined') {
  const loginButton = document.getElementById('loginButton');
  loginButton.addEventListener('click', handleLogin);
  }

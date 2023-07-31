
import spotipy
from spotipy.oauth2 import SpotifyClientCredentials
from google_auth_oauthlib.flow import InstalledAppFlow
from googleapiclient.discovery import build
from googleapiclient.errors import HttpError


# Set up Spotify API
spotify_client_id = "b8628316e4ef4d4181f264bd90ba954b"
spotify_client_secret = "bebe0abd8e6944bbad6d53c0e5af5c70"
sp = spotipy.Spotify(auth_manager=SpotifyClientCredentials(client_id=spotify_client_id, client_secret=spotify_client_secret))

# Set up YouTube API OAuth2 credentials
scopes = ["https://www.googleapis.com/auth/youtube.force-ssl"]
flow = InstalledAppFlow.from_client_secrets_file("/Users/alyshawang/Downloads/client_secret_221861683540-uh6ecbtm9en6o8sb5uatkao5krjcnk6v.apps.googleusercontent.com.json", scopes=scopes)
credentials = flow.run_local_server()

# Set up YouTube API
youtube = build("youtube", "v3", credentials=credentials)

# Step 1: Get the songs from your Spotify playlist
def get_spotify_playlist_tracks(playlist_id):
    try:
        results = sp.playlist_tracks(playlist_id)
        tracks = results["items"]
        return [(track["track"]["name"], track["track"]["artists"][0]["name"]) for track in tracks]
    except spotipy.exceptions.SpotifyException as e:
        print(f"An error occurred while getting playlist tracks: {e}")
        return []

# Step 2: Create a playlist on YouTube
def create_youtube_playlist(title, description):
    try:
        playlist = youtube.playlists().insert(
            part="snippet,status",
            body={
                "snippet": {
                    "title": title,
                    "description": description,
                },
                "status": {
                    "privacyStatus": "private",  # Adjust this as needed
                },
            }
        ).execute()
        return playlist["id"]
    except HttpError as e:
        print(f"An error occurred while creating the YouTube playlist: {e}")
        return None

# Step 3: Search for each song on YouTube
def search_youtube_song(query):
    try:
        search_response = youtube.search().list(
            q=query,
            part="id",
            maxResults=1,
            type="video"
        ).execute()

        if "items" in search_response:
            video_id = search_response["items"][0]["id"]["videoId"]
            return video_id
    except HttpError as e:
        print(f"An error occurred while searching for the YouTube video: {e}")
        return None

# Step 4: Add the videos to the newly created YouTube playlist
def add_to_youtube_playlist(youtube_playlist_id, video_id):
    try:
        youtube.playlistItems().insert(
            part="snippet",
            body={
                "snippet": {
                    "playlistId": youtube_playlist_id,
                    "resourceId": {
                        "kind": "youtube#video",
                        "videoId": video_id
                    }
                }
            }
        ).execute()
    except HttpError as e:
        print(f"An error occurred while adding the video to the YouTube playlist: {e}")

# ... (existing code)

# Main function to orchestrate the process
def main(playlist_id):
    # Step 1: Get the songs from the provided Spotify playlist
    spotify_tracks = get_spotify_playlist_tracks(playlist_id)

    # Step 2: Create a playlist on YouTube
    youtube_playlist_title = "Your YouTube Playlist Title"  # Replace with a meaningful title
    youtube_playlist_description = "Your YouTube Playlist Description"  # Replace with a meaningful description
    youtube_playlist_id = create_youtube_playlist(youtube_playlist_title, youtube_playlist_description)

    if youtube_playlist_id:
        # Step 3 and 4: Search for each song on YouTube and add the videos to the YouTube playlist
        for song, artist in spotify_tracks:
            query = f"{song} {artist} official music video"  # Customize the search query if needed
            video_id = search_youtube_song(query)
            if video_id:
                add_to_youtube_playlist(youtube_playlist_id, video_id)
            else:
                print(f"Video not found for: {song} - {artist}")

if __name__ == "__main__":
    import sys
    if len(sys.argv) != 2:
        print("Usage: python test.py <spotify_playlist_id>")
        sys.exit(1)
    
    main(sys.argv[1])

# # Main function to orchestrate the process
# def main():
#     # Step 1: Get the songs from your Spotify playlist
#     spotify_playlist_id = "5ugw8w0YFyyV2Pm3ORutnc"  # Replace with your Spotify playlist ID
#     spotify_tracks = get_spotify_playlist_tracks(spotify_playlist_id)

#     # Step 2: Create a playlist on YouTube
#     youtube_playlist_title = "Your YouTube Playlist Title"  # Replace with a meaningful title
#     youtube_playlist_description = "Your YouTube Playlist Description"  # Replace with a meaningful description
#     youtube_playlist_id = create_youtube_playlist(youtube_playlist_title, youtube_playlist_description)

#     if youtube_playlist_id:
#         # Step 3 and 4: Search for each song on YouTube and add the videos to the YouTube playlist
#         for song, artist in spotify_tracks:
#             query = f"{song} {artist} official music video"  # Customize the search query if needed
#             video_id = search_youtube_song(query)
#             if video_id:
#                 add_to_youtube_playlist(youtube_playlist_id, video_id)
#             else:
#                 print(f"Video not found for: {song} - {artist}")

# if __name__ == "__main__":
#     main()

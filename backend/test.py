
import spotipy
from spotipy.oauth2 import SpotifyClientCredentials
from google_auth_oauthlib.flow import InstalledAppFlow
from googleapiclient.discovery import build
from googleapiclient.errors import HttpError
from google.oauth2 import service_account


# Spotify API
spotify_client_id = "b8628316e4ef4d4181f264bd90ba954b"
spotify_client_secret = "bebe0abd8e6944bbad6d53c0e5af5c70"
sp = spotipy.Spotify(auth_manager=SpotifyClientCredentials(client_id=spotify_client_id, client_secret=spotify_client_secret))

# YouTube API OAuth2
scopes = ["https://www.googleapis.com/auth/youtube.force-ssl"]
flow = InstalledAppFlow.from_client_secrets_file("/Users/alyshawang/Downloads/client_secret_221861683540-uh6ecbtm9en6o8sb5uatkao5krjcnk6v.apps.googleusercontent.com.json", scopes=scopes)
# credentials = flow.run_local_server()
credentials = flow.run_local_server(port=8888)

credentials_path = "/Users/alyshawang/Downloads/ytsp-393922-7f4dbc3f70b5.json"

youtube = build("youtube", "v3", credentials=credentials)

# 1: songs from Spotify playlist
def get_spotify_playlist_tracks(playlist_id):
    try:
        results = sp.playlist_tracks(playlist_id)
        tracks = results["items"]
        return [(track["track"]["name"], track["track"]["artists"][0]["name"]) for track in tracks]
    except spotipy.exceptions.SpotifyException as e:
        print(f"An error occurred while getting playlist tracks: {e}")
        return []

# 2: create a playlist on yt
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
                    "privacyStatus": "private",  # for private
                },
            }
        ).execute()
        return playlist["id"]
    except HttpError as e:
        print(f"An error occurred while creating the YouTube playlist: {e}")
        return None

# 3: search for song on yt
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

# 4: add the videos yt playlist
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

def main(playlist_id):
    # 1
    spotify_tracks = get_spotify_playlist_tracks(playlist_id)

    # 2
    youtube_playlist_title = "Your YouTube Playlist Title" 
    youtube_playlist_description = "Your YouTube Playlist Description"  
    youtube_playlist_id = create_youtube_playlist(youtube_playlist_title, youtube_playlist_description)

    if youtube_playlist_id:
        # 3 + 4
        for song, artist in spotify_tracks:
            query = f"{song} {artist} official music video"  # the search query 
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

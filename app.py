from flask import Flask, jsonify
import subprocess
from flask_cors import CORS


app = Flask(__name__)
CORS(app)  # Allow all origins, you can restrict it to specific origins if needed

@app.route('/convert_playlist', methods=['POST'])
def convert_playlist():
    try:
        # Run the test.py script
        subprocess.run(['python', 'test.py'], check=True)

        return jsonify({"message": "Playlist conversion successful"})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)

# from flask import Flask, request, jsonify

# app = Flask(__name__)

# # Sample route to handle playlist conversion
# @app.route('/convert_playlist', methods=['POST'])
# def convert_playlist():
#     try:
#         # Get the Spotify playlist ID from the request data
#         data = request.get_json()
#         spotify_playlist_id = data.get('spotifyPlaylistId')

#         # Implement the playlist conversion logic using the functions in test.py
#         # For example:
#         # youtube_playlist_id = create_youtube_playlist("Your YouTube Playlist Title", "Your YouTube Playlist Description")
#         # if youtube_playlist_id:
#         #     spotify_tracks = get_spotify_playlist_tracks(spotify_playlist_id)
#         #     for song, artist in spotify_tracks:
#         #         query = f"{song} {artist} official music video"
#         #         video_id = search_youtube_song(query)
#         #         if video_id:
#         #             add_to_youtube_playlist(youtube_playlist_id, video_id)
#         #         else:
#         #             print(f"Video not found for: {song} - {artist}")

#         # For this example, just return a success message
#         return jsonify({'message': 'Playlist conversion successful'})
#     except Exception as e:
#         return jsonify({'error': str(e)}), 500

# if __name__ == '__main__':
#     app.run(debug=True)

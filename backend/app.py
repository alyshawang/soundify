

from flask import Flask, jsonify, request
import subprocess
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # allow all origins

@app.route('/convert_playlist', methods=['POST'])
def convert_playlist():
    try:
        data = request.json
        playlist_id = data.get('playlistId')

        if not playlist_id:
            raise ValueError('Invalid request. Playlist ID not provided.')

        # test.py script with the provided playlist_id
        subprocess.run(['python', 'test.py', playlist_id], check=True)

        return jsonify({"message": "Playlist conversion successful"})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)

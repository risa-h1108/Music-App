import axios from "axios";

class SpotifyClient {
  // 初期化処理
  static async initialize() {
    const params = new URLSearchParams();
    params.append("grant_type", "client_credentials");

    const clientId = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
    const clientSecret = import.meta.env.VITE_SPOTIFY_CLIENT_SECRET;

    const basicAuth = btoa(`${clientId}:${clientSecret}`);

    const response = await axios.post(
      "https://accounts.spotify.com/api/token",
      params,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Basic ${basicAuth}`,
        },
      },
    );
    // 新しいアクセストークン取得
    const spotify = new SpotifyClient();
    spotify.token = response.data.access_token;

    console.log(response.data);
    return spotify;
  }

  async getPopularSongs() {
    const response = await axios.get(
      "https://api.spotify.com/v1/playlists/5SLPaOxQyJ8Ne9zpmTOvSe/tracks",
      {
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
      },
    );

    return response.data;
  }
}

export default SpotifyClient;

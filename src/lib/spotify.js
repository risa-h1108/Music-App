import axios from "axios";

class SpotifyClient {
  //初期化処理
  static async inittialize() {
    //getToken
    const response = await axios.post(
      "https://accounts.spotify.com/api/token",
      {
        grant_type: "client_credentials",
        client_id: import.meta.env.VITE_SPOTIFY_CLIENT_ID,
        client_secret: import.meta.env.VITE_SPOTIFY_CLIENT_SECRET,
      },
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      },
    );

    //新しいアクセストークン取得
    const spotify = new SpotifyClient();
    spotify.token = response.data.access_token;
    //新しいアクセストークン送信
    return spotify;
  }

  async getPopularSongs() {
    const response = await axios.get(
      "https://api.spotify.com/v1/playlists/5SLPaOxQyJ8Ne9zpmTOvSe",
      {
        headers: {
          Authorization: "Bearer " + this.token,
        },
      },
    );
    console.log(response.data);
  }
}

export default SpotifyClient;

import axios from "axios";

class ItunesClient {
  async searchSongs(term, limit = 20, offset) {
    const response = await axios.get(`https://itunes.apple.com/search`, {
      params: {
        term: term, //検索キーワード
        entity: "song", //song指定
        limit: limit, //データの取得件数の制限
        offset: offset, //先頭（1曲目）から、どれだけ離れているか（相対的な距離や位置）を表す値
      },
    });

    return response.data.results;
  }
}

export default ItunesClient;

//Spotify用で書いたコード
// class SpotifyClient {
//   // 初期化処理
//   static async initialize() {
//     const params = new URLSearchParams();
//     params.append("grant_type", "client_credentials");

//     const clientId = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
//     const clientSecret = import.meta.env.VITE_SPOTIFY_CLIENT_SECRET;

//     const basicAuth = btoa(`${clientId}:${clientSecret}`);

//     const response = await axios.post(
//       "https://accounts.spotify.com/api/token",
//       params,
//       {
//         headers: {
//           "Content-Type": "application/x-www-form-urlencoded",
//           Authorization: `Basic ${basicAuth}`,
//         },
//       },
//     );
//     // 新しいアクセストークン取得
//     const spotify = new SpotifyClient();
//     spotify.token = response.data.access_token;

//     console.log(response.data);
//     return spotify;
//   }

//   async getPopularSongs() {
//     const response = await axios.get(
//       "https://api.spotify.com/v1/search?q=jpop&type=track&limit=20",
//       {
//         headers: {
//           Authorization: `Bearer ${this.token}`,
//         },
//       },
//     );

//     return response.data.tracks;
//   }
// }

// export default SpotifyClient;

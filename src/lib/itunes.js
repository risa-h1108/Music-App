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

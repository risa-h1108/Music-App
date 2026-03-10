import { useEffect, useState } from "react";
import SpotifyClient from "./lib/spotify";
import { SongList } from "./components/SongList";

export default function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [popularSongs, setPopularSongs] = useState([]);
  const [spotify, setSpotify] = useState(null);

  //取得したデータを表示する
  useEffect(() => {
    async function init() {
      //初期化
      const spotifyClient = await SpotifyClient.initialize();
      setSpotify(spotifyClient);

      //曲取得、Apiを叩いた結果(=getPopularSongs)をresultに格納する
      const result = await spotifyClient.getPopularSongs();
      console.log(result);

      //stateに保存
      setPopularSongs(result.tracks.items);

      setIsLoading(false);
    }
    init();
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-white">
      <main className="flex-1 p-8 mb-20">
        <header className="flex justify-between items-center mb-10">
          <h1 className="text-4xl font-bold">Music App</h1>
        </header>
        <section>
          <h2 className="text-2xl font-semibold mb-5">Popular Songs</h2>
          {isLoading ? <p>Loading...</p> : <SongList songs={popularSongs} />}
        </section>
      </main>
    </div>
  );
}

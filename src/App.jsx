import { useEffect, useState } from "react";
import SpotifyClient from "./lib/spotify";
import { SongList } from "./components/SongList";

export default function App() {
  const [isLoading, setIsLoading] = useState(null);
  const [PopularSongs, setPopularSongs] = useState([]);

  //取得したデータを表示する
  useEffect(() => {
    async function init() {
      const spotify = await SpotifyClient.initialize();
      fetchPopularSongs();
    }
    init();
  }, []);

  const fetchPopularSongs = async () => {
    //ローディングする
    setIsLoading(true);
    //Apiを叩いた結果(=getPopularSongs)をresultに格納する
    const result = await spotify.getPopularSongs();
    console.log(result);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-white">
      <main className="flex-1 p-8 mb-20">
        <header className="flex justify-between items-center mb-10">
          <h1 className="text-4xl font-bold">Music App</h1>
        </header>
        <section>
          <h2 className="text-2xl font-semibold mb-5">Popular Songs</h2>
          <SongList />
        </section>
      </main>
    </div>
  );
}

import { useEffect, useState } from "react";
import ItunesClient from "./lib/itunes";
import { SongList } from "./components/SongList";
import { SearchInput } from "./components/SearchInput";

export default function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [popularSongs, setPopularSongs] = useState([]);
  const [term, setTerms] = useState("j-pop");
  const [searchedSongs, setSearchedSongs] = useState();
  const isSearchedResult = searchedSongs != null;

  useEffect(() => {
    async function init() {
      setIsLoading(true);

      const client = new ItunesClient();
      const result = await client.searchSongs("j-pop"); //表示したいジャンルを””の中に入れる

      setPopularSongs(result);
      setIsLoading(false);
    }

    init();
  }, []);

  const handleInputChange = (e) => {
    setTerms(e.target.value);
  };

  const searchSongs = async () => {
    setIsLoading(true);

    const client = new ItunesClient();
    const result = await client.searchSongs(term);

    setSearchedSongs(result);
    setIsLoading(false);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-white">
      <main className="flex-1 p-8 mb-20">
        <header className="flex justify-between items-center mb-10">
          <h1 className="text-4xl font-bold">Music App</h1>
        </header>
        <SearchInput onInputChange={handleInputChange} onSubmit={searchSongs} />
        <section>
          <h2 className="text-2xl font-semibold mb-5">
            {isSearchedResult ? "Search Results" : "Popular Songs"}
          </h2>
          <SongList
            isLoading={isLoading}
            songs={isSearchedResult ? searchedSongs : popularSongs}
          />
        </section>
      </main>
    </div>
  );
}

//Spotify用で書いたコード
// import { useEffect, useState } from "react";
// import SpotifyClient from "./lib/itunes";
// import { SongList } from "./components/SongList";

// export default function App() {
//   const [isLoading, setIsLoading] = useState(false);
//   const [popularSongs, setPopularSongs] = useState([]);
//   const [spotify, setSpotify] = useState(null);

//   //取得したデータを表示する
//   useEffect(() => {
//     async function init() {
//       setIsLoading(true);

//       //初期化
//       const spotifyClient = await SpotifyClient.initialize();
//       setSpotify(spotifyClient);

//       //曲取得、Apiを叩いた結果(=getPopularSongs)をresultに格納する
//       const result = await spotifyClient.getPopularSongs();

//       const popularSongs = result.items;
//       console.log(popularSongs);

//       setPopularSongs(popularSongs);
//       setIsLoading(false);
//     }
//     init();
//   }, []);

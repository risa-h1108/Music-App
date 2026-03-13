import { useEffect, useState } from "react";
import ItunesClient from "./lib/itunes";
import { SongList } from "./components/SongList";
import { SearchInput } from "./components/SearchInput";
import { Pagination } from "./components/Pagination";

export default function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [popularSongs, setPopularSongs] = useState([]);
  const [term, setTerms] = useState("j-pop");
  const [searchedSongs, setSearchedSongs] = useState([]);
  const [page, setPage] = useState(1);
  const isSearchedResult = searchedSongs != null;
  const limit = 20;

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

  const searchSongs = async (page = 1) => {
    // onSubmit={searchSongs} のsearchSongsの引数がなしでundefinedにならないようにデフォルト値（＝1）を渡すよう記載
    console.log("searchSongs called", term, page);

    setPage(page); //検索ボタンを押したらpage=1（1ページ目）に戻す
    setIsLoading(true);
    const offset = parseInt(page) ? (parseInt(page) - 1) * limit : 0; //何ページを表示するか
    console.log("offset:", offset);

    const client = new ItunesClient();
    const result = await client.searchSongs(term, limit, offset);

    setSearchedSongs(result);
    setIsLoading(false);
  };

  const moveToNext = async () => {
    console.log("next clicked");

    const nextPage = page + 1;
    await searchSongs(nextPage);
    setPage(nextPage);
  };

  const moveToPrev = async () => {
    console.log("prev clicked");
    const prevPage = page - 1;
    await searchSongs(prevPage);
    setPage(prevPage);
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
          {isSearchedResult && (
            <Pagination onPrev={moveToPrev} onNext={moveToNext} />
          )}
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

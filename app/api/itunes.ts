const url = "https://itunes.apple.com/search";
// const url = "http://localhost:1234";

function serialize(obj: any) {
  var str = [];
  for (var p in obj)
    if (obj.hasOwnProperty(p)) {
      str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
    }
  return str.join("&");
}

function createRequestParam(keyword: string) {
  return {
    term: keyword,
    lang: 'ja_jp',
    entry: 'music',
    media: 'music',
    country: 'JP',
    // dataType: "jsonp",
    method: "GET",
    limit: "10",
  };
}

export type GetMusicResult = {results: MusicJson[], resultCount: number};

export function getMusics(keyword: string): Promise<GetMusicResult> {
  return fetch(`${url}?${serialize(createRequestParam(keyword))}`).then(response => response.json())
  // return Promise.resolve(
  //   {
  //     resultCount: 1,
  //     results: [sampleJson]
  //   }
  // )
}

const sampleJson = {
  "wrapperType":"track",
  "kind":"song","artistId":254545979,"collectionId":1055812691,"trackId":1055812906,"artistName":"X JAPAN","collectionName":"Born to Be Free - Single","trackName":"Born to Be Free","collectionCensoredName":"Born to Be Free - Single","trackCensoredName":"Born to Be Free","artistViewUrl":"https://itunes.apple.com/us/artist/x-japan/254545979?uo=4","collectionViewUrl":"https://itunes.apple.com/us/album/born-to-be-free/1055812691?i=1055812906&uo=4","trackViewUrl":"https://itunes.apple.com/us/album/born-to-be-free/1055812691?i=1055812906&uo=4","previewUrl":"https://audio-ssl.itunes.apple.com/apple-assets-us-std-000001/Music69/v4/91/f1/b4/91f1b4b2-e084-5c33-f1dd-95d41fb3d875/mzaf_6151249257534773406.plus.aac.p.m4a","artworkUrl30":"https://is5-ssl.mzstatic.com/image/thumb/Music22/v4/b3/66/fa/b366fadb-44de-e4a0-b303-fb96c2874c92/source/30x30bb.jpg","artworkUrl60":"https://is5-ssl.mzstatic.com/image/thumb/Music22/v4/b3/66/fa/b366fadb-44de-e4a0-b303-fb96c2874c92/source/60x60bb.jpg","artworkUrl100":"https://is5-ssl.mzstatic.com/image/thumb/Music22/v4/b3/66/fa/b366fadb-44de-e4a0-b303-fb96c2874c92/source/100x100bb.jpg","collectionPrice":1.29,"trackPrice":1.29,"releaseDate":"2015-11-06T08:00:00Z","collectionExplicitness":"notExplicit","trackExplicitness":"notExplicit","discCount":1,"discNumber":1,"trackCount":1,"trackNumber":1,"trackTimeMillis":332848,"country":"USA","currency":"USD","primaryGenreName":"Rock","isStreamable":true}; 

export type MusicJson = typeof sampleJson;
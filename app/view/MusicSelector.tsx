import {useGetMusicData} from "../hooks/useGetRemoteData";
import {MusicJson} from "../api/itunes";
import * as React from "react";

function useMusicSelector() {
  const [keyword, setKeyword] = React.useState("");
  const [musicData] = useGetMusicData(keyword);
  const returnDatas = {keyword, musicData};
  return { returnDatas, setKeyword }
}

export function MusicSelector() {
  const {setKeyword, returnDatas: {keyword, musicData}} = useMusicSelector();

  const MusicData = () => {
    if (keyword.length <= 0) {
      return null;
    } 
    switch (musicData.type) {
      case "failure":
        return <p>{musicData.error.toString()}</p>
      case "pending":
        return <p>読み込み中</p>
      case "success":
        if (musicData.data.resultCount > 0) {
          return (
            <table>
              <thead>
              {MusicHeader(musicData.data.results[0])}
              </thead>
              <tbody>
              {musicData.data.results.map(MusicDetail)}
              </tbody>
            </table>
          )
        } else {
          return <p>音楽がみつかりませんでした</p>
        }
    }
  }

  const inputRef = React.useRef<HTMLInputElement>(null);
  const onClickButton = () => {
    if (inputRef.current) {
      const value = inputRef.current.value;
      setKeyword(value);
    }
  }
  return (
    <div>
      <input onKeyDown={e => {
        if (e.keyCode === 13) {
          onClickButton();
        }
      }} ref={inputRef}></input>
      <button onClick={onClickButton}>検索</button>
      {keyword}
      <MusicData />
    </div>
  );
}

const viewableHeader: (keyof MusicJson)[] = ["trackName", "artistName", "artworkUrl60", "previewUrl"];

export function MusicHeader(music: MusicJson) {
  const values = Object.entries(music);
  const liArray = values
    .filter(([key]) => viewableHeader.includes(key as any))
    .map(([key]) => {
    return <th>{key}</th>
  });
  return (
    <tr>
      {liArray}
    </tr>
  )
}

export function MusicDetail(music: MusicJson) {
  const values = Object.entries(music);
  const liArray = values
    .filter(([key]) => viewableHeader.includes(key as any))
    .map(([key, value]) => {
      switch (key) {
        case "artworkUrl60":
          return <td><img src={value.toString()}></img></td>
        case "previewUrl":
          return <td><audio controls src={value.toString()}></audio></td>
        default:
          return <td>{value}</td>
      }
  });
  return (
    <tr>
      {liArray}
    </tr>
  )
}
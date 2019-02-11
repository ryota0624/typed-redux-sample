import {useState, useEffect, useCallback, Context} from "react";
import {MethodReturnToUnion} from "../types/helper";
import {getMusics, GetMusicResult} from "../api/itunes";
export function Success<D>(data: D) {
  return {
    data,
    type: "success"
  } as const
}
export const Pending = {
  type: "pending"
} as const

export function Failure(e: Error) {
  return {
    error: e,
    type: "failure"
  } as const
}

class ResultMaker<E> {
  Success = (data: E) => Success(data);
  Failure = Failure
  Pending = Pending
}

type Result<E> = MethodReturnToUnion<ResultMaker<E>>

export function usePromise<E>() {
  const resultMaker = new ResultMaker<E>()
  const [result, setResult] = useState<Result<E>>(resultMaker.Pending);
  const [promise, setPromise] = useState<null | Promise<E>>(null);

  useEffect(() => {
    if (promise) {
      promise.then(data => {
        setResult(resultMaker.Success(data));
      }).catch(error => {
        setResult(resultMaker.Failure(error));
      });
    }
  }, [promise]);

  return { 
    result, 
    setPromise: (promise: Promise<E>) => setPromise(promise)
  };
}

type SearchQuery = string | null;

export function useGetMusicData() {
  const [searchQuery, setSearchQuery] = useState<SearchQuery>(null);
  const {result, setPromise} = usePromise<GetMusicResult>();
  useEffect(() => {
    if (searchQuery) {
      setPromise(getMusics(searchQuery));
    }
  }, [searchQuery]);

  return [searchQuery ? result : null, setSearchQuery] as const;
}
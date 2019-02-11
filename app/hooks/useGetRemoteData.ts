import {useState, useEffect, useCallback} from "react";
import {MethodReturnToUnion} from "../types/helper";
import {getMusics} from "../api/itunes";
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

export function usePromise<E>(getPromise: () => Promise<E>) {
  const resultMaker = new ResultMaker<E>()
  const [result, setResult] = useState<Result<E>>(resultMaker.Pending);

  const getRemoteDateAndSetResult = () => {
    getPromise().then(data => {
      setResult(resultMaker.Success(data));
    }).catch(error => {
      setResult(resultMaker.Failure(error));
    });
  }

  useEffect(() => {
    getRemoteDateAndSetResult();
  },[getPromise]);

  const retry = () => {
    getRemoteDateAndSetResult();
  };

  return [result, retry] as const;
}

export function useGetMusicData(keyword: string) {
  const getMusicsFn = useCallback(() => {
    if (keyword.length === 0) {
      return Promise.reject(new Error("キーワードが空です。"))
    }
    return getMusics(keyword);
  }, [keyword]);
  return usePromise(getMusicsFn);
}
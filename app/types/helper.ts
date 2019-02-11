/**
 * よくわかってない
 */
type Unwrap<T> = T extends { [K in keyof T]: infer U } ? U : never;

/**
 * クラスのメソッド型を抽出する
 */
type ReturnTypes<T> = {
  [K in keyof T]: T[K] extends (...args: any[]) => any
    ? (ReturnType<T[K]> extends {type: string} ? ReturnType<T[K]> : never)
    : T[K] extends {type: string} ? T[K] : never
};

export type MethodReturnToUnion<T> = Unwrap<ReturnTypes<T>>;
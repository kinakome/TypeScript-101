//rafceと入力することで、コンポーネントのテンプレートを利用することができる
import React, { useState } from "react";

//propsの型定義
interface Props {
  text: string;
}

interface UserData {
  id: number;
  name: string | null;
}

const TestComponent: React.FC<Props> = (props) => {
  //初期値から推論して型定義がされる
  const [count, setCount] = useState(0);
  //nullを許可したい場合はGenericsを利用する
  const [count1, setCount1] = useState<number | null>(null);

  //useStateにオブジェクトを指定したい場合
  const [user, setUser] = useState<UserData>({ id: 1, name: "dummy" });

  //
  const [inputData, setInputData] = useState("");

  //イベントオブジェクトの型が表示される（onChangeにカーソルを合わせると）のでコピー
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputData(e.target.value);
  };

  return (
    <>
      <div>{props.text}</div>
      <div>{count}</div>
      <input type="text" value={inputData} onChange={handleInputChange} />
      <div>{inputData}</div>
    </>
  );
};

export default TestComponent;

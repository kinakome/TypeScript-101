import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { type } from "node:os";
import JsonData from "./data.json";
import TestComponent from "./TestComponent";

//「interface」
//オブジェクトの型定義ができる
interface NAME {
  first: string;
  last: string | null;
}

let nameObj: NAME = { first: "yamada", last: "taro" };

//「関数の型定義」
const func1 = (x: number, y: number): number => {
  return x + y;
};

//「intersection types」（複数のタイプを結合する）

type PROFILE = {
  age: number;
  city: string;
};

type LOGIN = {
  username: string;
  password: string;
};

//型の結合
type USER = PROFILE & LOGIN;

const userA = {
  age: 30,
  city: "tokyo",
  username: "yamada",
  password: "yamada123",
};

//「union types」
//事前に指定した型のみ受け付けるようにする
let value: boolean | number;
value = true;
value = 10;

//配列の要素に対しても適用することができる
let arrayUni: (number | string)[];
arrayUni = [0, 1, 2, "aaaa"];

//具体的な値を指定して、指定された値のみ受け付けるようにすることも可能
let company: "google" | "facebook" | "amazon";
company = "amazon";
let memory: 256 | 512;
memory = 256;

//「typeof」
///typeofはjsonに対して利用することが多い
let msg: string = "Hi";
//宣言済みの変数の型を継承することができる
let msg2: typeof msg;
msg2 = "hello";

//型推論によって{cat: stringと判断される}
let animal = {
  cat: "small cat",
};
//animalの型を継承している
let newAnimal: typeof animal = { cat: "big cat" };

//importしたjsonの型をとってくることができる
//いちいち手入力する必要がない
type USERS = typeof JsonData;

//「keyof」
type KEYS = {
  primary: string;
  secondary: string;
};
//属性の名前をunion typesで取り出してくれる
// "primary" | "secondary"
let key: keyof KEYS;
key = "primary";

// typeof + keyof
const SPORTS = {
  soccer: "Soccer",
  baseball: "Baseball",
};

// SPORTSのtypeは{soccer: string, baseball: string}なので、
// それのkyeofは "soccer" | "baseball"
let keySports: keyof typeof SPORTS;
keySports = "soccer";

//「enum」
//自動で連番を付けてくれる
enum OS {
  windows,
  Mac,
  Linux,
}
//Windows = 0, Mac = 1, Linux = 2となる

interface PC {
  id: number;
  OStype: OS;
}

//1,2などを直接指定するよりも、メンテナンス性が高くなる
const PC1: PC = {
  id: 1,
  OStype: OS.Linux, //2が割り当てられる
};

//「Generics」
// interfaceの時点では引数のtypeが定まっていない
interface GEN<T> {
  item: T;
}

//具体的に使う時に型を指定する
const gen0: GEN<string> = { item: "hello" };
const gen1: GEN<number> = { item: 1 };

//デフォルトの型を指定
interface GEN1<T = string> {
  item: T;
}

//デフォルトを指定してあげると、型指定をしない場合もエラーにならない
const gen2: GEN1 = { item: "hello" };

//指定できる型を制限することもできる
interface GEN2<T extends string | number> {
  item: T;
}
const gen3: GEN2<number> = { item: 1 };

//関数のGenerics
function funcGen<T>(props: T) {
  return { item: props };
}

const gen6 = funcGen<string>("test");
const gen7 = funcGen<string | null>(null);

//extendsを使ったgenerics
function funcGen1<T extends string | null>(props: T) {
  return { value: props };
}
const gen8 = funcGen1("hello");

//propsを使う場合
interface Props {
  price: number;
}

function funcGen2<T extends Props>(props: T) {
  return { vlaue: props.price };
}
const gen9 = funcGen2({ price: 10 });

//アロー関数で書くと
const guncGen3 = <T extends Props>(props: T) => {
  return { value: props.price };
};

const App: React.FC = () => {
  return (
    <div className="App">
      <header className="App-header">
        <TestComponent text="hello" />
      </header>
    </div>
  );
};

export default App;

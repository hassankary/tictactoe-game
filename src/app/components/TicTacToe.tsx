"use client";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function TicTacToe() {
  const [count, setCount] = useState<number>(0);
  const [lock, setLock] = useState<boolean>(false);
  const [data, setData] = useState<string[]>(["", "", "", "", "", "", "", "", ""]);

  useEffect(() => {
    console.log("data =>", data);
  }, [data]);

  const toggle = (e: React.MouseEvent<HTMLDivElement>, num: number) => {
    e.preventDefault();
    if (lock) {
      return;
    }
    if (count % 2 === 0) {
      const newData = data.map((d, i) => {
        if (i === num) {
          return "x";
        } else {
          return d;
        }
      });
      setData(newData);
      setCount(count + 1);
    } else {
      const newData = data.map((d, i) => {
        if (i === num) {
          return "o";
        } else {
          return d;
        }
      });
      setData(newData);
      setCount(count + 1);
    }
  };

  const resetHandler = () => {
    const filteredData = data.map((d, i) => {
      return "";
    });
    setData(filteredData);
    setCount(0);
  };

  return (
    <div className="h-screen flex flex-col justify-center font-sans bg-gray-900">
      <div className="flex justify-center items-center px-[5%] font-bold text-center text-2xl">
        <h1>
          Tic Tac Toe Game by{" "}
          <span className="text-emerald-400">Hassankary</span>
        </h1>
      </div>
      <div className="flex flex-col justify-center items-center gap-y-2 py-5">
        <div className="grid grid-cols-3 gap-2">
          {data.map((d, i) => {
            return (
              <div
                onClick={(e) => toggle(e, i)}
                key={i}
                className={`${d === "x" ? "text-emerald-400" : "text-orange-300"} flex justify-center items-center text-5xl bg-slate-800 rounded-md h-[100px] w-[100px] md:h-[160px] md:w-[160px]`}
              >
                {d}
              </div>
            );
          })}
        </div>
      </div>
      <div className="flex justify-center">
        <button
          onClick={resetHandler}
          className="flex px-7 py-3 bg-slate-800 text-emerald-400 rounded-3xl"
        >
          Reset
        </button>
      </div>
    </div>
  );
}

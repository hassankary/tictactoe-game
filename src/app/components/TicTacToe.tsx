"use client";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function TicTacToe() {
  const [count, setCount] = useState<number>(0);
  const [lock, setLock] = useState<boolean>(false);
  const [data, setData] = useState<string[]>([
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
  ]);

  //  [0, 1, 2]
  //  [3, 4, 5]
  //  [6, 7, 8]

  useEffect(() => {
    console.log("data =>", data);
    console.log("lock =>", lock);
    if (data[0] === data[1] && data[1] === data[2] && data[2] !== "") {
      won(data[0]);
    } else if (data[3] === data[4] && data[4] === data[5] && data[5] !== "") {
      won(data[3]);
    } else if (data[6] === data[7] && data[7] === data[8] && data[8] !== "") {
      won(data[6]);
    } else if (data[0] === data[3] && data[3] === data[6] && data[6] !== "") {
      won(data[0]);
    } else if (data[1] === data[4] && data[4] === data[7] && data[7] !== "") {
      won(data[1]);
    } else if (data[2] === data[5] && data[5] === data[8] && data[8] !== "") {
      won(data[2]);
    } else if (data[0] === data[4] && data[4] === data[8] && data[8] !== "") {
      won(data[0]);
    } else if (data[2] === data[4] && data[4] === data[6] && data[6] !== "") {
      won(data[2]);
    }
  }, [data, lock]);

  const toggle = (e: React.MouseEvent<HTMLDivElement>, num: number) => {
    e.preventDefault();
    if (lock) {
      return;
    }

    const newData = data.map((d, i) =>
      i === num && d === "" ? (count % 2 === 0 ? "x" : "o") : d
    );

    setData(newData);
    setCount(count + 1);
  };

  const resetHandler = () => {
    const filteredData = data.map((d, i) => {
      return "";
    });
    setData(filteredData);
    setCount(0);
    setLock(false);
  };

  const won = (winner: string) => {
    console.log("winner =>", winner);
    setLock(true);
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
                className={`${
                  d === "x" ? "text-emerald-400" : "text-orange-300"
                } flex justify-center items-center text-5xl bg-slate-800 rounded-md h-[100px] w-[100px] md:h-[160px] md:w-[160px] transition-all duration-500 ease-in-out`}
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

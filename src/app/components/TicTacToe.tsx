"use client";
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
  const [dataWin, setDataWin] = useState<string[]>([]);
  const [theWinner, setTheWinner] = useState<string>("");

  useEffect(() => {
    if (data[0] === data[1] && data[1] === data[2] && data[2] !== "") {
      won(data[0]);
      setDataWin(["0", "1", "2"]);
    } else if (data[3] === data[4] && data[4] === data[5] && data[5] !== "") {
      won(data[3]);
      setDataWin(["3", "4", "5"]);
    } else if (data[6] === data[7] && data[7] === data[8] && data[8] !== "") {
      won(data[6]);
      setDataWin(["6", "7", "8"]);
    } else if (data[0] === data[3] && data[3] === data[6] && data[6] !== "") {
      won(data[0]);
      setDataWin(["0", "3", "6"]);
    } else if (data[1] === data[4] && data[4] === data[7] && data[7] !== "") {
      won(data[1]);
      setDataWin(["1", "4", "7"]);
    } else if (data[2] === data[5] && data[5] === data[8] && data[8] !== "") {
      won(data[2]);
      setDataWin(["2", "5", "8"]);
    } else if (data[0] === data[4] && data[4] === data[8] && data[8] !== "") {
      won(data[0]);
      setDataWin(["0", "4", "8"]);
    } else if (data[2] === data[4] && data[4] === data[6] && data[6] !== "") {
      won(data[2]);
      setDataWin(["2", "4", "6"]);
    } else if (data.every((d) => d !== "")) {
      draw("draw");
      setLock(true);
    }
  }, [data, lock]);

  const toggle = (e: React.MouseEvent<HTMLDivElement>, num: number) => {
    e.preventDefault();
    if (lock) {
      return;
    }

    const newData = data.map((d, i) =>
      i === num && d === "" ? (count % 2 === 0 ? "X" : "O") : d
    );

    setData(newData);
    setCount(count + 1);
  };

  const resetHandler = () => {
    const filteredData = data.map(() => "");
    setData(filteredData);
    setCount(0);
    setLock(false);
    setDataWin([]);
    setTheWinner("");
  };

  const won = (winner: string) => {
    setLock(true);
    setTheWinner(winner);
  };

  const draw = (draw: string) => {
    setLock(true);
    setTheWinner(draw);
  };

  return (
    <div className="h-screen flex flex-col justify-center font-sans bg-gray-900">
      <div className="flex flex-col justify-center items-center px-[5%] font-bold text-white text-center text-2xl space-y-2">
        <h1 className="text-[28px]">
          Tic Tac Toe Game by{" "}
          <span className="text-emerald-400">Hassankary</span>
        </h1>
        {theWinner !== "" && theWinner !== "draw" ? (
          <h1>
            &quot;Congratulations to{" "}
            <span className="text-emerald-400 transition-all duration-500 ease-in-out">
              {theWinner}
            </span>
            &quot;
          </h1>
        ) : theWinner === "draw" ? (
          <h1 className="text-emerald-400 uppercase transition-all duration-500 ease-in-out">
            &quot;{theWinner}&quot;
          </h1>
        ) : null}
      </div>
      <div className="flex flex-col justify-center items-center gap-y-2 py-5">
        <div className="grid grid-cols-3 gap-2">
          {data.map((d, i) => {
            return (
              <div
                onClick={(e) => toggle(e, i)}
                key={i}
                className={`${
                  d === "X" ? "text-emerald-400" : "text-orange-300"
                } ${
                  dataWin.includes(i.toString()) ? "bg-red-500" : "bg-slate-800"
                } flex justify-center items-center text-5xl rounded-md h-[100px] w-[100px] md:h-[160px] md:w-[160px] transition-all duration-500 ease-in-out`}
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
          className="flex px-7 py-3 font-semibold bg-slate-800 text-emerald-400 rounded-3xl active:bg-slate-700 lg:hover:bg-slate-700 active:scale-95 transition-all "
        >
          Reset
        </button>
      </div>
    </div>
  );
}

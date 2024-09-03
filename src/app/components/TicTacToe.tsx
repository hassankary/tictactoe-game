"use client";
import { useEffect, useState } from "react";
import { RiCloseLargeFill } from "react-icons/ri";
import { FaRegCircle } from "react-icons/fa";

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
      <div className="flex flex-col justify-center items-center px-[5%] font-bold text-white text-center text-2xl space-y-2 transition-all duration-500 ease-in-out">
        <h1 className="text-[28px]">
          Tic Tac Toe Game by{" "}
          <span className="text-emerald-400">Hassankary</span>
        </h1>
      </div>
      <div className="flex flex-col justify-center items-center gap-y-2 py-5">
        <div
          className={`${
            lock ? "opacity-100  bg-opacity-50 z-20" : "opacity-0"
          } absolute flex w-full h-full max-w-[316px] max-h-[316px] md:max-w-[496px] md:max-h-[496px] bg-black rounded-md transition-all duration-1000 ease-in-out"`}
        >
          {theWinner !== "" && theWinner !== "draw" ? (
            <div
              className={`${
                theWinner === "X" ? "text-emerald-400" : "text-orange-300"
              } w-full flex flex-col justify-center items-center gap-4 text-8xl md:text-9xl text-center my-auto font-semibold transition-all duration-1000 ease-in-out`}
            >
              {theWinner === "X" ? <RiCloseLargeFill /> : <FaRegCircle />}{" "}
              <span className="uppercase text-5xl md:text-7xl">Win</span>
            </div>
          ) : null}
          {theWinner === "draw" ? (
            <div className="w-full flex flex-col justify-center items-center gap-4 text-8xl md:text-9xl text-center my-auto font-semibold transition-all duration-1000 ease-in-out">
              <div className="flex justify-center items-center">
                <RiCloseLargeFill className="text-emerald-400" />
                <FaRegCircle className="text-orange-300" />
              </div>
              <span className="uppercase text-5xl md:text-7xl text-white">{theWinner}</span>
            </div>
          ) : null}
        </div>
        <div className="grid grid-cols-3 gap-2 max-w-[496px] z-10">
          {data.map((d, i) => {
            return (
              <div
                onClick={(e) => toggle(e, i)}
                key={i}
                className={`${
                  d === "X"
                    ? "text-emerald-400"
                    : d === "O"
                    ? "text-orange-300"
                    : "text-slate-500"
                } 
                ${
                  dataWin.includes(i.toString()) ? "bg-red-500" : "bg-slate-800"
                } flex justify-center items-center text-5xl md:text-7xl rounded-md h-[100px] w-[100px] md:h-[160px] md:w-[160px] transition-all duration-500 ease-in-out`}
              >
                {d === "X" ? <RiCloseLargeFill /> : null}
                {d === "O" ? <FaRegCircle /> : null}
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

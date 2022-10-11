import { readFile, writeFile } from "fs/promises";
import config from "../config";
import { resolve } from "path";

const readGame = (game: string) =>
  readFile(resolve(config.dataPath, game)).then((buffer) => {
    return JSON.parse(buffer.toString()) as UMDGameItem[];
  });

const writeGame = (game: string, umdGame: UMDGameItem[]) => {
  return writeFile(resolve(config.dataPath, game), JSON.stringify(umdGame));
};

// These may be caused by the wrong hand input, correct these after fetching data
readGame("L001_S007_0010_02A.json").then((game) => {
  // B0: 0.4 -> -0.4
  game[game.length - 1].args[3] = "-0.4";
  writeGame("L001_S007_0010_02A.json", game);
});

readGame("L001_S010_0015_02A.json").then((game) => {
  // A0: 58.0 -> 38.0
  // C0: 18.0 -> 38.0
  game[game.length - 1].args[1] = "38.0";
  game[game.length - 1].args[3] = "38.0";
  writeGame("L001_S010_0015_02A.json", game);
});

readGame("L001_S010_0080_02A.json").then((game) => {
  // B0: -42.8 -> -72.8
  // D0: 26.4 -> 76.4
  game[game.length - 1].args[1] = "76.4";
  game[game.length - 1].args[7] = "-72.8";
  writeGame("L001_S010_0080_02A.json", game);
});

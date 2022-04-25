import { readdirSync, readFileSync } from "fs";
import path from "path";
import { storeGame } from "./game";

const DATA_DIRECTORY = path.resolve("./data");

const games = readdirSync(DATA_DIRECTORY);

for (const game of games) {
  const umdGame = JSON.parse(
    readFileSync(path.resolve(DATA_DIRECTORY, game)).toString()
  ) as UMDGameItem[];
  const seasonCode = game.split("_")[1];
  storeGame(umdGame, seasonCode);
}

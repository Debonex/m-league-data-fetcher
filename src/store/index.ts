import { readdirSync, readFileSync } from "fs";
import path from "path";
import { storeGame } from "./game";

const DATA_DIRECTORY = path.resolve("./data");

const games = readdirSync(DATA_DIRECTORY);

console.time("store all games");
for (let i = 0; i < games.length; i++) {
  const game = games[i];
  const umdGame = JSON.parse(
    readFileSync(path.resolve(DATA_DIRECTORY, game)).toString()
  ) as UMDGameItem[];
  const seasonCode = game.split("_")[1];
  storeGame(umdGame, seasonCode);
  console.log(`${i + 1}/${games.length} : ${game}`);
}
console.timeLog("store all games");

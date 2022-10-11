import { readdirSync, readFileSync } from "fs";
import path from "path";
import config from "../config";
import { storeGame } from "./game";

const games = readdirSync(config.dataPath);

console.time("store all games");
for (let i = 0; i < games.length; i++) {
  const game = games[i];
  const umdGame = JSON.parse(
    readFileSync(path.resolve(config.dataPath, game)).toString()
  ) as UMDGameItem[];
  const seasonCode = game.split("_")[1];
  storeGame(umdGame, seasonCode);
  console.log(`${i + 1}/${games.length} : ${game}`);
}
console.timeLog("store all games");

import axios from "axios";
import { parse } from "node-html-parser";
import sleep from "../utils/sleep";
import { writeFile, mkdirSync, existsSync, readdirSync } from "fs";
import path from "path";
import password from "./password";

const SEASON_LIST = [
  "games/2018-season",
  "games/2019-season",
  "games/2020-season",
  "games/2021-season",
  // current season (2022)
  "games",
];
const TARGET_DIRECTORY = path.resolve("./data");
const BASE_URL = "https://m-league.jp";
const GAME_URL = "https://viewer.ml-log.jp/web/viewer";
const GAME_DATA_REG = /UMP_PLAYER\.init\(true, true, '(.+)', autoplay\);/;
const REQUEST_GAP = 500; // The frequency of requests is about REQUEST_GAP/SEASON_LIST.length (ms)

// set timeout as 30s for every request
const req = axios.create({
  timeout: 30000,
});

// create directory for data storage
if (!existsSync(TARGET_DIRECTORY)) {
  mkdirSync(TARGET_DIRECTORY);
}

const fetchedGames = readdirSync(TARGET_DIRECTORY);

// multiple seasons in parallel requests, for one season, every match(半荘) is in sequence
for (const season of SEASON_LIST) {
  console.time(season);
  req
    .get<string>(`${BASE_URL}/${season}`)
    .then(async (res) => {
      const seasonPage = parse(res.data);
      const gameIdList = seasonPage
        .querySelectorAll(".js-viewer-form")
        .map((item) => item.getAttribute("data-game-id"));
      for (const gameId of gameIdList) {
        if (!gameId || fetchedGames.includes(`${gameId}.json`)) continue;
        const formData = new URLSearchParams();
        formData.append("password", password(new Date()));
        const gameInfo = await req.post<string>(
          `${GAME_URL}?gameid=${gameId}`,
          formData,
          {
            headers: {
              origin: "https://m-league.jp",
              referer: "https://m-league.jp/",
            },
          }
        );
        const regMatches = gameInfo.data.match(GAME_DATA_REG);
        if (regMatches) {
          writeFile(
            path.resolve(TARGET_DIRECTORY, `${gameId}.json`),
            regMatches[1],
            { encoding: "utf-8" },
            () => {
              console.log(`fetch information about ${gameId} finished.`);
            }
          );
        }
        await sleep(REQUEST_GAP);
      }
      console.timeLog(season, `fetch games info successfully.`);
    })
    .catch((e) => {
      console.timeLog(season, `error occurs while fetching games`, e);
    });
}

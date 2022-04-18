import { getSeasonIdBySeasonCode } from "./database";
import { resolveKyokuStart } from "./game_kyoku";
import { resolvePlayer } from "./game_player";

/**
 * resolve game cmd list and store resolved game info into database
 * @param umdGame game cmd list
 * @param seasonCode season code
 */
export function storeGame(umdGame: UMDGameItem[], seasonCode: string) {
  const game: Game = {
    players: [],
    bon: 0,
    richibo: 0,
    east: "",
    dora: [],
    doraPointer: [],
  };
  const seasonProMap: Record<string, SeasonPro> = {};
  const seasonId = getSeasonIdBySeasonCode(seasonCode) as number;

  for (let i = 0; i < umdGame.length; ) {
    const item = umdGame[i];
    if (item.cmd === "player") {
      resolvePlayer(item, seasonId, game, seasonProMap);
      i++;
    } else if (item.cmd === "kyokustart") {
      resolveKyokuStart(umdGame.slice(i, i + 23), game, seasonProMap);
      // kyokustart, point*4, dice, dora, haipai*16
      i += 23;
    } else if (item.cmd === "gameend") {
      resolveGameEnd(item, seasonProMap);
      i++;
    } else {
      i++;
    }
  }
}

/**
 * resolve game end cmd
 * @param gameEnd game end cmd
 * @param seasonProMap season pro map
 */
const resolveGameEnd = (
  gameEnd: UMDGameItem,
  seasonProMap: Record<string, SeasonPro>
) => {
  const rankPoints = [50, 10, -10, -30];
  const winds = { A0: "east", B0: "south", C0: "west", D0: "north" };
  const ranks = ["first", "second", "third", "fourth"];

  for (let i = 0; i < 4; i++) {
    const code = gameEnd.args[i * 2] as keyof typeof winds;
    const point = Number(gameEnd.args[i * 2 + 1]);
    const rankPoint = rankPoints[i];
    const scorePoint = Number((point - rankPoints[i]).toFixed(1));
    const seasonPro = seasonProMap[code];
    // point
    seasonPro.rank_point += rankPoint;
    seasonPro.score_point += scorePoint;

    // rank
    const key = `${ranks[i]}_${winds[code]}_num` as keyof SeasonPro;
    seasonPro[key]++;

    // score
    const score = 30000 + scorePoint * 1000;
    if (seasonPro.game_highest_score === null) {
      seasonPro.game_highest_score = score;
    } else {
      seasonPro.game_highest_score = Math.max(
        seasonPro.game_highest_score,
        score
      );
    }
    if (seasonPro.game_lowest_score === null) {
      seasonPro.game_lowest_score = score;
    } else {
      seasonPro.game_lowest_score = Math.min(
        seasonPro.game_lowest_score,
        score
      );
    }
  }
};

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
    east: "A0",
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
  seasonProMap: Record<Code, SeasonPro>
) => {
  const rankPoints = [50, 10, -10, -30];
  const winds = { A0: "east", B0: "south", C0: "west", D0: "north" };
  const ranks = ["first", "second", "third", "fourth"];

  const pointMap: Partial<Record<Code, number>> = {};

  for (let i = 0; i < 4; i++) {
    const code = gameEnd.args[i * 2] as Code;
    const point = Number(gameEnd.args[i * 2 + 1]);
    pointMap[code] = point;
  }

  for (let i = 8; i < 12; i++) {
    const arg = gameEnd.args[i];
    const code = arg.slice(0, 2) as Code;
    // 0,1,2,3
    const rank = Number(arg.slice(-1));
    const point = pointMap[code] as number;
    const seasonPro = seasonProMap[code];

    // point
    const rankPoint = rankPoints[rank];
    const scorePoint = Number((point - rankPoints[rank]).toFixed(1));
    seasonPro.rank_point += rankPoint;
    seasonPro.score_point += scorePoint;

    // rank
    const key = `${ranks[rank]}_${winds[code]}_num` as keyof SeasonPro;
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

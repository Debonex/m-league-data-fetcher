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
  };
  const seasonProMap: Record<string, SeasonPro> = {};
  const seasonId = getSeasonIdBySeasonCode(seasonCode) as number;

  for (const item of umdGame) {
    if (item.cmd === "player") {
      resolvePlayer(item, seasonId, game, seasonProMap);
    } else if (item.cmd === "kyokustart") {
      resolveKyokuStart(item, game, seasonProMap);
    }
  }
}

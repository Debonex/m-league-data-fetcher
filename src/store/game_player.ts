import { seasonPro } from "./constructors";
import {
  getProIdByProName,
  getSeasonProByProIdAndSeasonId,
  getTeamIdByTeamCode,
} from "./database";

/**
 * resolve player cmd
 * @param item cmd item
 * @param seasonId season id
 * @param game current game info
 * @param seasonProMap season pro map
 */
export const resolvePlayer = (
  item: UMDGameItem,
  seasonId: number,
  game: Game,
  seasonProMap: Record<string, SeasonPro>
) => {
  const code = item.args[0];
  const proName = item.args[1].replace(" ", "");
  const teamCode = item.args[3];
  // init game players
  game.players.push({
    name: proName,
    code: code,
    point: 0,
    status: "menzen",
    tenpai: false,
    sute: [],
    tehai: [],
    renchan: 0,
  });
  // init season pro metadata
  const proId = getProIdByProName(proName) as number;
  const teamId = getTeamIdByTeamCode(teamCode) as number;
  const storedSeasonPro = getSeasonProByProIdAndSeasonId(proId, seasonId);
  if (storedSeasonPro) {
    seasonProMap[code] = storedSeasonPro;
  } else {
    seasonProMap[code] = seasonPro(seasonId, proId, teamId);
  }

  // start game from east, south, west, north
  seasonProMap[code].game_num += 1;
  switch (code) {
    case "A0":
      seasonProMap[code].game_east_start_num += 1;
      break;
    case "B0":
      seasonProMap[code].game_south_start_num += 1;
      break;
    case "C0":
      seasonProMap[code].game_west_start_num += 1;
      break;
    case "D0":
      seasonProMap[code].game_north_start_num += 1;
      break;
    default:
      break;
  }
};

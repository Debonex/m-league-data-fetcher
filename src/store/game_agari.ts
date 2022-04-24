import { getPoint } from "./util";

/**
 * resolve agari cmd list (1 agari item, 2 or 4 point cmd )
 * @param agariCmds
 * @param game
 * @param seasonProMap
 */
export const resolveAgari = (
  agariCmds: UMDGameItem[],
  game: Game,
  seasonProMap: Record<string, SeasonPro>
) => {
  const agariCmd = agariCmds[0];

  const ron = agariCmd.args[0].startsWith("ron=");

  const codeFrom = ron ? 1 : 0;
  const code = agariCmd.args[codeFrom] as Code;
  const player = game.players.find((player) => player.code === code) as Player;
  const seasonPro = seasonProMap[player.code] as SeasonPro;

  const agariPoint = getPoint(agariCmd.args[codeFrom + 1], game.east === code);

  // houjuu count and score
  if (ron) {
    const houjuuSeasonPro = seasonProMap[game.lastSuteBy];
    const houjuuPlayer = game.players.find(
      (player) => player.code === game.lastSuteBy
    ) as Player;

    //TODO houjuu
  }

  // agari count and score
  if (player.status === "menzen") {
    seasonPro.agari_dama_score += agariPoint;
    if (ron) {
      seasonPro.agari_dama_ron_num += 1;
    } else {
      seasonPro.agari_dama_tsumo_num += 1;
    }
  } else if (player.status === "furo") {
    seasonPro.agari_furo_score += agariPoint;
    if (ron) {
      seasonPro.agari_furo_ron_num += 1;
    } else {
      seasonPro.agari_furo_tsumo_num += 1;
    }
  } else {
    seasonPro.agari_richi_score += agariPoint;
    if (ron) {
      seasonPro.agari_richi_ron_num += 1;
    } else {
      seasonPro.agari_richi_tsumo_num += 1;
    }
  }

  // count yaku
  const yakuObject: Record<string, number> = seasonProMap[code].yaku
    ? JSON.parse(seasonProMap[code].yaku)
    : {};
  for (let i = codeFrom + 3; i < agariCmd.args.length; i += 2) {
    const yaku = agariCmd.args[i];
    if (yaku === "裏ドラ" || yaku === "ドラ" || yaku === "赤") {
      yakuObject[yaku] = (yakuObject[yaku] ?? 0) + Number(agariCmd.args[i + 1]);
    } else {
      yakuObject[yaku] = (yakuObject[yaku] ?? 0) + 1;
    }
  }
  seasonProMap[code].yaku = JSON.stringify(yakuObject);
};

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

  const codeFrom = agariCmd.args.findIndex((arg) =>
    ["A0", "B0", "C0", "D0"].includes(arg)
  );
  const code = agariCmd.args[codeFrom] as Code;
  // agari player
  const player = game.players.find((player) => player.code === code) as Player;
  // agari season pro
  const seasonPro = seasonProMap[player.code] as SeasonPro;

  // agari yaku
  const agariYaku: Record<string, number> = {};
  for (let i = codeFrom + 3; i < agariCmd.args.length; i += 2) {
    const yaku = agariCmd.args[i];
    if (yaku.match(/[東南西北]/)) {
      const windHanji = yaku.slice(-1);
      if (yaku.startsWith("ダブ")) {
        agariYaku[`自风${windHanji}`] = 1;
        agariYaku[`场风${windHanji}`] = 1;
      } else {
        agariYaku[
          `${game.wind === player.wind ? "场风" : "自风"}${windHanji}`
        ] = 1;
      }
    } else {
      agariYaku[yaku] = parseInt(agariCmd.args[i + 1]);
    }
  }

  const agariScoreStr = agariCmd.args[codeFrom + 1];
  const agariScore = getPoint(agariScoreStr, game.east === code);

  // houjuu count and score
  if (ron) {
    const houjuuSeasonPro = seasonProMap[game.lastSute.code];
    const houjuuPlayer = game.players.find(
      (player) => player.code === game.lastSute.code
    ) as Player;

    if (player.status === "menzen") {
      houjuuSeasonPro.houjuu_dama_score += agariScore;
      if (houjuuPlayer.status === "menzen") {
        houjuuSeasonPro.houjuu_dama_menzen_num += 1;
      } else if (houjuuPlayer.status === "furo") {
        houjuuSeasonPro.houjuu_dama_furo_num += 1;
      } else {
        houjuuSeasonPro.houjuu_dama_richi_num += 1;
      }
    } else if (player.status === "furo") {
      houjuuSeasonPro.houjuu_furo_score += agariScore;
      if (houjuuPlayer.status === "menzen") {
        houjuuSeasonPro.houjuu_furo_menzen_num += 1;
      } else if (houjuuPlayer.status === "furo") {
        houjuuSeasonPro.houjuu_furo_furo_num += 1;
      } else {
        houjuuSeasonPro.houjuu_furo_richi_num += 1;
      }
    } else {
      houjuuSeasonPro.houjuu_richi_score += agariScore;
      if (agariYaku["一発"]) {
        houjuuSeasonPro.houjuu_richi_ippatsu_num += 1;
      }
      if (houjuuPlayer.status === "menzen") {
        houjuuSeasonPro.houjuu_richi_menzen_num += 1;
      } else if (houjuuPlayer.status === "furo") {
        houjuuSeasonPro.houjuu_richi_furo_num += 1;
      } else {
        houjuuSeasonPro.houjuu_richi_richi_num += 1;
      }
    }
  }

  // agari turn count and score
  seasonPro.agari_turn_num += player.sute.length + 1;
  if (player.status === "menzen") {
    seasonPro.agari_dama_score += agariScore;
    if (ron) {
      seasonPro.agari_dama_ron_num += 1;
    } else {
      seasonPro.agari_dama_tsumo_num += 1;
    }
  } else if (player.status === "furo") {
    seasonPro.agari_furo_score += agariScore;
    if (ron) {
      seasonPro.agari_furo_ron_num += 1;
    } else {
      seasonPro.agari_furo_tsumo_num += 1;
    }
  } else {
    seasonPro.agari_richi_score += agariScore;
    if (ron) {
      seasonPro.agari_richi_ron_num += 1;
      if (agariYaku["一発"]) {
        seasonPro.agari_richi_ron_ippatsu_num += 1;
      }
    } else {
      seasonPro.agari_richi_tsumo_num += 1;
      if (agariYaku["一発"]) {
        seasonPro.agari_richi_tsumo_ippatsu_num += 1;
      }
      // 炸庄
      if (isNaN(Number(agariScoreStr)) && game.east !== code) {
        seasonProMap[game.east].blown_num += 1;
        seasonProMap[game.east].blown_score += agariScore;
      }
    }
  }

  // count yaku
  const yakuObject: Record<string, number> = seasonProMap[code].yaku
    ? JSON.parse(seasonProMap[code].yaku)
    : {};
  for (const yaku in agariYaku) {
    if (yaku === "裏ドラ" || yaku === "ドラ" || yaku === "赤") {
      yakuObject[yaku] = (yakuObject[yaku] ?? 0) + agariYaku[yaku];
    } else {
      yakuObject[yaku] = (yakuObject[yaku] ?? 0) + 1;
    }
  }
  seasonProMap[code].yaku = JSON.stringify(yakuObject);
};

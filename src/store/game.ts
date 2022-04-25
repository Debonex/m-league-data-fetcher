import { seasonProPro } from "./constructors";
import {
  getProIdByProName,
  getSeasonIdBySeasonCode,
  getSeasonProPro,
  insertSeasonPro,
  insertSeasonProPro,
  updateSeasonPro,
  updateSeasonProPro,
} from "./database";
import { resolveAgari } from "./game_agari";
import { resolveKyokuStart } from "./game_kyoku";
import { resolvePlayer } from "./game_player";
import { resolveRichi } from "./game_richi";

/**
 * resolve game cmd list and store resolved game info into database
 * @param umdGame game cmd list
 * @param seasonCode season code
 */
export function storeGame(umdGame: UMDGameItem[], seasonCode: string) {
  const game: Game = {
    id: "",
    players: [],
    bon: 0,
    richibo: 0,
    east: "A0",
    dora: [],
    doraPointer: [],
    lastSute: {
      code: "",
      richi: false,
    },
    wind: "1z",
  };
  // init season pro map later in player cmd resolving
  const seasonProMap = {} as Record<Code, SeasonPro>;
  const seasonId = getSeasonIdBySeasonCode(seasonCode) as number;

  for (let i = 0; i < umdGame.length; i++) {
    const item = umdGame[i];
    // gamestart
    if (item.cmd === "gamestart") {
      game.id = item.args[0].slice(3);
    }
    // player
    else if (item.cmd === "player") {
      resolvePlayer(item, seasonId, game, seasonProMap);
    }
    // kyokustart
    else if (item.cmd === "kyokustart") {
      resolveKyokuStart(umdGame.slice(i, i + 23), game, seasonProMap);
      // skip point*4, dice, dora, haipai*16
      i += 22;
    }
    // gameend
    else if (item.cmd === "gameend") {
      resolveGameEnd(item, seasonProMap, game, seasonId);
    }
    // tsumo
    else if (item.cmd === "tsumo") {
      resolveTsumo(item, game);
    }
    // sutehai
    else if (item.cmd === "sutehai") {
      resolveSutehai(item, game);
    }
    // chi pon kan ron richi tsumo tenpai noten
    else if (item.cmd === "say") {
      const sayType = item.args[1] as SayType;
      // furo
      if (
        sayType === "chi" ||
        sayType === "pon" ||
        (sayType === "kan" && umdGame[i + 1].args.length > 2)
      ) {
        resolveFuro(umdGame.slice(i, i + 2), game, seasonProMap);
        // skip open cmd
        i++;
      }
      // richi
      else if (sayType === "richi") {
        resolveRichi(umdGame.slice(i, i + 3), game, seasonProMap);
      }
      // ryukyoku
      else if (sayType === "noten" || sayType === "tenpai") {
        resolveRyukyokuSay(item, game, seasonProMap);
      }
    }
    // kan dora
    else if (item.cmd === "dora") {
      game.dora.push(item.args[0] as Pai);
      game.doraPointer.push(item.args[1] as Pai);
    }
    // agari
    else if (item.cmd === "agari") {
      resolveAgari(umdGame.slice(i, i + 4), game, seasonProMap);
    }
  }

  // write season pro info into database
  let code: Code;
  for (code in seasonProMap) {
    if (seasonProMap[code].id) {
      updateSeasonPro(seasonProMap[code]);
    } else {
      insertSeasonPro(seasonProMap[code]);
    }
  }
}

/**
 * resolve game end cmd
 * @param gameEnd game end cmd
 * @param seasonProMap season pro map
 * @param seasonId season id
 */
const resolveGameEnd = (
  gameEnd: UMDGameItem,
  seasonProMap: Record<Code, SeasonPro>,
  game: Game,
  seasonId: number
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

  // season_pro_pro
  const players = game.players;
  for (let i = 0; i < players.length; i++) {
    for (let j = i + 1; j < players.length; j++) {
      const player1 = players[i],
        player2 = players[j],
        point1 = pointMap[player1.code] as number,
        point2 = pointMap[player2.code] as number;
      const diffPoint = point1 - point2;
      const pro1Id = getProIdByProName(player1.name);
      const pro2Id = getProIdByProName(player2.name);
      if (pro1Id && pro2Id) {
        const seasonPro1Pro2 = getSeasonProPro(seasonId, pro1Id, pro2Id);
        const seasonPro2Pro1 = getSeasonProPro(seasonId, pro2Id, pro1Id);
        if (seasonPro1Pro2) {
          seasonPro1Pro2.point += diffPoint;
          updateSeasonProPro(seasonPro1Pro2);
        } else {
          const record = seasonProPro(seasonId, pro1Id, pro2Id);
          record.point += diffPoint;
          insertSeasonProPro(record);
        }
        if (seasonPro2Pro1) {
          seasonPro2Pro1.point -= diffPoint;
          updateSeasonProPro(seasonPro2Pro1);
        } else {
          const record = seasonProPro(seasonId, pro2Id, pro1Id);
          record.point -= diffPoint;
          insertSeasonProPro(record);
        }
      }
    }
  }
};

/**
 * resolve sutehai cmd (not include richi sutehai)
 * @param sutehaiCmd sutehai cmd
 * @param game current game info
 */
const resolveSutehai = (sutehaiCmd: UMDGameItem, game: Game) => {
  const player = game.players.find(
    (player) => player.code === sutehaiCmd.args[0]
  ) as Player;
  game.lastSute = {
    code: player.code,
    richi: sutehaiCmd.args.includes("richi"),
  };
  const sutehai = sutehaiCmd.args[1] as Pai;
  player.sute.push(sutehai);
  // tegiri
  if (sutehaiCmd.args.length === 2) {
    const idx = player.tehai.findIndex((pai) => pai === sutehai);
    player.tehai.splice(idx, 1);
  }
};

/**
 * resolve tsumo cmd
 * @param tsumoCmd tsumo cmd
 * @param game current game info
 */
const resolveTsumo = (tsumoCmd: UMDGameItem, game: Game) => {
  const player = game.players.find(
    (player) => player.code === tsumoCmd.args[0]
  ) as Player;
  player.tehai.push(tsumoCmd.args[2] as Pai);
};

/**
 * resolve furo cmd (chi, pon, min kan)
 * @param furoCmds furo cmd and open cmd
 * @param game current game info
 * @param seasonProMap season pro map
 */
const resolveFuro = (
  furoCmds: UMDGameItem[],
  game: Game,
  seasonProMap: Record<Code, SeasonPro>
) => {
  const code = furoCmds[0].args[0] as Code;
  const player = game.players.find((player) => player.code === code);
  if (player && player.status === "menzen") {
    player.status = "furo";
    seasonProMap[code].furo_num += 1;
  }
};

/**
 * resolve ryukyoku say cmd (tenpai noten)
 * @param sayCmd tenpai or noten say
 * @param game current game info
 * @param seasonProMap season pro map
 */
const resolveRyukyokuSay = (
  sayCmd: UMDGameItem,
  game: Game,
  seasonProMap: Record<Code, SeasonPro>
) => {
  const code = sayCmd.args[0] as Code;
  const tenpai = sayCmd.args[1] as SayType;
  const player = game.players.find((player) => player.code === code) as Player;
  const seasonPro = seasonProMap[code] as SeasonPro;

  if (player.status === "menzen") {
    if (tenpai === "noten") {
      seasonPro.ryukyoku_noten_menzen_num += 1;
    } else if (tenpai === "tenpai") {
      seasonPro.ryukyoku_tenpai_menzen_num += 1;
    }
  } else if (player.status === "furo") {
    if (tenpai === "noten") {
      seasonPro.ryukyoku_noten_furo_num += 1;
    } else if (tenpai === "tenpai") {
      seasonPro.ryukyoku_tenpai_furo_num += 1;
    }
  } else if (player.status === "richi" || player.status === "richi_chased") {
    // noten richi is possible
    if (tenpai === "noten") {
      seasonPro.ryukyoku_noten_richi_num += 1;
    } else if (tenpai === "tenpai") {
      seasonPro.ryukyoku_tenpai_richi_num += 1;
    }
  }
};

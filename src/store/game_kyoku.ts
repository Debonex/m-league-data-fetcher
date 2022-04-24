import { resolvePoint } from "./game_point";

/**
 * resolve kyoku start cmd
 * @param items items for kyoku start (kyokustart, point*4, dice, dora, haipai*16)
 * @param game current game info
 * @param seasonProMap season pro map
 */
export const resolveKyokuStart = (
  items: UMDGameItem[],
  game: Game,
  seasonProMap: Record<Code, SeasonPro>
) => {
  // resolve kyoku start
  const kyokuStart = items[0];
  const winds: Code[] = ["A0", "B0", "C0", "D0"];
  // renchan count
  game.players.forEach((player) => {
    // east
    if (player.code === kyokuStart.args[1]) {
      if (game.east === player.code) {
        player.renchan++;
      } else {
        player.renchan = 1;
      }
      seasonProMap[player.code].renchan_max_num = Math.max(
        player.renchan,
        seasonProMap[player.code].renchan_max_num
      );
    }
    // other
    else {
      player.renchan = 0;
    }
  });
  // initial kyoku
  game.east = kyokuStart.args[1] as Code;
  game.bon = Number(kyokuStart.args[2]);
  game.richibo = Number(kyokuStart.args[3]);
  game.dora = [];
  game.doraPointer = [];
  game.lastSuteBy = "";
  game.players.forEach((player) => {
    player.status = "menzen";
    player.tenpai = [];
    player.sute = [];
    player.tehai = [];
  });
  // count kyoku num for season pro
  const easeIdx = winds.indexOf(game.east);
  seasonProMap[winds[easeIdx]].kyoku_east_num += 1;
  seasonProMap[winds[(easeIdx + 1) % 4]].kyoku_south_num += 1;
  seasonProMap[winds[(easeIdx + 2) % 4]].kyoku_west_num += 1;
  seasonProMap[winds[(easeIdx + 3) % 4]].kyoku_north_num += 1;

  // resolve point
  for (let i = 1; i <= 4; i++) {
    resolvePoint(items[i], game);
  }

  // resolve dora
  const doraCmd = items[6];
  game.dora = [doraCmd.args[0] as Pai];
  game.doraPointer = [doraCmd.args[1] as Pai];

  // resolve haipai
  for (let i = 7; i < 23; i++) {
    const haipaiCmd = items[i];
    const player = game.players.find(
      (player) => player.code === haipaiCmd.args[0]
    );
    if (player) {
      const haiStr = haipaiCmd.args[1];
      for (let idx = 0; idx < haiStr.length; idx += 2) {
        player.tehai.push(haiStr.substring(idx, idx + 2) as Pai);
      }
    }
  }

  for (const player of game.players) {
    const seasonPro = seasonProMap[player.code] as SeasonPro;
    seasonPro.haipai_dora_num += player.tehai.filter(
      (hai) => hai === "5S" || hai === "5P" || hai === "5M"
    ).length;

    // TODO haipai shanten number
    seasonPro.shanten_num += 0;
  }
};

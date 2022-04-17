/**
 * resolve kyoku start cmd
 * @param item cmd item
 * @param game current game info
 * @param seasonProMap season pro map
 */
export const resolveKyokuStart = (
  item: UMDGameItem,
  game: Game,
  seasonProMap: Record<string, SeasonPro>
) => {
  const winds = ["A0", "B0", "C0", "D0"];

  // renchan count
  game.players.forEach((player) => {
    // east
    if (player.code === item.args[1]) {
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
  game.east = item.args[1];
  game.bon = Number(item.args[2]);
  game.richibo = Number(item.args[3]);
  game.players.forEach((player) => {
    player.status = "menzen";
    player.tenpai = false;
    player.sute = [];
    player.tehai = [];
  });

  // count kyoku num for season pro
  const easeIdx = winds.indexOf(game.east);
  seasonProMap[winds[easeIdx]].kyoku_east_num += 1;
  seasonProMap[winds[(easeIdx + 1) % 4]].kyoku_south_num += 1;
  seasonProMap[winds[(easeIdx + 2) % 4]].kyoku_west_num += 1;
  seasonProMap[winds[(easeIdx + 3) % 4]].kyoku_north_num += 1;
};

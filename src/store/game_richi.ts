import { doraCount } from "./util";

/**
 * resolve richi cmd items
 * @param items richi cmd items
 * @param game current game info
 * @param seasonProMap season pro map
 */
export const resolveRichi = (
  items: UMDGameItem[],
  game: Game,
  seasonProMap: Record<Code, SeasonPro>
) => {
  const richiCmd = items[0];
  const richiSutehai = items[1].args[1] as Pai;
  const player = game.players.find(
    (player) => player.code === richiCmd.args[0]
  ) as Player;
  const seasonPro = seasonProMap[player.code] as SeasonPro;

  // richi num
  seasonPro.richi_num += 1;
  const playerRichied = game.players.find(
    (player) => player.status === "richi"
  );
  if (playerRichied) {
    seasonPro.richi_chase_num += 1;
    seasonProMap[playerRichied.code].richi_chased_num += 1;
    playerRichied.status = "richi_chased";
  } else {
    seasonPro.richi_first_num += 1;
  }

  // aka richi
  if (["5M", "5S", "5P"].includes(richiSutehai)) {
    seasonPro.richi_aka_num += 1;
  }

  // richi turn
  seasonPro.richi_turn_num += player.sute.length + 1;

  // richi dora count
  seasonPro.richi_dora_num += doraCount(player.tehai, game);

  // TODO
  seasonPro.richi_furiten_num += 0;
  seasonPro.richi_good_num += 0;
  seasonPro.richi_stupid_num += 0;
  seasonPro.richi_han_num += 0;
  seasonPro.richi_machi_num += 0;
  seasonPro.richi_suji_num += 0;
};

/**
 * resolve point cmd
 * @param item point cmd item
 * @param game current game info
 */
export const resolvePoint = (item: UMDGameItem, game: Game) => {
  const player = game.players.find((player) => player.code === item.args[0]);
  if (!player) return;
  const match = item.args[1].match(/^([+=-])(\d+)$/);
  if (!match) return;
  const [, op, point] = match;
  switch (op) {
    case "+":
      player.point += Number(point);
      break;
    case "-":
      player.point -= Number(point);
      break;
    case "=":
      player.point = Number(point);
      break;
  }
};

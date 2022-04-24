/**
 * count dora for tehai
 * @param tehai tehai list
 * @param game current game info
 * @returns dora count
 */
export const doraCount = (tehai: Pai[], game: Game): number => {
  let count = 0;
  const akaList: Pai[] = ["5M", "5S", "5P"];
  for (const aka of akaList) {
    if (tehai.includes(aka)) {
      count += 1;
    }
  }
  for (const dora of game.dora) {
    count += tehai.filter((hai) => {
      return hai.toLocaleLowerCase() === dora;
    }).length;
  }
  return count;
};

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

/**
 * get point for agari point string
 * @param pointStr agari point string @example "満貫" @example "2600"
 * @param isEast is east player
 * @returns point number
 */
export const getPoint = (pointStr: string, isEast: boolean): number => {
  if (pointStr === "満貫") return isEast ? 12000 : 8000;
  if (pointStr === "跳満") return isEast ? 18000 : 12000;
  if (pointStr === "倍満") return isEast ? 24000 : 16000;
  if (pointStr === "三倍満") return isEast ? 32000 : 24000;
  if (pointStr === "役満") return isEast ? 48000 : 32000;
  return Number(pointStr);
};

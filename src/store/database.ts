import path from "path";
import Database from "better-sqlite3";

const DB_FILE = path.resolve("./sql/mleague.db");

const db = new Database(DB_FILE);

/**
 * get season pro by pro name and season code
 * @param proName pro name (no space) @example "小林剛"
 * @param seasonCode season code @example "S001"
 * @returns season pro object
 */
export const getSeasonProByProNameAndSeasonCode = (
  proName?: string,
  seasonCode?: string
): SeasonPro | undefined => {
  const proId = getProIdByProName(proName);

  const seasonId = getSeasonIdBySeasonCode(seasonCode);

  return getSeasonProByProIdAndSeasonId(proId, seasonId);
};

/**
 * get season pro by pro id and season id
 * @param proId pro id
 * @param seasonId season id
 * @returns season pro object
 */
export const getSeasonProByProIdAndSeasonId = (
  proId?: number,
  seasonId?: number
): SeasonPro | undefined => {
  return db
    .prepare("select * from season_pro where pro_id = ? and season_id = ?")
    .get(proId, seasonId);
};

/**
 * get pro id by pro name
 * @param proName pro name (no space) @example "小林剛"
 * @returns pro id
 */
export const getProIdByProName = (proName?: string): number | undefined => {
  return db.prepare("select id from pro where pro_name = ?").get(proName)
    ?.id as number;
};

/**
 * get season id by season code
 * @param seasonCode @example "S001"
 * @returns season id
 */
export const getSeasonIdBySeasonCode = (
  seasonCode?: string
): number | undefined => {
  return db
    .prepare("select id from season where season_code = ?")
    .get(seasonCode)?.id;
};

/**
 * get team code by team code
 * @param teamCode @example "T001"
 * @returns team id
 */
export const getTeamIdByTeamCode = (teamCode?: string): number | undefined => {
  return db.prepare("select id from team where team_code = ?").get(teamCode)
    ?.id;
};

/**
 * get season pro pro by season id, pro1 id, pro2 id
 * @param seasonId season id
 * @param pro1Id pro1 id
 * @param pro2Id pro2 id
 */
export const getSeasonProPro = (
  seasonId: number,
  pro1Id: number,
  pro2Id: number
): SeasonProPro | undefined => {
  return db
    .prepare(
      "select * from season_pro_pro where season_id = ? and pro_id = ? and pro2_id = ?"
    )
    .get(seasonId, pro1Id, pro2Id);
};

/**
 * update season pro pro by given item
 * @param seasonProPro
 */
export const updateSeasonProPro = (seasonProPro: SeasonProPro) => {
  db.prepare(
    "update season_pro_pro set point = ? where pro_id = ? and pro2_id = ? and season_id = ?"
  ).run(
    seasonProPro.point,
    seasonProPro.pro_id,
    seasonProPro.pro2_id,
    seasonProPro.season_id
  );
};

/**
 * insert season pro pro by given item
 * @param seasonProPro
 */
export const insertSeasonProPro = (seasonProPro: SeasonProPro) => {
  db.prepare(
    "insert into season_pro_pro (season_id, pro_id, pro2_id, point) values (?, ?, ?, ?)"
  ).run(
    seasonProPro.season_id,
    seasonProPro.pro_id,
    seasonProPro.pro2_id,
    seasonProPro.point
  );
};

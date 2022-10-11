import Database from "better-sqlite3";
import config from "../config";

const db = new Database(config.dbPath);

/**
 * get game by game start time
 * @param time time str
 * @returns game entity object
 */
export const getGameByTime = (time: string): GameEntity | undefined => {
  return db.prepare("select * from game where time = ?").get(time);
};

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
 * update season pro by given season pro object
 * @param seasonPro season pro object
 */
export const updateSeasonPro = (seasonPro: SeasonPro) => {
  const set = Object.keys(seasonPro)
    .filter((key) => !["id", "season_id", "pro_id", "team_id"].includes(key))
    .map((key) => `${key} = '${seasonPro[key as keyof SeasonPro]}'`);

  const sql = `update season_pro set ${set.join(",")} 
  where id = ${seasonPro.id} 
  and season_id = ${seasonPro.season_id} 
  and pro_id = ${seasonPro.pro_id}`;

  db.prepare(sql).run();
};

/**
 * insert season pro by given season pro object
 * @param seasonPro season pro object
 */
export const insertSeasonPro = (seasonPro: SeasonPro) => {
  const columns = Object.keys(seasonPro).filter((key) => key !== "id");

  const values = Object.keys(seasonPro)
    .filter((key) => key !== "id")
    .map((key) => `'${seasonPro[key as keyof SeasonPro]}'`);

  const sql = `insert into season_pro (${columns.join(",")})
              values (${values.join(",")})`;
  db.prepare(sql).run();
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
 * insert game entity by given item
 * @param game game entity
 */
export const insertGame = (game: GameEntity) => {
  db.prepare(
    "insert into game (time, pid_0, pid_1, pid_2, pid_3, pp_0, pp_1, pp_2, pp_3, team_id_0, team_id_1, team_id_2, team_id_3, season_id) \
    values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)"
  ).run(
    game.time,
    game.pid0,
    game.pid1,
    game.pid2,
    game.pid3,
    game.pp0,
    game.pp1,
    game.pp2,
    game.pp3,
    game.teamId0,
    game.teamId1,
    game.teamId2,
    game.teamId3,
    game.seasonId
  );
};

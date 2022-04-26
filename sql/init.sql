/*
 Navicat Premium Data Transfer

 Source Server         : mleague-local
 Source Server Type    : SQLite
 Source Server Version : 3035005
 Source Schema         : main

 Target Server Type    : SQLite
 Target Server Version : 3035005
 File Encoding         : 65001

 Date: 26/04/2022 15:13:03
*/

PRAGMA foreign_keys = false;

-- ----------------------------
-- Table structure for pro
-- ----------------------------
DROP TABLE IF EXISTS "pro";
CREATE TABLE "pro" (
  "id" INTEGER NOT NULL,
  "pro_name" TEXT,
  PRIMARY KEY ("id")
);

-- ----------------------------
-- Records of pro
-- ----------------------------
INSERT INTO "pro" VALUES (1, '多井隆晴');
INSERT INTO "pro" VALUES (2, '滝沢和典');
INSERT INTO "pro" VALUES (3, '佐々木寿人');
INSERT INTO "pro" VALUES (4, '朝倉康心');
INSERT INTO "pro" VALUES (5, '近藤誠一');
INSERT INTO "pro" VALUES (6, '園田賢');
INSERT INTO "pro" VALUES (7, '黒沢咲');
INSERT INTO "pro" VALUES (8, '前原雄大');
INSERT INTO "pro" VALUES (9, '鈴木たろう');
INSERT INTO "pro" VALUES (10, '松本吉弘');
INSERT INTO "pro" VALUES (11, '勝又健志');
INSERT INTO "pro" VALUES (12, '二階堂亜樹');
INSERT INTO "pro" VALUES (13, '萩原聖人');
INSERT INTO "pro" VALUES (14, '茅森早香');
INSERT INTO "pro" VALUES (15, '小林剛');
INSERT INTO "pro" VALUES (16, '村上淳');
INSERT INTO "pro" VALUES (17, '石橋伸洋');
INSERT INTO "pro" VALUES (18, '魚谷侑未');
INSERT INTO "pro" VALUES (19, '高宮まり');
INSERT INTO "pro" VALUES (20, '瀬戸熊直樹');
INSERT INTO "pro" VALUES (21, '白鳥翔');
INSERT INTO "pro" VALUES (22, '沢崎誠');
INSERT INTO "pro" VALUES (23, '日向藍子');
INSERT INTO "pro" VALUES (24, '内川幸太郎');
INSERT INTO "pro" VALUES (25, '藤崎智');
INSERT INTO "pro" VALUES (26, '瑞原明奈');
INSERT INTO "pro" VALUES (27, '和久津晶');
INSERT INTO "pro" VALUES (28, '丸山奏子');
INSERT INTO "pro" VALUES (29, '岡田紗佳');
INSERT INTO "pro" VALUES (30, '堀慎吾');
INSERT INTO "pro" VALUES (31, '伊達朱里紗');
INSERT INTO "pro" VALUES (32, '松ヶ瀬隆弥');
INSERT INTO "pro" VALUES (33, '東城りお');
INSERT INTO "pro" VALUES (34, '二階堂瑠美');
INSERT INTO "pro" VALUES (35, '本田朋広');

-- ----------------------------
-- Table structure for season
-- ----------------------------
DROP TABLE IF EXISTS "season";
CREATE TABLE "season" (
  "id" INTEGER NOT NULL,
  "season_year_id" integer,
  "season_name" TEXT,
  "season_type" TEXT,
  "season_code" TEXT,
  PRIMARY KEY ("id"),
  CONSTRAINT "season_year_id" FOREIGN KEY ("season_year_id") REFERENCES "season_year" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION
);

-- ----------------------------
-- Records of season
-- ----------------------------
INSERT INTO "season" VALUES (1, 1, '2018赛季常规赛', 'regular', 'S001');
INSERT INTO "season" VALUES (2, 1, '2018赛季决赛', 'final', 'S002');
INSERT INTO "season" VALUES (3, 2, '2019赛季常规赛', 'regular', 'S003');
INSERT INTO "season" VALUES (4, 2, '2019赛季半决赛', 'semi_final', 'S004');
INSERT INTO "season" VALUES (5, 2, '2019赛季决赛', 'final', 'S005');
INSERT INTO "season" VALUES (6, 3, '2020赛季常规赛', 'regular', 'S007');
INSERT INTO "season" VALUES (7, 3, '2020赛季半决赛', 'semi_final', 'S008');
INSERT INTO "season" VALUES (8, 3, '2020赛季决赛', 'final', 'S009');
INSERT INTO "season" VALUES (9, 4, '2021赛季常规赛', 'regular', 'S010');
INSERT INTO "season" VALUES (10, 4, '2021赛季半决赛', 'semi_final', 'S011');
INSERT INTO "season" VALUES (11, 4, '2021赛季决赛', 'final', 'S012');

-- ----------------------------
-- Table structure for season_pro
-- ----------------------------
DROP TABLE IF EXISTS "season_pro";
CREATE TABLE "season_pro" (
  "id" INTEGER NOT NULL,
  "season_id" INTEGER,
  "pro_id" INTEGER,
  "team_id" INTEGER,
  "game_num" integer NOT NULL ON CONFLICT REPLACE DEFAULT 0,
  "game_east_start_num" integer NOT NULL ON CONFLICT REPLACE DEFAULT 0,
  "game_south_start_num" integer NOT NULL ON CONFLICT REPLACE DEFAULT 0,
  "game_west_start_num" INTEGER NOT NULL ON CONFLICT REPLACE DEFAULT 0,
  "game_north_start_num" INTEGER NOT NULL ON CONFLICT REPLACE DEFAULT 0,
  "game_highest_score" integer DEFAULT NULL,
  "game_lowest_score" integer DEFAULT NULL,
  "first_east_num" INTEGER NOT NULL ON CONFLICT REPLACE DEFAULT 0,
  "first_south_num" INTEGER NOT NULL ON CONFLICT REPLACE DEFAULT 0,
  "first_west_num" INTEGER NOT NULL ON CONFLICT REPLACE DEFAULT 0,
  "first_north_num" INTEGER NOT NULL ON CONFLICT REPLACE DEFAULT 0,
  "second_east_num" INTEGER NOT NULL ON CONFLICT REPLACE DEFAULT 0,
  "second_south_num" INTEGER NOT NULL ON CONFLICT REPLACE DEFAULT 0,
  "second_west_num" INTEGER NOT NULL ON CONFLICT REPLACE DEFAULT 0,
  "second_north_num" INTEGER NOT NULL ON CONFLICT REPLACE DEFAULT 0,
  "third_east_num" INTEGER NOT NULL ON CONFLICT REPLACE DEFAULT 0,
  "third_south_num" INTEGER NOT NULL ON CONFLICT REPLACE DEFAULT 0,
  "third_west_num" INTEGER NOT NULL ON CONFLICT REPLACE DEFAULT 0,
  "third_north_num" INTEGER NOT NULL ON CONFLICT REPLACE DEFAULT 0,
  "fourth_east_num" INTEGER NOT NULL ON CONFLICT REPLACE DEFAULT 0,
  "fourth_south_num" INTEGER NOT NULL ON CONFLICT REPLACE DEFAULT 0,
  "fourth_west_num" INTEGER NOT NULL ON CONFLICT REPLACE DEFAULT 0,
  "fourth_north_num" INTEGER NOT NULL ON CONFLICT REPLACE DEFAULT 0,
  "score_point" real NOT NULL ON CONFLICT REPLACE DEFAULT 0,
  "rank_point" real NOT NULL ON CONFLICT REPLACE DEFAULT 0,
  "kyoku_east_num" INTEGER NOT NULL ON CONFLICT REPLACE DEFAULT 0,
  "kyoku_south_num" INTEGER NOT NULL ON CONFLICT REPLACE DEFAULT 0,
  "kyoku_west_num" INTEGER NOT NULL ON CONFLICT REPLACE DEFAULT 0,
  "kyoku_north_num" INTEGER NOT NULL ON CONFLICT REPLACE DEFAULT 0,
  "shanten_num" INTEGER NOT NULL ON CONFLICT REPLACE DEFAULT 0,
  "haipai_dora_num" INTEGER NOT NULL ON CONFLICT REPLACE DEFAULT 0,
  "renchan_max_num" INTEGER NOT NULL ON CONFLICT REPLACE DEFAULT 0,
  "furo_num" INTEGER NOT NULL ON CONFLICT REPLACE DEFAULT 0,
  "richi_num" INTEGER NOT NULL ON CONFLICT REPLACE DEFAULT 0,
  "richi_first_num" INTEGER NOT NULL ON CONFLICT REPLACE DEFAULT 0,
  "richi_chase_num" INTEGER NOT NULL ON CONFLICT REPLACE DEFAULT 0,
  "richi_good_num" INTEGER NOT NULL ON CONFLICT REPLACE DEFAULT 0,
  "richi_stupid_num" INTEGER NOT NULL ON CONFLICT REPLACE DEFAULT 0,
  "richi_machi_num" INTEGER NOT NULL ON CONFLICT REPLACE DEFAULT 0,
  "richi_turn_num" INTEGER NOT NULL ON CONFLICT REPLACE DEFAULT 0,
  "richi_suji_num" INTEGER NOT NULL ON CONFLICT REPLACE DEFAULT 0,
  "richi_furiten_num" INTEGER NOT NULL ON CONFLICT REPLACE DEFAULT 0,
  "richi_dora_num" INTEGER NOT NULL ON CONFLICT REPLACE DEFAULT 0,
  "richi_han_num" INTEGER NOT NULL ON CONFLICT REPLACE DEFAULT 0,
  "richi_aka_num" INTEGER NOT NULL ON CONFLICT REPLACE DEFAULT 0,
  "richi_chased_num" INTEGER NOT NULL ON CONFLICT REPLACE DEFAULT 0,
  "ryukyoku_tenpai_richi_num" INTEGER NOT NULL ON CONFLICT REPLACE DEFAULT 0,
  "ryukyoku_tenpai_menzen_num" INTEGER NOT NULL ON CONFLICT REPLACE DEFAULT 0,
  "ryukyoku_tenpai_furo_num" INTEGER NOT NULL ON CONFLICT REPLACE DEFAULT 0,
  "ryukyoku_noten_richi_num" INTEGER NOT NULL ON CONFLICT REPLACE DEFAULT 0,
  "ryukyoku_noten_menzen_num" INTEGER NOT NULL ON CONFLICT REPLACE DEFAULT 0,
  "ryukyoku_noten_furo_num" INTEGER NOT NULL ON CONFLICT REPLACE DEFAULT 0,
  "agari_dama_ron_num" INTEGER NOT NULL ON CONFLICT REPLACE DEFAULT 0,
  "agari_dama_tsumo_num" INTEGER NOT NULL ON CONFLICT REPLACE DEFAULT 0,
  "agari_dama_score" integer NOT NULL ON CONFLICT REPLACE DEFAULT 0,
  "agari_richi_ron_num" INTEGER NOT NULL ON CONFLICT REPLACE DEFAULT 0,
  "agari_richi_tsumo_num" INTEGER NOT NULL ON CONFLICT REPLACE DEFAULT 0,
  "agari_richi_score" integer NOT NULL ON CONFLICT REPLACE DEFAULT 0,
  "agari_richi_ron_ippatsu_num" INTEGER NOT NULL ON CONFLICT REPLACE DEFAULT 0,
  "agari_richi_tsumo_ippatsu_num" INTEGER NOT NULL ON CONFLICT REPLACE DEFAULT 0,
  "agari_richi_ron_uradora_kyoku_num" INTEGER NOT NULL ON CONFLICT REPLACE DEFAULT 0,
  "agari_richi_tsumo_uradora_kyoku_num" integer NOT NULL ON CONFLICT REPLACE DEFAULT 0,
  "agari_furo_ron_num" INTEGER NOT NULL ON CONFLICT REPLACE DEFAULT 0,
  "agari_furo_tsumo_num" INTEGER NOT NULL ON CONFLICT REPLACE DEFAULT 0,
  "agari_furo_score" integer NOT NULL ON CONFLICT REPLACE DEFAULT 0,
  "agari_turn_num" INTEGER NOT NULL ON CONFLICT REPLACE DEFAULT 0,
  "houjuu_dama_menzen_num" INTEGER NOT NULL ON CONFLICT REPLACE DEFAULT 0,
  "houjuu_dama_furo_num" INTEGER NOT NULL ON CONFLICT REPLACE DEFAULT 0,
  "houjuu_dama_richi_num" INTEGER NOT NULL ON CONFLICT REPLACE DEFAULT 0,
  "houjuu_dama_score" integer NOT NULL ON CONFLICT REPLACE DEFAULT 0,
  "houjuu_richi_menzen_num" INTEGER NOT NULL ON CONFLICT REPLACE DEFAULT 0,
  "houjuu_richi_furo_num" INTEGER NOT NULL ON CONFLICT REPLACE DEFAULT 0,
  "houjuu_richi_richi_num" INTEGER NOT NULL ON CONFLICT REPLACE DEFAULT 0,
  "houjuu_richi_score" integer NOT NULL ON CONFLICT REPLACE DEFAULT 0,
  "houjuu_richi_ippatsu_num" integer NOT NULL ON CONFLICT REPLACE DEFAULT 0,
  "houjuu_furo_menzen_num" integer NOT NULL ON CONFLICT REPLACE DEFAULT 0,
  "houjuu_furo_furo_num" INTEGER NOT NULL ON CONFLICT REPLACE DEFAULT 0,
  "houjuu_furo_richi_num" INTEGER NOT NULL ON CONFLICT REPLACE DEFAULT 0,
  "houjuu_furo_score" integer NOT NULL ON CONFLICT REPLACE DEFAULT 0,
  "blown_num" INTEGER NOT NULL ON CONFLICT REPLACE DEFAULT 0,
  "blown_score" integer NOT NULL ON CONFLICT REPLACE DEFAULT 0,
  "yaku" text NOT NULL ON CONFLICT REPLACE DEFAULT '',
  PRIMARY KEY ("id"),
  CONSTRAINT "season_id" FOREIGN KEY ("season_id") REFERENCES "season" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT "pro_id" FOREIGN KEY ("pro_id") REFERENCES "pro" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT "team_id" FOREIGN KEY ("team_id") REFERENCES "team" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION
);

-- ----------------------------
-- Records of season_pro
-- ----------------------------

-- ----------------------------
-- Table structure for season_pro_pro
-- ----------------------------
DROP TABLE IF EXISTS "season_pro_pro";
CREATE TABLE "season_pro_pro" (
  "id" INTEGER NOT NULL,
  "pro_id" INTEGER,
  "pro2_id" INTEGER,
  "point" real,
  "season_id" INTEGER,
  PRIMARY KEY ("id")
);

-- ----------------------------
-- Records of season_pro_pro
-- ----------------------------

-- ----------------------------
-- Table structure for season_year
-- ----------------------------
DROP TABLE IF EXISTS "season_year";
CREATE TABLE "season_year" (
  "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
  "season_year_name" TEXT
);

-- ----------------------------
-- Records of season_year
-- ----------------------------
INSERT INTO "season_year" VALUES (1, '2018_season');
INSERT INTO "season_year" VALUES (2, '2019_season');
INSERT INTO "season_year" VALUES (3, '2020_season');
INSERT INTO "season_year" VALUES (4, '2021_season');

-- ----------------------------
-- Table structure for sqlite_sequence
-- ----------------------------
DROP TABLE IF EXISTS "sqlite_sequence";
CREATE TABLE "sqlite_sequence" (
  "name",
  "seq"
);

-- ----------------------------
-- Records of sqlite_sequence
-- ----------------------------
INSERT INTO "sqlite_sequence" VALUES ('season_year', 4);

-- ----------------------------
-- Table structure for team
-- ----------------------------
DROP TABLE IF EXISTS "team";
CREATE TABLE "team" (
  "id" INTEGER NOT NULL,
  "team_name" TEXT,
  "team_code" TEXT,
  PRIMARY KEY ("id")
);

-- ----------------------------
-- Records of team
-- ----------------------------
INSERT INTO "team" VALUES (1, 'ドリブンズ', 'T001');
INSERT INTO "team" VALUES (2, '麻雀格闘倶楽部', 'T002');
INSERT INTO "team" VALUES (3, '風林火山', 'T003');
INSERT INTO "team" VALUES (4, 'ABEMAS', 'T004');
INSERT INTO "team" VALUES (5, 'フェニックス', 'T005');
INSERT INTO "team" VALUES (6, '雷電', 'T006');
INSERT INTO "team" VALUES (7, 'Pirates', 'T007');
INSERT INTO "team" VALUES (8, 'サクラナイツ', 'T008');

-- ----------------------------
-- Indexes structure for table pro
-- ----------------------------
CREATE UNIQUE INDEX "proId"
ON "pro" (
  "id" ASC
);

-- ----------------------------
-- Indexes structure for table season
-- ----------------------------
CREATE UNIQUE INDEX "seasonCode"
ON "season" (
  "season_code" ASC
);
CREATE UNIQUE INDEX "seasonId"
ON "season" (
  "id" ASC
);

-- ----------------------------
-- Auto increment value for season_year
-- ----------------------------
UPDATE "sqlite_sequence" SET seq = 4 WHERE name = 'season_year';

-- ----------------------------
-- Indexes structure for table season_year
-- ----------------------------
CREATE INDEX "indexId"
ON "season_year" (
  "id" ASC
);

-- ----------------------------
-- Indexes structure for table team
-- ----------------------------
CREATE UNIQUE INDEX "teamCode"
ON "team" (
  "team_code" ASC
);
CREATE UNIQUE INDEX "teamId"
ON "team" (
  "id" ASC
);

PRAGMA foreign_keys = true;

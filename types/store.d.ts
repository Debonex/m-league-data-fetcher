interface Game {
  players: Player[];
  east: Code;
  bon: number;
  richibo: number;
  dora: Pai[];
  doraPointer: Pai[];
  lastSuteBy: Code | "";
}

interface Player {
  name: string;
  code: Code;
  point: number;
  status: "menzen" | "furo" | "richi" | "richi_chased";
  tenpai: Pai[];
  sute: Pai[];
  tehai: Pai[];
  renchan: number;
}

type MPai = "1m" | "2m" | "3m" | "4m" | "5m" | "5M" | "6m" | "7m" | "8m" | "9m";

type SPai = "1s" | "2s" | "3s" | "4s" | "5s" | "5S" | "6s" | "7s" | "8s" | "9s";

type PPai = "1p" | "2p" | "3p" | "4p" | "5p" | "5P" | "6p" | "7p" | "8p" | "9p";

type ZPai = "1z" | "2z" | "3z" | "4z" | "5z" | "6z" | "7z";

type Pai = MPai | SPai | PPai | ZPai;

interface SeasonPro {
  id?: number;
  season_id?: number;
  pro_id?: number;
  team_id?: number;
  game_num: number;
  game_east_start_num: number;
  game_south_start_num: number;
  game_west_start_num: number;
  game_north_start_num: number;
  game_highest_score: number | null;
  game_lowest_score: number | null;
  first_east_num: number;
  first_south_num: number;
  first_west_num: number;
  first_north_num: number;
  second_east_num: number;
  second_south_num: number;
  second_west_num: number;
  second_north_num: number;
  third_east_num: number;
  third_south_num: number;
  third_west_num: number;
  third_north_num: number;
  fourth_east_num: number;
  fourth_south_num: number;
  fourth_west_num: number;
  fourth_north_num: number;
  score_point: number;
  rank_point: number;
  kyoku_east_num: number;
  kyoku_south_num: number;
  kyoku_west_num: number;
  kyoku_north_num: number;
  shanten_num: number;
  haipai_dora_num: number;
  renchan_max_num: number;
  furo_num: number;
  richi_num: number;
  richi_first_num: number;
  richi_chase_num: number;
  richi_good_num: number;
  richi_stupid_num: number;
  richi_machi_num: number;
  richi_turn_num: number;
  richi_suji_num: number;
  richi_furiten_num: number;
  richi_dora_num: number;
  richi_han_num: number;
  richi_aka_num: number;
  richi_chased_num: number;
  ryukyoku_tenpai_richi_num: number;
  ryukyoku_tenpai_menzen_num: number;
  ryukyoku_tenpai_furo_num: number;
  ryukyoku_noten_richi_num: number;
  ryukyoku_noten_menzen_num: number;
  ryukyoku_noten_furo_num: number;
  agari_dama_ron_num: number;
  agari_dama_tsumo_num: number;
  agari_dama_score: number;
  agari_richi_ron_num: number;
  agari_richi_tsumo_num: number;
  agari_richi_score: number;
  agari_richi_ron_ippatsu_num: number;
  agari_richi_tsumo_ippatsu_num: number;
  agari_richi_ron_uradora_kyoku_num: number;
  agari_richi_tsumo_uradora_kyoku_num: number;
  agari_furo_ron_num: number;
  agari_furo_tsumo_num: number;
  agari_furo_score: number;
  agari_turn_num: number;
  houjuu_dama_menzen_num: number;
  houjuu_dama_furo_num: number;
  houjuu_dama_richi_num: number;
  houjuu_dama_score: number;
  houjuu_richi_menzen_num: number;
  houjuu_richi_furo_num: number;
  houjuu_richi_richi_num: number;
  houjuu_richi_score: number;
  houjuu_richi_ippatsu_num: number;
  houjuu_furo_menzen_num: number;
  houjuu_furo_furo_num: number;
  houjuu_furo_richi_num: number;
  houjuu_furo_score: number;
  blown_num: number;
  blown_score: number;
  yaku: string;
}

interface SeasonProPro {
  id?: number;
  pro_id: number;
  pro2_id: number;
  point: number;
  season_id: number;
}

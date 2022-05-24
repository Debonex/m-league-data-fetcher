export function seasonPro(
  seasonId: number,
  proId: number,
  teamId: number
): SeasonPro {
  return {
    season_id: seasonId,
    pro_id: proId,
    team_id: teamId,
    game_num: 0,
    game_east_start_num: 0,
    game_south_start_num: 0,
    game_west_start_num: 0,
    game_north_start_num: 0,
    game_highest_score: null,
    game_lowest_score: null,
    first_east_num: 0,
    first_south_num: 0,
    first_west_num: 0,
    first_north_num: 0,
    second_east_num: 0,
    second_south_num: 0,
    second_west_num: 0,
    second_north_num: 0,
    third_east_num: 0,
    third_south_num: 0,
    third_west_num: 0,
    third_north_num: 0,
    fourth_east_num: 0,
    fourth_south_num: 0,
    fourth_west_num: 0,
    fourth_north_num: 0,
    first_score: 0,
    second_score: 0,
    third_score: 0,
    fourth_score: 0,
    score_point: 0,
    rank_point: 0,
    kyoku_east_num: 0,
    kyoku_south_num: 0,
    kyoku_west_num: 0,
    kyoku_north_num: 0,
    shanten_num: 0,
    haipai_dora_num: 0,
    renchan_max_num: 0,
    furo_num: 0,
    richi_num: 0,
    richi_first_num: 0,
    richi_chase_num: 0,
    richi_good_num: 0,
    richi_stupid_num: 0,
    richi_machi_num: 0,
    richi_turn_num: 0,
    richi_suji_num: 0,
    richi_furiten_num: 0,
    richi_dora_num: 0,
    richi_han_num: 0,
    richi_aka_num: 0,
    richi_chased_num: 0,
    ryukyoku_tenpai_richi_num: 0,
    ryukyoku_tenpai_menzen_num: 0,
    ryukyoku_tenpai_furo_num: 0,
    ryukyoku_noten_richi_num: 0,
    ryukyoku_noten_menzen_num: 0,
    ryukyoku_noten_furo_num: 0,
    agari_dama_ron_num: 0,
    agari_dama_tsumo_num: 0,
    agari_dama_score: 0,
    agari_richi_ron_num: 0,
    agari_richi_tsumo_num: 0,
    agari_richi_score: 0,
    agari_richi_ron_ippatsu_num: 0,
    agari_richi_tsumo_ippatsu_num: 0,
    agari_richi_ron_uradora_kyoku_num: 0,
    agari_richi_tsumo_uradora_kyoku_num: 0,
    agari_furo_ron_num: 0,
    agari_furo_tsumo_num: 0,
    agari_furo_score: 0,
    agari_turn_num: 0,
    houjuu_dama_menzen_num: 0,
    houjuu_dama_furo_num: 0,
    houjuu_dama_richi_num: 0,
    houjuu_dama_score: 0,
    houjuu_richi_menzen_num: 0,
    houjuu_richi_furo_num: 0,
    houjuu_richi_richi_num: 0,
    houjuu_richi_score: 0,
    houjuu_richi_ippatsu_num: 0,
    houjuu_furo_menzen_num: 0,
    houjuu_furo_furo_num: 0,
    houjuu_furo_richi_num: 0,
    houjuu_furo_score: 0,
    blown_num: 0,
    blown_score: 0,
    yaku: "",
  };
}

export function seasonProPro(
  seasonId: number,
  pro1Id: number,
  pro2Id: number
): SeasonProPro {
  return {
    season_id: seasonId,
    pro_id: pro1Id,
    pro2_id: pro2Id,
    point: 0,
  };
}

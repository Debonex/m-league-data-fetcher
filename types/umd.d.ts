interface UMDGameItem {
  id: string;
  time: string;
  cmd: UMDCmd;
  args: string[];
}

type Code = "A0" | "B0" | "C0" | "D0";

type UMDCmd =
  | "area"
  | "player"
  | "point"
  | "gamestart"
  | "gameend"
  | "kyokustart"
  | "haipai"
  | "kyokuend"
  | "ryukyoku"
  | "dice"
  | "dora"
  | "uradora"
  | "tsumo"
  | "sutehai"
  | "say"
  | "richi"
  | "open"
  | "agari";

type SayType =
  | "pon"
  | "chi"
  | "kan"
  | "ron"
  | "richi"
  | "tsumo"
  | "tenpai"
  | "noten";

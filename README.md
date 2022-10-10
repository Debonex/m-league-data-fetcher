## About

Fetch and store m-league haifu(牌譜) information.

## Usage

```shell
npm install
```

or

```shell
yarn
```

### fetch haifu information

- sign in [https://m-league.jp/](https://m-league.jp/)

- "日程・対戦成績" => choose any match day => "牌譜をみる"

- view anyone of paifu, for example, https://viewer.ml-log.jp/web/viewer?gameid=L001_S013_0002_01A.
check the post request body, paste the password parameter into ```.env``` file

```shell
npm run fetch
```

or

```shell
yarn fetch
```

### store haifu information to database (sqlite3)

```shell
npm run store
```

or

```shell
yarn store
```

### Notice!

_These may be caused by the wrong hand input, please correct these after fetching data._

- game end points in `L001_S007_0010_02A.json` are wrong.

```
B0: 0.4 -> -0.4
```

- game end points in `L001_S010_0015_02A.json` are wrong.

```
A0: 58.0 -> 38.0
C0: 18.0 -> 38.0
```

- game end points in `L001_S010_0080_02A.json` are wrong

```
B0: -42.8 -> -72.8
D0: 26.4 -> 76.4
```

### Other

Tested environment:

- node: v16.14.0

- yarn -v: 1.22.17

- operation system: Windows 10

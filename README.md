## About

Fetch and store m-league haifu(牌譜) information.

## Usage

```shell
npm install
```

### fetch haifu information

```shell
npm run fetch
```

### store haifu information to database (sqlite3)

init your database with ```sql/init.sql```

```shell
npm run store
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

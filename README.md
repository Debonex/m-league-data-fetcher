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

- check site cookies, copy paifuSessionId and enter it in the .env file.

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

## Other

Tested environment:

- node: v16.14.0

- yarn -v: 1.22.17

- operation system: Windows 10

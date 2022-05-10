# js-pipes

Angular like pipes anywhere

## Install

```bash
$ npm install js-pipes
```

## Usage

```js
import PipesEngine from "js-pipes";

const piper = PipesEngine();

piper({ name: "test string" }, "${name}"); // 'test string'
```

---

## built in transforms

### uppercase

```js
piper({ name: "test string" }, "${name|uppercase}"); // 'TEST STRING'
```

### date

using [dayjs](https://day.js.org/)

```js
piper({ start: "2021-03-26T15:32:37-04:00" }, "${start|date:'MM/DD/YYYY'}"); // '03/26/2021'
piper({ start: "2021-03-26T15:32:37-04:00" }, "${start|date:'llll'}"); // 'Fri, Mar 26, 2021 3:32 PM'
```

### switch

```js
piper({ yes: true }, "${yes|sw:'happy','sad'}"); // happy
piper({ yes: false }, "${yes|sw:'happy','sad'}"); // sad
```

### currency

```js
piper({ amount: 1223.33 }, "${amount|currency}"); // '$1,223.33'
```

---

## deeply nested data works

```js
piper({ user: [{ name: "test string" }] }, "${user[0].name|uppercase}"); // 'TEST STRING'
```

---

## make your own transforms

```js

const calendar = () => (dateStr) => {
  return dayjs().calendar(dayjs(dateStr));
};

const piper = PipesEngine({
  calendar
};
});

piper({ name: 'test string' }, '${name}'); // 'test string'
```

## License

[MIT](LICENSE.txt)

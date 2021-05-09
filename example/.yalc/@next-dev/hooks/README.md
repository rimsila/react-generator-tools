# @next-dev/hooks

> @next-dev/hooks.

See website [@next-dev/hooks](https://github.com/rimsila/hooks) for more information.

## Install Local

or using yalc:

```bash
$ yalc add @next-dev/hooks
```

## 🔨 Usage

```
import { useFormTable} from'@next-dev/hooks';
```

## Document description

### nav

Corresponding to the top menu bar, ranked second; the configuration is as follows;

| Configuration item | Description                    | Value  |
| ------------------ | ------------------------------ | ------ |
| title              | The name shown in the top menu | hooks  |
| order              | Order in the top menu          | 2      |
| path               | The base path of the route     | /hooks |

### group

Corresponding to the left menu bar group on the left

| order | title    | path     |
| ----- | -------- | -------- |
| 1     | Request  | /ajax    |
| 2     | Advanced | /advance |
| 3     | Dom      | /dom     |
| 10    | Other    | /other   |

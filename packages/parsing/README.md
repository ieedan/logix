# @logix/parsing

![jsr badge](https://jsr.io/badges/@logix/parsing)

Tooling for scanning and parsing ladder logic into an AST.

## Scan

```ts
import * as s from "@logix/parsing/scanner"

const scanResult = s.new().scan("XIC(Button)OTE(Light);");
```

## Parse

```ts
import * as p from "@logix/parsing/parser"

const rungs = p.new().parse(tokens); 
```
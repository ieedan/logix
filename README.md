# Allen Bradley Ladder Logic Parser

A fully featured parser for Allen Bradley Studio 5000 ladder logic.

In:

```plaintext
XIC(foo)OTE(bar);
```

Out:

```json
[
	{
		"logic": {
			"typ": "And",
			"conditions": [
				{
					"typ": "Instruction",
					"index": 0,
					"name": "XIC",
					"parameters": [
						{
							"typ": "Tag",
							"token": {
								"typ": "tag",
								"column": 4,
								"lexeme": "foo"
							}
						}
					]
				},
				{
					"typ": "Instruction",
					"index": 1,
					"name": "OTE",
					"parameters": [
						{
							"typ": "Tag",
							"token": {
								"typ": "tag",
								"column": 12,
								"lexeme": "bar"
							}
						}
					]
				}
			]
		}
	}
]
```

## Features

- Expression Parsing
- Simple AST

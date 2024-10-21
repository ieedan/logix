import { Command, program } from "commander";
import * as s from "@logix/parsing/scanner";
import * as p from "@logix/parsing/parser";
import * as hl from "@logix/highlight";
import color from "chalk";
import * as v from "valibot";
import { prettyPrintParserError, prettyPrintScannerError } from "../utils.ts";

const optionsSchema = v.object({
	fromFile: v.optional(v.string()),
	html: v.boolean(),
	json: v.boolean(),
});

type Options = v.InferInput<typeof optionsSchema>;

const highlight = new Command()
	.command("highlight")
	.description(
		"Highlight the inputted ladder logic",
	)
	.argument("[input]", "Ladder logic input")
	.option(
		"-F, --from-file <path>",
		"File to read the ladder logic from.",
	)
	.option(
		"--html",
		"Output tokens as html.",
		false,
	)
	.option(
		"--json",
		"Outputs the ast.",
		false,
	)
	.action((input, options) => {
		_highlight(input, v.parse(optionsSchema, options));
	});

const _highlight = (input: string | undefined, options: Options) => {
	// make sure input is no longer undefined
	if (input === undefined) {
		if (options.fromFile === undefined) {
			program.error(
				color.red(
					"You must either provide an input string or a file to read from!",
				),
			);
		}

		try {
			input = Deno.readTextFileSync(options.fromFile);
		} catch (err) {
			program.error(color.red(err));
		}
	}

	const tokens = s.new().scan(input);

	if (tokens.isErr()) {
		for (const error of tokens.unwrapErr()) {
			console.log(prettyPrintScannerError(error));
		}
		Deno.exit(1);
	}

	if (!options.json) {
		console.log("");
		if (options.html) {
			console.log(hl.html(tokens.unwrap()));
			console.log("");
		} else {
			console.log(hl.terminal(tokens.unwrap()));
		}

		return;
	}

	const parser = p.new();

	const ast = parser.parse(tokens.unwrap());

	if (parser.errors != null) {
		for (const error of parser.errors) {
			console.log(prettyPrintParserError(error));
		}
	}

	console.log("");
	console.log(JSON.stringify(ast, null, 2));
	console.log("");
};

export { highlight };

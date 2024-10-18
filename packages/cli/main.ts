import { parser as p, scanner as s } from "@logix/parsing";
import { instructions as logixAnalyzer } from "@logix/analyzers";
import * as highlight from "@logix/highlight";
import { stopwatch } from "@utils";

if (import.meta.main) {
	const w = stopwatch();

	w.start();

	const scanner = s.new();

	const fileText = Deno.readTextFileSync("./test.txt");

	const code = fileText;

	const scanResult = scanner.scan(code);

	if (scanResult.isErr()) {
		console.log(scanResult.unwrapErr());
		Deno.exit(1);
	}

	const tokens = scanResult.unwrap();

	// console.log("");
	// console.log(highlight.terminal(tokens));
	// console.log("");

	const parser = p.new();

	const rungs = parser.parse(tokens);

	const analyzerErrors = logixAnalyzer.analyze(rungs);

	const time = w.elapsed();

	if (parser.errors) {
		console.log("parser errors: ", parser.errors);
	}

	// display after time

	console.log("");
	console.log(highlight.terminal(tokens));
	console.log("");

	// console.log("");
	// console.log(JSON.stringify(tokens, null, 2));
	// console.log("");

	console.log("");
	console.log(JSON.stringify(rungs, null, 2));
	console.log("");

	if (analyzerErrors) {
		for (const error of analyzerErrors) {
			console.log(logixAnalyzer.formatObservation(error));
		}
	}

	console.log(`Done in ${time}ms`);
}

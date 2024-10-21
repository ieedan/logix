import { program } from "commander";
import { highlight } from "./src/commands/highlight.ts";

if (import.meta.main) {
	program.name("@logix/cli")
		.description("Work with ladder logic from the CLI.")
		.addCommand(highlight);

	program.parse();
}

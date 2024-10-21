import type { tokens } from "@logix/parsing";
import color from "chalk";

/** Renders the tokenized output from the scanner using `chalk` so it can be displayed in the terminal.
 *
 * @param tokens
 * @returns
 * 
 * # Example
 * 
 * ```ts
 * import { terminal } from "@logix/highlight";
 * 
 * terminal(tokens);
 * ```
 */
const terminal = (tokens: tokens.Token[]): string => {
	let result = "";

	for (const token of tokens) {
		switch (token.typ) {
			case "string":
				result += color.green(token.lexeme);
				break;
			case "number":
				result += color.yellow(token.lexeme);
				break;
			case "instruction":
				result += color.blueBright(token.lexeme);
				break;
			case "tag":
				result += color.blue(token.lexeme);
				break;
			case "(":
				result += color.yellowBright(token.lexeme);
				break;
			case ")":
				result += color.yellowBright(token.lexeme);
				break;
			case ";":
				result += color.gray(token.lexeme) + "\n";
				break;
			default:
				// @ts-ignore we must do this check
				if (tokens.EXPRESSION_KEYWORDS.includes(token.typ)) {
					result += color.blueBright(token.lexeme);
				} else {
					result += color.gray(token.lexeme);
				}

				break;
		}
	}

	return result;
};

/** Classes applied to html output. This can be used as reference for your styles. */
const LOGIX_CLASSES = {
	"string": "logix-string",
	"number": "logix-number",
	"instruction": "logix-instruction",
	"tag": "logix-tag",
	"keyword": "logix-keyword",
	"braces": "logix-braces",
	"default": "logix-default",
};

/** Transforms the tokenized output into html with class names for the different tokens. 
 * 
 * @param tokens 
 * @returns 
 * 
 * # Example
 * 
 * ```ts
 * import { html } from "@logix/highlight";
 * 
 * html(tokens);
 * ```
 */
const html = (tokens: tokens.Token[]): string => {
	let result = "";

	for (const token of tokens) {
		switch (token.typ) {
			case "string":
				result +=
					`<span class="${LOGIX_CLASSES.string}">${token.lexeme}</span>`;
				break;
			case "number":
				result +=
					`<span class="${LOGIX_CLASSES.number}">${token.lexeme}</span>`;
				break;
			case "instruction":
				result +=
					`<span class="${LOGIX_CLASSES.instruction}">${token.lexeme}</span>`;
				break;
			case "tag":
				result +=
					`<span class="${LOGIX_CLASSES.tag}">${token.lexeme}</span>`;
				break;
			case "(":
			case ")":
				result +=
					`<span class="${LOGIX_CLASSES.braces}">${token.lexeme}</span>`;
				break;
			case ";":
				result +=
					`<span class="${LOGIX_CLASSES.default}">${token.lexeme}</span><br/>`;
				break;
			default:
				// @ts-ignore we must do this check
				if (tokens.EXPRESSION_KEYWORDS.includes(token.typ)) {
					result +=
					`<span class="${LOGIX_CLASSES.keyword}">${token.lexeme}</span>`;
				} else {
					result +=
					`<span class="${LOGIX_CLASSES.default}">${token.lexeme}</span>`;
				}

				break;
		}
	}

	return result;
};

export { terminal, html, LOGIX_CLASSES };

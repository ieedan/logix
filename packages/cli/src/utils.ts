import type * as scanner from "@logix/parsing/scanner";
import type * as parser from "@logix/parsing/parser";
import color from "chalk";

const ERROR = color.bgRed(" ERROR ");

const prettyPrintScannerError = (error: scanner.Error) => {
	return `${ERROR} ${error.error} column: ${error.startColumn}`;
};

const prettyPrintParserError = (error: parser.Error) => {
	return `${ERROR} ${error.error}`;
};

export { prettyPrintParserError, prettyPrintScannerError };

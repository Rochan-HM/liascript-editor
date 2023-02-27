import CodeMirror from "@uiw/react-codemirror";

import * as events from "@uiw/codemirror-extensions-events";
import * as themes from "@uiw/codemirror-themes-all";
import { hyperLink } from "@uiw/codemirror-extensions-hyper-link";
import { color } from "@uiw/codemirror-extensions-color";

import { markdown, markdownLanguage } from "@codemirror/lang-markdown";
import { languages } from "@codemirror/language-data";
import { autocompletion } from "@codemirror/autocomplete";
import type { Extension } from "@codemirror/state";

import snippets from "../snippets";
import camelize from "../utils/camelize";

const eventExt = events.content({
	focus: (evn) => {
		console.log("focus");
	},
	blur: (evn) => {
		console.log("blur");
	},
});

const code = `## Title

\`\`\`jsx
function Demo() {
  return <div>demo</div>
}
\`\`\`

\`\`\`bash
# Not dependent on uiw.
npm install @codemirror/lang-markdown --save
npm install @codemirror/language-data --save
\`\`\`

[weisit ulr](https://uiwjs.github.io/react-codemirror/)

\`\`\`go
package main
import "fmt"
func main() {
  fmt.Println("Hello, 世界")
}
\`\`\`
`;

export default function Editor({ theme }: { theme: string }) {
	return (
		<CodeMirror
			height="100%"
			width="100%"
			value={code}
			theme={themes[camelize(theme) as keyof typeof themes] as Extension}
			extensions={[
				[
					color,
					markdown({ base: markdownLanguage, codeLanguages: languages }),
					markdownLanguage.data.of({ autocomplete: snippets }),
					eventExt,
					hyperLink,
					autocompletion({
						activateOnTyping: true,
						closeOnBlur: true,
					}),
				],
			]}
			basicSetup={{
				lineNumbers: true,
				highlightActiveLine: true,
				bracketMatching: true,
				highlightActiveLineGutter: true,
				foldGutter: true,
				allowMultipleSelections: true,
				history: true,
			}}
		/>
	);
}

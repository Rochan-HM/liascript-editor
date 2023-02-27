import { Snippets } from "./snippets";

import { snippetCompletion } from "@codemirror/autocomplete";
import type { Completion } from "@codemirror/autocomplete";

const snippets: Completion[] = [];

for (const snippet of Snippets) {
  snippets.push(
    snippetCompletion(snippet.insertText, {
      label: snippet.label,
      info: snippet.documentation,
    })
  );
}

export default snippets;

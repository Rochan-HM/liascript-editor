import { forwardRef, useEffect, useMemo, useState } from "react";
import CodeMirror, { ReactCodeMirrorRef } from "@uiw/react-codemirror";
import { EditorView } from "codemirror";

import * as events from "@uiw/codemirror-extensions-events";
import * as themes from "@uiw/codemirror-themes-all";
import { hyperLink } from "@uiw/codemirror-extensions-hyper-link";
import { color } from "@uiw/codemirror-extensions-color";

import { markdown, markdownLanguage } from "@codemirror/lang-markdown";
import { languages } from "@codemirror/language-data";
import { autocompletion } from "@codemirror/autocomplete";
import type { Extension } from "@codemirror/state";

import * as Y from "yjs";
import { HocuspocusProvider } from "@hocuspocus/provider";
import { yCollab } from "y-codemirror.next";
import RandomColor from "randomcolor";

import snippets from "../snippets";
import camelize from "../utils/camelize";
import { useContentStore, useEditorSettingsStore } from "../store";

const eventExt = events.content({
	focus: (evn) => {
		// console.log("focus");
	},
	blur: (evn) => {
		// console.log("blur");
	},
});

const Editor = forwardRef(
	({ theme }: { theme: string }, editorRef: React.Ref<ReactCodeMirrorRef>) => {
		const [yte, setYte] = useState<Extension | null>(null);
		const content = useContentStore((state) => state.content);
		const setContent = useContentStore((state) => state.setContent);

		const lineWrap = useEditorSettingsStore((state) => state.lineWrapping);

		useEffect(() => {
			const ydoc = new Y.Doc(); //create a ydoc

			let provider: HocuspocusProvider | null = null;
			try {
				provider = new HocuspocusProvider({
					url: "wss://colabeditor.up.railway.app",
					name: "myroom",
					document: ydoc,
				});

				const yText = ydoc.getText("codemirror"); //create a yText

				const yUndoManager = new Y.UndoManager(yText);

				const awareness = provider.awareness; //awareness is what makes other user aware about your actions

				const color = RandomColor(); //Provied any random color to be used for each user

				awareness.setLocalStateField("user", {
					name: new Date().toLocaleTimeString(),
					color: color,
				});

				setYte(yCollab(yText, awareness, { undoManager: yUndoManager }));
			} catch (err) {
				alert("Error in connecting to server");
			}
			return () => {
				if (provider) {
					provider.disconnect(); //We destroy doc we created and disconnect
					ydoc.destroy(); //the provider to stop propagting changes if user leaves editor
				}
			};
		}, []);

		const defaultExtensions = useMemo(() => {
			return [
				color,
				markdown({ base: markdownLanguage, codeLanguages: languages }),
				markdownLanguage.data.of({ autocomplete: snippets }),
				eventExt,
				hyperLink,
				autocompletion({
					activateOnTyping: true,
					closeOnBlur: true,
				}),
			];
		}, []);

		const extensions = useMemo(() => {
			let ext = defaultExtensions;
			if (yte) ext = [...ext, yte];
			if (lineWrap) ext = [...ext, EditorView.lineWrapping];
			return ext;
		}, [lineWrap, yte]);

		return (
			<CodeMirror
				height="95vh"
				width="100%"
				value={content}
				onChange={(value) => {
					setContent(value);
				}}
				theme={themes[camelize(theme) as keyof typeof themes] as Extension}
				extensions={extensions}
				ref={editorRef}
				autoFocus={true}
				basicSetup={{
					lineNumbers: true,
					highlightActiveLine: true,
					bracketMatching: true,
					foldGutter: true,
					allowMultipleSelections: true,
					history: true,
				}}
			/>
		);
	},
);

export default Editor;

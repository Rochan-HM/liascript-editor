import { forwardRef, useEffect, useState } from "react";
import CodeMirror, { ReactCodeMirrorRef } from "@uiw/react-codemirror";

import * as events from "@uiw/codemirror-extensions-events";
import * as themes from "@uiw/codemirror-themes-all";
import { hyperLink } from "@uiw/codemirror-extensions-hyper-link";
import { color } from "@uiw/codemirror-extensions-color";

import { markdown, markdownLanguage } from "@codemirror/lang-markdown";
import { languages } from "@codemirror/language-data";
import { autocompletion } from "@codemirror/autocomplete";
import type { Extension } from "@codemirror/state";

import * as Y from "yjs";
import { WebrtcProvider } from "y-webrtc";
import { yCollab } from "y-codemirror.next";
import RandomColor from "randomcolor";

import snippets from "../snippets";
import camelize from "../utils/camelize";

const eventExt = events.content({
	focus: (evn) => {
		// console.log("focus");
	},
	blur: (evn) => {
		// console.log("blur");
	},
});

const Editor = forwardRef(
	(
		{
			theme,
			content,
			setContent,
		}: {
			theme: string;
			content: string;
			setContent: (content: string) => void;
		},
		editorRef: React.Ref<ReactCodeMirrorRef>,
	) => {
		const [yte, setYte] = useState<Extension | null>(null);

		// useEffect(() => {
		// 	if (!editorRef.current) return;

		// 	const ydoc = new Y.Doc(); //create a ydoc

		// 	let provider: WebrtcProvider | null = null;
		// 	try {
		// 		provider = new WebrtcProvider(
		// 			new URLSearchParams(window.location.search).get("room") || "demo",
		// 			ydoc,
		// 			{
		// 				//Remember the other tab or
		// 				//other user should be in same room for seeing real-time changes
		// 				signaling: [
		// 					"ws://localhost:4444",
		// 					"wss://signaling.yjs.dev",
		// 					"wss://y-webrtc-signaling-eu.herokuapp.com",
		// 					"wss://y-webrtc-signaling-us.herokuapp.com",
		// 				],
		// 			},
		// 		);

		// 		const yText = ydoc.getText("codemirror"); //create a yText

		// 		const yUndoManager = new Y.UndoManager(yText);

		// 		const awareness = provider.awareness; //awareness is what makes other user aware about your actions

		// 		const color = RandomColor(); //Provied any random color to be used for each user

		// 		awareness.setLocalStateField("user", {
		// 			name: new Date().toLocaleTimeString(),
		// 			color: color,
		// 		});

		// 		setYte(yCollab(yText, awareness, { undoManager: yUndoManager }));
		// 	} catch (err) {
		// 		alert("Error in connecting to server");
		// 	}
		// 	return () => {
		// 		if (provider) {
		// 			provider.disconnect(); //We destroy doc we created and disconnect
		// 			ydoc.destroy(); //the provider to stop propagting changes if user leaves editor
		// 		}
		// 	};
		// }, [editorRef]);

		const extensions = [
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

		return (
			<CodeMirror
				height="100vh"
				width="100%"
				value={content}
				onChange={(value) => {
					setContent(value);
				}}
				theme={themes[camelize(theme) as keyof typeof themes] as Extension}
				extensions={[yte ? [...extensions, yte] : [...extensions]]}
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

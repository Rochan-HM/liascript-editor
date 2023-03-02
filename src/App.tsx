import { useEffect, useRef, useState } from "react";

import { Box } from "@chakra-ui/react";
import { Allotment } from "allotment";
import { ReactCodeMirrorRef } from "@uiw/react-codemirror";

import Editor from "./Editor";
import allThemes from "./Theme/theme";
import ThemeSelector from "./Theme";

import "allotment/dist/style.css";
import "./App.css";
import useDebounce from "./hooks/useDebounce";

const DEBOUNCED_DELAY = 1000;

export default function App() {
	const [mainTheme, setMainTheme] = useState<typeof allThemes[number]>(
		allThemes[26],
	);

	const iframeRef = useRef<HTMLIFrameElement | null>(null);
	const editorRef = useRef<ReactCodeMirrorRef | null>(null);
	const containerRef = useRef<HTMLDivElement | null>(null);

	const [content, setContent] = useState<string>("");
	const [iframeReady, setIframeReady] = useState<boolean>(false);
	const debouncedContent = useDebounce(content, DEBOUNCED_DELAY);

	const jit = false;

	const compile = () => {
		// @ts-ignore
		if (jit) return iframeRef.current?.contentWindow?.LIA.jit(debouncedContent);

		// @ts-ignore
		return iframeRef.current?.contentWindow?.LIA.jit(debouncedContent);
	};

	const onIframeLoad = () => {
		if (!iframeRef.current) return;

		const iframe = iframeRef.current;

		// @ts-ignore
		if (!iframe.contentWindow?.LIA) return;

		setIframeReady(true);
	};

	const focus = () => {
		const editor = editorRef.current?.view;

		if (!editor?.hasFocus && iframeRef.current?.contentDocument?.hasFocus())
			editor?.focus();
	};

	useEffect(() => {
		const interval = setInterval(focus, 0);

		return () => clearInterval(interval);
	}, [focus]);

	useEffect(() => {
		if (!iframeRef.current) return;

		if (!iframeReady) return onIframeLoad();

		compile();
	}, [debouncedContent]);

	return (
		<Box w="100vw" height="100vh">
			<ThemeSelector mainTheme={mainTheme} setMainTheme={setMainTheme} />

			<Allotment>
				<Allotment.Pane key="editor">
					<Box ref={containerRef}>
						<Editor
							theme={mainTheme}
							content={content}
							setContent={setContent}
							ref={editorRef}
						/>
					</Box>
				</Allotment.Pane>
				<Allotment.Pane key="preview">
					<iframe
						ref={iframeRef}
						style={{ position: "static" }}
						src="/editor/index.html"
						title="editor"
						height="100%"
						width="100%"
						frameBorder="0"
						onLoad={onIframeLoad}
					/>
				</Allotment.Pane>
			</Allotment>
		</Box>
	);
}

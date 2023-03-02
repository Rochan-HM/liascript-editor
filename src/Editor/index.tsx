import { forwardRef, useState } from "react";

import { ReactCodeMirrorRef } from "@uiw/react-codemirror";
import { Box, HStack } from "@chakra-ui/react";
import Editor from "./editor";
import allThemes from "./Theme";
import { ThemeSelector, LineWrapBox } from "./Settings";

const EditorPane = forwardRef((_, editorRef: React.Ref<ReactCodeMirrorRef>) => {
	const [mainTheme, setMainTheme] = useState<typeof allThemes[number]>(
		allThemes[26],
	);

	return (
		<Box h="100vh" w="100%">
			<Editor theme={mainTheme} ref={editorRef} />
			{/* Toolbar */}
			<HStack
				h="5vh"
				w="100%"
				bg="gray.100"
				justifyContent="space-between"
				alignItems="center"
				p="0 1rem"
			>
				<ThemeSelector mainTheme={mainTheme} setMainTheme={setMainTheme} />
				<LineWrapBox />
			</HStack>
		</Box>
	);
});

export default EditorPane;

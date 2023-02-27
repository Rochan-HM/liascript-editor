import { useState } from "react";

import { Box, Select } from "@chakra-ui/react";

import Editor from "./Editor";
import allThemes from "./Theme/theme";
import ThemeSelector from "./Theme";

export default function App() {
	const [mainTheme, setMainTheme] = useState<typeof allThemes[number]>(
		allThemes[0],
	);

	return (
		<Box w="100vw" height="100vh">
			<ThemeSelector mainTheme={mainTheme} setMainTheme={setMainTheme} />
			<Editor theme={mainTheme} />
		</Box>
	);
}

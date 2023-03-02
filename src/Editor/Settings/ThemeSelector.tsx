import { Box, HStack, Select, Text } from "@chakra-ui/react";

import allThemes from "../Theme";

interface ThemeSelectorProps {
	mainTheme: typeof allThemes[number];
	setMainTheme: (theme: typeof allThemes[number]) => void;
}

const ThemeSelector = ({ mainTheme, setMainTheme }: ThemeSelectorProps) => {
	return (
		<Box m={4}>
			<HStack>
				<Text>Theme:</Text>
				<Select
					maxW="30%"
					size="sm"
					value={mainTheme}
					onChange={(e) => {
						setMainTheme(e.target.value as typeof allThemes[number]);
					}}
				>
					{allThemes.map((theme) => (
						<option key={theme} value={theme}>
							{theme}
						</option>
					))}
				</Select>
			</HStack>
		</Box>
	);
};

export default ThemeSelector;

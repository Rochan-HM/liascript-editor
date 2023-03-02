import { Checkbox } from "@chakra-ui/react";
import { useEditorSettingsStore } from "../../store";

const LineWrapBox = () => {
	const isChecked = useEditorSettingsStore((state) => state.lineWrapping);
	const setLineWrap = useEditorSettingsStore((state) => state.setLineWrapping);

	const toggleCheck = () => setLineWrap(!isChecked);

	return (
		<Checkbox
			isChecked={isChecked}
			onChange={toggleCheck}
			colorScheme="green"
			size="lg"
		>
			Line Wrap
		</Checkbox>
	);
};

export default LineWrapBox;

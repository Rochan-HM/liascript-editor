import { Box, Flex } from "@chakra-ui/react";
import { useRef, useState } from "react";

interface SplitPaneProps {
	left: React.ReactNode;
	right: React.ReactNode;
}

const SplitPane = ({ left, right }: SplitPaneProps) => {
	const [dragging, setDragging] = useState(false);
	const [dividerPosition, setDividerPosition] = useState(50);

	const dividerRef = useRef<HTMLDivElement>(null);
	const containerRef = useRef<HTMLDivElement>(null);

	const onMouseMove = (e) => {
		if (!dragging) return;
		const dividerWidth = dividerRef.current?.offsetWidth || 0;
		const containerWidth = containerRef.current?.offsetWidth || 0;
		const position = e.clientX - (containerWidth - dividerWidth) / 2;
		setDividerPosition(position);
	};

	const onMouseUp = (e) => {
		setDragging(false);
	};

	const onMouseDown = (e) => {
		setDragging(true);
	};

	const leftWidth = `${dividerPosition}px`;
	const rightWidth = `calc(100% - ${dividerPosition}px)`;

	return (
		<Box
			ref={containerRef}
			w="full"
			h="full"
			onMouseMove={onMouseMove}
			onMouseUp={onMouseUp}
		>
			<Flex
				w="full"
				h="full"
				onMouseDown={onMouseDown}
				ref={dividerRef}
				position="relative"
				cursor="col-resize"
			>
				<Box
					w={leftWidth}
					h="full"
					position="absolute"
					left="0"
					top="0"
					zIndex={dragging ? "1" : "2"}
				>
					{left}
				</Box>
				<Box
					w={rightWidth}
					h="full"
					position="absolute"
					right="0"
					top="0"
					zIndex={dragging ? "2" : "1"}
				>
					{right}
				</Box>
			</Flex>
		</Box>
	);
};

export default SplitPane;

import * as React from "react";
import Svg, { Path } from "react-native-svg";
import sizes from "./sizes";
import colors from "./colors";

export const Home = ({ isActive, ...props }) => {
	return (
		<Svg
			width={sizes.ICONS_SIZE}
			height={sizes.ICONS_SIZE}
			viewBox={`0 0 ${sizes.ICONS_SIZE} ${sizes.ICONS_SIZE}`}
			fill={isActive ? colors.flowerBlue : "none"}
			stroke={isActive ? colors.flowerBlue : colors.grayText}
			strokeWidth={2}
			strokeLinecap="round"
			strokeLinejoin="round"
			className="prefix__feather prefix__feather-home"
			{...props}
		>
			<Path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
			<Path d="M9 22V12h6v10" />
		</Svg>
	);
};

export const Grid = ({ isActive, ...props }) => {
	return (
		<Svg
			width={sizes.ICONS_SIZE}
			height={sizes.ICONS_SIZE}
			viewBox={`0 0 ${sizes.ICONS_SIZE} ${sizes.ICONS_SIZE}`}
			fill={isActive ? colors.flowerBlue : "none"}
			stroke={isActive ? colors.flowerBlue : colors.grayText}
			strokeWidth={2}
			strokeLinecap="round"
			strokeLinejoin="round"
			className="prefix__feather prefix__feather-grid"
			{...props}
		>
			<Path d="M3 3h7v7H3zM14 3h7v7h-7zM14 14h7v7h-7zM3 14h7v7H3z" />
		</Svg>
	);
};

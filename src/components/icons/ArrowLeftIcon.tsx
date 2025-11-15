import React from 'react'; // Make sure to import React
import Svg, { Path } from "react-native-svg";

// 1. Define the Interface for the Props
interface ArrowLeftIconProps {
    color: string;
    size: number;
}

const ArrowLeftIcon: React.FC<ArrowLeftIconProps> = ({ color, size }) => {
    return (
        <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
            <Path d="M19 12H5" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            {/* Note: In React/JSX, SVG attributes like stroke-width become camelCase (strokeWidth) */}
            <Path d="M12 19L5 12L12 5" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </Svg>
    )
}

export default ArrowLeftIcon;
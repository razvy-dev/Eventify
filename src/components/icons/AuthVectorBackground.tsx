import { Dimensions } from "react-native";
import Svg, { Defs, FeBlend, FeColorMatrix, FeComposite, FeFlood, FeGaussianBlur, FeOffset, Filter, G, Path } from "react-native-svg";

// Get screen height for proportional scaling, though the SVG is fixed to 832px height
const { height } = Dimensions.get('window');

// Use a red/maroon color (adjust this hex code to match your exact 'colors.grena')
const MAROON_FILL = "#816E94"; 

export default function AuthVectorBackground() {
    return (
        <Svg 
            width="100%" // Take full width of its container
            height={height * 0.5} // Set height to roughly the top half of the screen
            viewBox="0 0 390 832" // The original aspect ratio
            fill="none"
        >
            <G filter="url(#filter0_d_2637_1492)">
            <Path 
                d="M131.5 -3C131.5 61.4543 265.708 513.155 390.164 -3C395.5 532 390.164 -76.5 199.5 17C147 66 392.48 558.999 238 823C20.9165 829.228 34.1788 550.778 3.99993 533.5C-26.1789 516.222 425 554.5 339.5 457.5C316.198 414.425 363.31 186.572 351.74 126.676C340.169 66.7796 387.591 597.737 390.164 533.5C392.736 469.263 -1.51538 471.192 14.664 416L37.9417 621L-13 487.5L14.6639 172.5L131.5 -3Z" 
                fill={MAROON_FILL} // <-- UPDATED COLOR HERE
                fill-opacity="1" // <-- REMOVED OPACITY (was 0.7) to make it solid
                shape-rendering="crispEdges"
            />
            </G>
            {/* Defs/Filter remains the same for the drop shadow */}
            <Defs>
            <Filter id="filter0_d_2637_1492" x="-17" y="-3" width="412.324" height="834.103" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
            <FeFlood flood-opacity="0" result="BackgroundImageFix"/>
            <FeColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
            <FeOffset dy="4"/>
            <FeGaussianBlur stdDeviation="2"/>
            <FeComposite in2="hardAlpha" operator="out"/>
            <FeColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
            <FeBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_2637_1492"/>
            <FeBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_2637_1492" result="shape"/>
            </Filter>
            </Defs>
        </Svg>
    )
}
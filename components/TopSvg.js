import {StyleSheet, View} from "react-native";
import Svg, {Path} from "react-native-svg";
import {width} from "../config/Dimension";

const TopSvg = ({customStyle, h, customD}) =>{
    return(
        <View style={customStyle}>
            <View style={{height:h, backgroundColor:'#FB7200',

                width:width }}/>
            <Svg
                height="50%"
                width="100%"
                viewBox="0 0 1440 320"
                style={{position:'absolute',
                    top:h-10,}}
            >
                <Path
                    fill="#FB7200"
                    d={customD}
                />
            </Svg>
        </View>
    )
}


export default TopSvg

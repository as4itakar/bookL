import {categories} from "../config/Constants";
import {ScrollView, Text, View, TouchableOpacity,StyleSheet} from "react-native";


const CategoriesComp = ({category,setCategory}) =>{
    return(
        <View style={styles.categoryContainer}>
            <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}>
                {
                    categories.map((item)=>(
                        category === item.name?
                            <TouchableOpacity onPress={()=>setCategory(item.name)} style={styles.chosenCategoryButton} key={item.id}>
                                <Text style={{fontSize: 16, color:'white', marginHorizontal: 8}}>{item.name}</Text>
                            </TouchableOpacity>:
                            <TouchableOpacity onPress={()=>setCategory(item.name)} style={styles.categoryButton} key={item.id}>
                                <Text style={{fontSize: 16, color:'white', marginHorizontal: 8}}>{item.name}</Text>
                            </TouchableOpacity>
                    ))
                }
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    categoryContainer:{
        flex:1,
        justifyContent:'center'
    },
    categoryButton:{
        marginRight:10,
        height:"80%",
        borderRadius:20,
        backgroundColor:"rgba(245,245,220, .1)",
        justifyContent:'center',
        alignItems:'center',

    },
    chosenCategoryButton:{
        marginRight:10,
        height:"80%",
        borderRadius:20,
        backgroundColor:"rgba(245,245,220, .3)",
        justifyContent:'center',
        alignItems:'center',

    }
})

export default CategoriesComp

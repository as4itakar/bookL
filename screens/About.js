import {View, Text, StyleSheet, ScrollView, SafeAreaView} from "react-native";
import Bar from "../components/Bar";
import TopSvg from "../components/TopSvg";
import {width} from "../config/Dimension";
import BottomSvg from "../components/BottomSvg";
import {Feather, Ionicons} from "@expo/vector-icons";

const About = () =>{
    return(
        <>
            <Bar/>
            <SafeAreaView style={styles.container}>
                <TopSvg customStyle={styles.topSvgStyle} h={150} customD={"M0,224L48,218.7C96,213,192,203,288,213.3C384,224,480,256,576,250.7C672,245,768,203,864,165.3C960,128,1056,96,1152,122.7C1248,149,1344,235,1392,277.3L1440,320L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"}/>
                <BottomSvg customStyle={styles.bottomSvgStyle} h={50} customD={"M0,0L48,42.7C96,85,192,171,288,192C384,213,480,171,576,170.7C672,171,768,213,864,229.3C960,245,1056,235,1152,197.3C1248,160,1344,96,1392,64L1440,32L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"}/>
                <View style={styles.aboutContainer}>
                    <Text style={{fontSize:50, color:'white', fontWeight:'bold'}}>О нас</Text>
                </View>
                <View style={styles.infoContainer}>
                    <View style={{width:'80%', height:'90%'}}>
                        <ScrollView showsVerticalScrollIndicator={false}>
                            <Text style={{fontSize:16}}>Давай скорей съебёмся, и отсюда убежим
                                Мен мучает тревога, нахуй всех и нахуй жизнь
                                Да, знаю, я странный, но и ты ебёшь мозги
                                Ты не куришь сигареты, выпиваешь за двоих
                                А, стой, хватит думать, думать могу за двоих
                                Её руки исполосоты, она ищет попить
                                А я думаю про деньги, как въебаться и не жить
                                Может выпрыгнем в окошко, может просто убежим
                                [Припев]
                                А может просто поебёмся
                                Может больше не проснёмся никогда
                                Может просто поебёмся
                                Может больше не проснёмся, не проснёмся
                                А может просто поебёмся, поёбёмся, пое-пое—
                                Может-Может-Мо-Мо-Может не проснёмся
                                Пое-Пое-Пое-Поебёмся
                                Не прос— Не прос— мо-мо—
                                Пое-Пое-Пое-Поебёмся
                                Мо-Мо-Может поебёмся

                                [Куплет 2: 17 SEVENTEEN & prombl]
                                Давай спиздим, разъебём эту машину
                                Я хочу нести хуйню в Инсте, по типу Паши Шина (Во-первых, я ща броук)
                                В та— В тачке пол бутылки не допито
                                Я сливаю деньги на хуйню, веду себя как гнида
                                А-а, мне не нужно нихуя-я-я
                                Заебла зима, мне нужно лишь тепла
                                Кажется, что нет меня-я-я
                                Купим два билета и съебёмся в рай
                                Навсегда, навсегда-а-а (Я, эй)
                                Да похуй
                                А-а-ай (Я-ай)</Text>
                        </ScrollView>
                    </View>
                </View>
                <View style={styles.pointsContainer}>
                    <View style={styles.pointsBox}>
                        <View style={{flex:1, flexDirection:'row',justifyContent:'flex-start',}}>
                            <Ionicons style={{marginRight:5}} name="location-outline" size={20} color="white" />
                            <Text style={{color:'white', fontSize:16}}>Казань, ул. Кремлёвская, 35</Text>
                        </View>
                        <View style={{flex:1, flexDirection:'row',justifyContent:'flex-start', }}>
                            <Ionicons style={{marginRight:5}} name="mail-outline" size={20} color="white" />
                            <Text style={{color:'white', fontSize:16}}>sevaobuxov61@gmail.com</Text>
                        </View>
                        <View style={{flex:1, flexDirection:'row',justifyContent:'flex-start'}}>
                            <Feather style={{marginRight:5}} name="phone" size={20} color="white" />
                            <Text style={{color:'white', fontSize:16}}>+1 234 568 91 23</Text>
                        </View>
                    </View>
                </View>
            </SafeAreaView>
        </>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        position:'relative'
    },
    topSvgStyle:{
        position:'absolute',
        top:0,
        height:200,
        width:width,
    },
    bottomSvgStyle:{
        position:'absolute',
        bottom:0,
        height:200,
        width:width,
    },
    aboutContainer:{
        height:180,
        justifyContent:'center',
        alignItems:'center'
    },
    infoContainer:{
        height:350,
        marginVertical:30,
        justifyContent:'center',
        alignItems:'center'
    },
    pointsContainer:{
        height:70,

    },
    pointsBox:{
        width:'50%',
        height:'100%',
        alignSelf:'center'

    }
})

export default About

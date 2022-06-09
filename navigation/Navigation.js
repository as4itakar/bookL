import {createDrawerNavigator} from "@react-navigation/drawer";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import Home from "../screens/Home";
import News from "../screens/News";
import Profile from "../screens/Profile";
import About from "../screens/About";
import CustomDrawer from "../components/CustomDrawer";
import {AntDesign, Feather, FontAwesome} from '@expo/vector-icons';
import Book from "../screens/Book";
import Login from "../screens/Login";
import {getUserFromDb} from "../func/actions";
import {useEffect, useState} from "react";
import Admin from "../screens/Admin";



const Stack = createNativeStackNavigator()

const Drawer = createDrawerNavigator()

const BooksNavigation = () =>{
    return(
        <Stack.Navigator screenOptions={{
            headerShown: false
        }}>
            <Stack.Screen name="Books" component={Home}/>
            <Stack.Screen name="Book" component={Book}/>
        </Stack.Navigator>
    )
}

export const LoginNavigation = () =>{
    return(
        <Stack.Navigator screenOptions={{
            headerShown: false
        }}>
            <Stack.Screen name="Login" component={Login}/>
        </Stack.Navigator>
    )
}

const Navigation = () =>{

    const [user, setUser] = useState([])

    const getUsers = async () =>{
        const user = await getUserFromDb()
        setUser(user)
    }

    useEffect(()=>{
        getUsers().then(()=>console.log('user'))
    }, [])

    return(
        <Drawer.Navigator drawerContent={props => <CustomDrawer {...props}/>} screenOptions={{headerShown: false, drawerInactiveTintColor:'black', drawerActiveTintColor:'white', drawerActiveBackgroundColor:'#FB7200', drawerLabelStyle:{marginLeft:-25}}}>
            <Drawer.Screen name='Книги' component={BooksNavigation} options={{
                drawerIcon: ({color}) =>(
                    <Feather name="book" size={22} color={color} />
                )
            }}/>
            <Drawer.Screen name='Новости' component={News} options={{
                drawerIcon: ({color}) =>(
                    <FontAwesome name="newspaper-o" size={22} color={color} />
                )
            }}/>
            <Drawer.Screen name='Профиль' component={Profile} options={{
                drawerIcon: ({color}) =>(
                    <FontAwesome name="user-circle-o" size={22} color={color} />
                )
            }}/>
            <Drawer.Screen name='О нас' component={About} options={{
                drawerIcon: ({color}) =>(
                    <AntDesign name="infocirlceo" size={22} color={color} />
                )
            }}/>
            {
                user[0]?.admin &&
                <Drawer.Screen name='Админ' component={Admin} options={{
                    drawerIcon: ({color}) =>(
                        <AntDesign name="infocirlceo" size={22} color={color} />
                    )
                }}/>
            }

        </Drawer.Navigator>
    )
}

export default Navigation

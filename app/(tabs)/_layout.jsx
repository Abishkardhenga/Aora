import { View, Text, Image } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'
import { icons } from '../../constants'


const TabIcon = ({ icon, focused, color, name }) => {
    return (
        <>
            <View className="flex-1 items-center justify-center gap-2">

                <Image source={icon} resizedMode="contain" tintColor={color} className="w-6 h-6" />
                <Text className={`${focused}?"font-psemibold":"font-pregular"  `} style={{ color: color }}>{name}</Text>
            </View>
        </>
    )

}

const TabLayout = () => {
    return (
        <>
            <Tabs screenOptions={{
                tabBarShowLabel: false,
                tabBarActiveTintColor:"#FFA001",
                tabBarInactiveTintColor:"#CDCDE0",
                tabBarStyle:{
                    backgroundColor:"#161622",
                    borderTopWidth:4,
                    borderTopColor:"#232533",
                    height:70
                }
            }}>
                <Tabs.Screen name='home' options={{
                    title: 'Home', headerShown: false, tabBarIcon: ({ color, focused }) => (

                        <TabIcon icon={icons.home} name={"Home"} focused={focused} color={color} />

                    )
                }} />
                <Tabs.Screen name='bookmark' options={{
                    title: 'bookmark', headerShown: false, tabBarIcon: ({ color, focused }) => (

                        <TabIcon icon={icons.bookmark} name={"bookmark"} focused={focused} color={color} />

                    )
                }} />
                <Tabs.Screen name='create' options={{
                    title: 'create', headerShown: false, tabBarIcon: ({ color, focused }) => (

                        <TabIcon icon={icons.plus} name={"create"} focused={focused} color={color} />

                    )
                }} />
                <Tabs.Screen name='profile' options={{
                    title: 'profile', headerShown: false, tabBarIcon: ({ color, focused }) => (

                        <TabIcon icon={icons.profile} name={"profile"} focused={focused} color={color} />

                    )
                }} />
             

            </Tabs>
        </>
    )
}

export default TabLayout
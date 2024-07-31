import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import { images } from "../constants"
import CustomButton from "../components/CustomButton"
import { router } from 'expo-router'

const Emptystate = ({ title, subtitle }) => {
    return (
        <View className="justify-center items-center px-4">
            <Image source={images.empty} className="w-[270px] h-[205px]" resizeMode='contain' />
            <Text className="text-xl text-center mt-2 font-psemibold text-white">
            {title   }           </Text>
            <Text className="text-sm font-pmedium text-gray-100">
{             subtitle
}            </Text>
<CustomButton title="Create Videos" handlePress={()=>{
    router.push("/create")
}} containerStyles="w-full my-5"/>
         
        </View>
    )
}

export default Emptystate

const styles = StyleSheet.create({})
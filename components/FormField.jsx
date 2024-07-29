import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'
import { icons } from '../constants'

const FormField = ({ title, value, otherStyles, handleChangeText, keyboardType, placeholder, ...props }) => {
    const [showPassword, setShowPassword] = useState(false)
    return (
        <View className={`space-y-2 ${otherStyles}`} >
            <Text className="text-base  text-gray-100 font-pmedium">{title}</Text>
            <View className="w-full h-16 border-2 flex-row px-4 border-black-200 rounded-2xl bg-black-100 focus:border-secondary items-center">
                <TextInput
                    className="flex-1 text-white text-base font-psemibold " value={value}
                    placeholder={placeholder} placeholderTextColor="#7b7b8b"
                    onChangeText={handleChangeText}
                    secureTextEntry={title === "Password" && !showPassword} />
                {title === "Password" ?
                    <TouchableOpacity onPress={() => {
                        setShowPassword(!showPassword)
                    }}>
                        <Image source={!showPassword ? icons.eye : icons.eyeHide} className="w-6 h-6" resizeMode='contain' />

                    </TouchableOpacity> : ""
                }
            </View>
        </View>
    )
}

export default FormField
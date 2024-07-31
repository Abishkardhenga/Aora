import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'
import { icons } from '../constants'

const SearchInput = ({ title, value, otherStyles, handleChangeText, keyboardType, placeholder, ...props }) => {
    const [showPassword, setShowPassword] = useState(false)
    return (
      
            <View className="w-full h-16 border-2 flex-row px-4 border-black-200 rounded-2xl bg-black-100 focus:border-secondary items-center space-x-4">
                <TextInput
                    className="text-base mt-0.5 text-white flex-1 font-pregular " value={value}
                    placeholder="Search for a Topic" placeholderTextColor="#7b7b8b"
                    onChangeText={handleChangeText}
                    secureTextEntry={title === "Password" && !showPassword} />
            <TouchableOpacity>
                <Image source={icons.search} className="w-5 h-5" resizeMode='content'/>
            </TouchableOpacity>
            </View>
    )
}

export default SearchInput
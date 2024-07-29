import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'

const CustomButton = ({ title, handlePress, containerStyles, textStyles, isLoading }) => {
  return (
    <TouchableOpacity onPress={handlePress} activeOpacity={0.7}
      className={`bg-secondary min-h-[62px] justify-center  items-center rounded-xl ${containerStyles}
     ${isLoading ? "opacity-50" : " "}`} disabled={isLoading}>
      <Text className={`text-primary font-psemibold text-lg  ${textStyles}`}>
        {title}
      </Text>
    </TouchableOpacity>
  )
}

export default CustomButton
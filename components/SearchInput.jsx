import { View, Text, TextInput, TouchableOpacity, Image, Alert } from 'react-native'
import React, { useState } from 'react'
import { icons } from '../constants'
import { router, usePathname } from 'expo-router'

const SearchInput = ({ title, value, otherStyles, handleChangeText, keyboardType, placeholder,initialQuery, ...props }) => {
const  pathname = usePathname()
console.log("pathname ", pathname)
const [query, setQuery] = useState(initialQuery || "" )
    return (
      
            <View className="w-full h-16 border-2 flex-row px-4 border-black-200 rounded-2xl bg-black-100 focus:border-secondary items-center space-x-4">
                <TextInput
                    className="text-base mt-0.5 text-white flex-1 font-pregular " value={query}
                    placeholder="Search for a Topic" placeholderTextColor="#CDCDE0"
                    onChangeText={(e)=>setQuery(e)}
                   />
            <TouchableOpacity onPress={()=>{
                if(!query) {
                    Alert.alert("Missing Query", "Please input something  to search result")
                }
                if(pathname.startsWith("/search")){
                    router.setParams({query})
                }
                else{
                    router.push(`/search/${query}`)
                }
            }}>
                <Image source={icons.search} className="w-5 h-5" resizeMode='content'/>
            </TouchableOpacity>
            </View>
    )
}

export default SearchInput
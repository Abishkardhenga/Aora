import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { icons } from '../constants'


const VideoCard = ({ video: { title, thumbnail, prompt, video, users: { email, username, avatar } } }) => {

    const [play, setPlay] = useState(false)
    return (
        <View className="flex-col items-center px-4 mb-14 ">
            <View className="flex-row items-start gap-3">
                <View className="justify-center items-center flex-row flex-1">

                    <View className="w-[46px] h-[46px] rounded-lg border  border-secondary justify-center items-center p-0.5">

                        <Image source={{ uri: avatar }} className="w-full h-full rounded-lg" resizeMode='cover' />
                    </View>
                    <View className="flex-1 justify-center gap-y-1 ml-3 text-white font-psemibold text-sm ">

                        <Text className="text-sm font-psemibold text-white" numberOfLines={1}>{title}</Text>
                        <Text className="font-pregular text-gray-100 text-xs" numberOfLines={1}>
                            {username}
                        </Text>

                    </View>
                </View>
                <View className="pt-2">
                    <Image className="w-5 h-5" source={icons.menu} resizeMode='contain' />
                </View>

            </View>
            {play ?
                <Text className="text-white">
                    Video Playing

                </Text>


                : <TouchableOpacity activeOpacity={0.7} onPress={() => setPlay(true)} className="h-60 w-full rounded-xl relative  justify-center items-center ">
                    <Image source={{ uri: thumbnail }} className="w-full h-full rounded-xl mt-3 " resizeMode='cover' />
                    <Image source={icons.play} className="w-12 h-12 absolute " resizeMode='contain' />
                </TouchableOpacity>}
        </View>
    )
}

export default VideoCard


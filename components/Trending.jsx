import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import * as Animatable from "react-native-animatable"
import { icons } from '../constants'
import  { Video, ResizeMode } from "expo-av"

const zoomIn = {
    0: {
        scale: 0.9
    },
    1: {

        scale: 1.1
    }

}

const zoomOut = {
    0: {
        scale: 1
    },
    1: {

        scale: 0.9
    }

}

const TrendingItem = ({ activeItem , item }) => {
    const  [play , setPlay] = useState(false)
    return (
        <Animatable.View className="mr-5" animation={ activeItem === item.$id ? zoomIn : zoomOut}>
           {play?(
            <Video source={{uri:item.Video}} className="w-52 h-72 rounded-[35px] mt-3 bg-white/10" resizeMode={ResizeMode.CONTAIN} useNativeControls 
            shouldPlay  onPlaybackStatusUpdate={(status)=>{if(status.didJustFinish){
                setPlay(false)
            }}}/>
           ):<TouchableOpacity className="relative justify-center items-center" activeOpacity={0.7} onPress={()=>setPlay(true)}>
            
            <Image source={{uri:item.thumbail}} className="w-52 h-72 rounded-[35px] my-5 overflow-hidden shadow-lg shadow-black/40" resizeMode='cover'/>
           
           <Image source={icons.play} className="absolute w-12 h-12" resizeMode='contain'/>
            </TouchableOpacity>}
        </Animatable.View>
    )
}

const Trending = ({ posts }) => {

    const [active, setActive] = useState(posts[0])


    const viewableItemChanged = ({viewableItem})=>{

        if(viewableItem.lenght > 0){
            setActive(viewableItem[0].key)
        } 
    }
    return (
        <FlatList data={posts} keyExtractor={(item) => (item.$id)} renderItem={({ item }) => (
            <TrendingItem activeItem={active} item={item}/>
        

        )}

        onViewableItemsChanged={viewableItemChanged}

        viewabilityConfig={
           { itemVisiblePercentThreshold:70}
        }
        contentOffset={{x:170}}
            horizontal />
    )
}

export default Trending


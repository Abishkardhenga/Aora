import { Alert, Image, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { icons } from '../constants'
import { Video, ResizeMode } from 'expo-av'
import { useGlobalContext } from '../context/GlobalProvider'
import { createBookmark, deleteBookmark, deletePost, GetPostDetailById } from '../lib/appwrite'
import { router } from 'expo-router'

const VideoCard = ({ video: { title, thumbnail, prompt, video, $id, users: { email, username, avatar } ,}, containerStyles, type }) => {
    

    const [menuOpened, setMenuOpened] = useState(false)
    const [creatingBookmark, setCreatingBookmark] = useState(false)
    const [play, setPlay] = useState(false)
    const { user , editingData , setEditingData , setEditMode} = useGlobalContext()

    const saveToBookmark = async () => {
        setCreatingBookmark(true)

        try {
            const res = await createBookmark(user.$id, $id)
            Alert.alert("Success", "Video is saved to bookmark")
        } catch (error) {
            throw new Error(error)
        } finally {
            setCreatingBookmark(false)
        }
    }

    const menuFunction = () => {
        setMenuOpened(!menuOpened)
    }
   

    const  editPost = async(postId)=>{

        console.log("editinPost", postId)
        

    
        try {
            console.log("PostId", postId)
           const data =  await GetPostDetailById(postId)
           setEditingData(data)
           setEditMode(true)

           router.push("create")


        
        } catch (error) {
            throw new Error(error)
            
        }
        
    }



const deleteProfilePost = async (profileId)=>{
    console.log("Delete the id", profileId)
    try {
        const result = await deletePost(profileId)
        Alert.alert("Success", "Successfully deleted the post")
    } catch (error) {
        throw new Error(error)
        
    }
}

const deleteBookmarkPost = async()=>{
    try {
    const result =     await deleteBookmark()
        
    } catch (error) {
        throw new Error(error)
        
    }

}

    return (
        <View className={`flex-col items-center px-4 mb-14 ${containerStyles}`}>
            <View className="flex-row items-start gap-3">
                <View className="justify-center items-center flex-row flex-1">
                    <View className="w-[46px] h-[46px] rounded-lg border border-secondary justify-center items-center p-0.5">
                        <Image source={{ uri: avatar }} className="w-full h-full rounded-lg" resizeMode='cover' />
                    </View>
                    <View className="flex-1 justify-center gap-y-1 ml-3 text-white font-psemibold text-sm">
                        <Text className="text-sm font-psemibold text-white" numberOfLines={1}>{title}</Text>
                        <Text className="font-pregular text-gray-100 text-xs" numberOfLines={1}>{username}</Text>
                    </View>
                </View>
                <View className="pt-2 relative">
                    <TouchableOpacity onPress={menuFunction}>
                        <Image className="w-5 h-5" source={icons.menu} resizeMode='contain' />
                    </TouchableOpacity>
                    {menuOpened && (
                        <>
                            <TouchableOpacity onPress={saveToBookmark} className="absolute right-0 z-10 top-8 p-2 rounded-lg">
                                <Image source={icons.bookmark} className="w-5 h-8" resizeMode='contain' />
                            </TouchableOpacity>

                            {type === "bookmark" && (
                                <TouchableOpacity className="absolute right-0 z-10 top-20 p-2 rounded-lg bg-white">
                                    <Image source={icons.remove} className="w-5 h-8" resizeMode='contain' style={{ tintColor: 'black' }} />
                                </TouchableOpacity>
                            )}

                            {type === "Profile" && (
                                <>
                                    <TouchableOpacity onPress={()=>deleteProfilePost($id)} className="absolute right-0 z-10 top-20 p-2 rounded-lg bg-white">
                                        <Image source={icons.remove} className="w-5 h-8" resizeMode='contain' style={{ tintColor: 'black' }} />
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={()=>editPost($id)} className="absolute right-0 z-10 top-32 p-2 rounded-lg bg-white">
                                        <Image source={icons.edit} className="w-5 h-8" resizeMode='contain' style={{ tintColor: 'black' }} />
                                    </TouchableOpacity>
                                </>
                            )}
                        </>
                    )}
                </View>
            </View>
            {play ? (
                <Video source={{ uri: video }} className="w-full h-60 rounded-xl mt-3" resizeMode={ResizeMode.CONTAIN} useNativeControls shouldPlay
                    onPlaybackStatusUpdate={(status) => {
                        if (status.didJustFinish) {
                            setPlay(false)
                        }
                    }} />
            ) : (
                <TouchableOpacity activeOpacity={0.7} onPress={() => setPlay(true)} className="h-60 w-full rounded-xl relative justify-center items-center">
                    <Image source={{ uri: thumbnail }} className="w-full h-full rounded-xl mt-3" resizeMode='cover' />
                    <Image source={icons.play} className="w-12 h-12 absolute" resizeMode='contain' />
                </TouchableOpacity>
            )}
        </View>
    )
}

export default VideoCard

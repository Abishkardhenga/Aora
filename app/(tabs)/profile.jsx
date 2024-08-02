


import { View, Text, SafeAreaView, FlatList, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { router, useLocalSearchParams } from 'expo-router'
import useAppwrite from '../../lib/useAppwrite'
import { GetUserPost, signOut } from '../../lib/appwrite'
import { useGlobalContext } from '../../context/GlobalProvider'
import { StatusBar } from 'expo-status-bar'
import { icons } from '../../constants'
import InfoBox from '../../components/InfoBox'
import Emptystate from '../../components/Emptystate'
import VideoCard from '../../components/VideoCard'

const Profile = () => {
    const  { isLoggedIn, setUser, setIsLoggedIn, setIsLoading, user, isLoading} = useGlobalContext()

     const { query } = useLocalSearchParams()
       const { data: posts, refetch } = useAppwrite(()=>GetUserPost(user.$id))



   const logout = async()=>{
 await signOut()   
  setUser(null)
  setIsLoggedIn(false)
  router.replace("/sign-in")
   }

     
    
  return (
    <SafeAreaView className="bg-primary  h-full">
    <StatusBar style='light' />
    <FlatList
      data={posts}
      keyExtractor={(item) => item.$id} renderItem={({ item }) => {
        return (
          <VideoCard video={item} />
        )
      }} ListHeaderComponent={() => (

    <View className="w-full justify-center items-center  mt-7 mb-12 px-4">

      <TouchableOpacity className="w-full mb-10 items-end" onPress={logout}>

        <Image source={icons.logout} resizeMode='contain' className= "w-6 h-6"/>
      </TouchableOpacity>
      <View className="h-16 w-16 rounded-lg border border-secondary justify-center items-center ">
        <Image source={{uri:user?.avatar}} className="w-[90%] h-[90%] rounded-lg" resizeMode="cover"/>

      </View>
      <InfoBox   title={user?.username} containerStyles="mt-5" titleStyles="text-lg" />
      <View className="mt-5 flex-row ">
      <InfoBox   title={posts.length || 0} subtitle="Posts" containerStyles="mr-10" titleStyles="text-xl" />
      <InfoBox   title="1.2k subscriber" subtitle="Followers"  titleStyles="text-xl" />

      </View>

    </View>
      )} ListEmptyComponent={() => (

        <Emptystate title="No videos Found" subtitle="No videos found for this search query" />
      )} />
  </SafeAreaView>
  )
}

export default Profile
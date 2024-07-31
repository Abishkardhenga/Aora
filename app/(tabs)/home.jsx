import { View, Text, SafeAreaView, FlatList, Image, RefreshControl, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { images } from '../../constants'
import SearchInput from '../../components/SearchInput'
import Trending from '../../components/Trending'
import Emptystate from '../../components/Emptystate'
import { StatusBar } from 'expo-status-bar'
import { GetAllPost, GetCurrentUser } from '../../lib/appwrite'
import useAppwrite from '../../lib/useAppwrite'
import VideoCard from '../../components/VideoCard'

const home = () => {
  const [ refreshing  ,setRefreshing ] = useState(false)
  const  {data : posts, refetch } = useAppwrite(GetAllPost)
  console.log("this is post", posts)
 
  const onRefresh =  async ()=>{
    await refetch()
    setRefreshing(true)
  }

 
  return (
    <SafeAreaView className="bg-primary  h-full">
      <StatusBar style='light'/>
      <FlatList
       data={posts} 
       keyExtractor={(item) => item.$id} renderItem={({ item }) => {
        return (
          <VideoCard video={item}/>
        )
      }} ListHeaderComponent={() => (
        <View className="my-6 px-4 space-y-6">
          <View className="justify-between mb-6 items-start flex-row">
            <View>
              <Text className="text-sm font-pmedium text-gray-100">
                Welcome Back
              </Text>
              <Text className="text-2xl font-psemibold text-white">
                Aabiskar dhenga              </Text>
            </View>
            <View className="mt-1.5">
              <Image source={images.logoSmall} className="h-10 w-9" resizeMode='content' />

            </View>

          </View>
          <SearchInput />
          <View className="w-full flex-1 pt-5 pb-8">
            <Text className="text-gray-100 font-pregular mb-3 text-lg">
              Latest Videos
            </Text>
<Trending posts={[{id:1}, {id:2}, {id:3}]?? []}/>
          </View>
        </View>
      )} ListEmptyComponent={()=>(

       <Emptystate title="No videos Found" subtitle="Be the first one to upload the video"/>
      )} refreshControl={<RefreshControl/>} refreshing={refreshing} onRefresh={onRefresh} />
    </SafeAreaView>
  )
}

export default home
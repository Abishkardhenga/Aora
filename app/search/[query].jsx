import { View, Text, SafeAreaView, FlatList, Image, RefreshControl, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { images } from '../../constants'
import SearchInput from '../../components/SearchInput'
import Trending from '../../components/Trending'
import Emptystate from '../../components/Emptystate'
import { StatusBar } from 'expo-status-bar'
import { GetAllPost, GetCurrentUser, GetLatestPost, searchPosts } from '../../lib/appwrite'
import useAppwrite from '../../lib/useAppwrite'
import VideoCard from '../../components/VideoCard'
import { useLocalSearchParams } from 'expo-router'

const Search = () => {
  const { query } = useLocalSearchParams()
  const { data: posts, refetch } = useAppwrite(()=>searchPosts(query))
  console.log("query ", query)
  console.log("post ", posts)


  useEffect(() => {
    refetch()
  }, [query])
  return (
    <SafeAreaView className="bg-primary  h-full">
      <StatusBar style='light' />
      <FlatList
        data={posts}
        keyExtractor={(item) => item.$id} renderItem={({ item , index}) => {
          return (
            <VideoCard key={`${Math.floor(Math.random()*10000)}-${index}`} video={item} />
          )
        }} ListHeaderComponent={() => (
          <View className="my-6 px-4 ">
                <Text className="text-sm font-pmedium text-gray-100">
                  Search REsults
                </Text>
                <Text className="text-2xl font-psemibold text-white">
                  {query}            </Text>

                  <View className="mt-6 mb-8">

                <SearchInput initialQuery = {query} />
                  </View>




          </View>
        )} ListEmptyComponent={() => (

          <Emptystate title="No videos Found" subtitle="No videos found for this search query" />
        )} />
    </SafeAreaView>
  )
}

export default Search
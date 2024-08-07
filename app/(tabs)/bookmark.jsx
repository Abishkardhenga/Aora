import { View, Text, SafeAreaView, ScrollView, FlatList } from 'react-native'
import React, { useEffect } from 'react'
import { getBookmark } from '../../lib/appwrite'
import useAppwrite from '../../lib/useAppwrite'
import { useGlobalContext } from '../../context/GlobalProvider'
import VideoCard from '../../components/VideoCard'
import { StatusBar } from 'expo-status-bar'
import SearchInput from '../../components/SearchInput'

const Bookmark = () => {
  const { user } = useGlobalContext()

  const { data: bookmarkdata } = useAppwrite(() => getBookmark(user.$id))

  console.log("this is bookmarkdata", bookmarkdata)
  return (
    <SafeAreaView className="bg-primary h-full">
      <StatusBar style='light' />

        <FlatList data={bookmarkdata} keyExtractor={(item) => item.$id}
       renderItem={({ item, index }) => {
        return (
          <View className="mt-7">

          <VideoCard  key={`${item.$id}-${index}`} type="bookmark" video={item} containerStyles=""  />
          </View>
        )
      }}
          ListHeaderComponent={() => (
            <SafeAreaView>
              <View className="w-full flex-1">
                <View className="mt-7 ">
                  <Text className="text-white text-3xl font-psemibold">
                    Saved Videos
                  </Text>
                </View>
                <View>

                <SearchInput placeholder="Search your saved videos"/>
                </View>
              </View>
            </SafeAreaView>
          )

          } />
    </SafeAreaView>

  )
}

export default Bookmark
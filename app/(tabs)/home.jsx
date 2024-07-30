import { View, Text, SafeAreaView, FlatList } from 'react-native'
import React from 'react'

const home = () => {
  return (
    <SafeAreaView className="bg-primary ">
      <FlatList data={[{ id: 1 }, { id: 2 }, { id: 3 }]} keyExtractor={(item) => item.$id} renderItem={({ item }) => {
        return (
          <Text className="text-3xl text-white">{item.id}</Text>
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

          </View>

        </View>
      )} />
    </SafeAreaView>
  )
}

export default home
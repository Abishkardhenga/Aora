import { View, Text, SafeAreaView, ScrollView, Image } from 'react-native'
import React, { useState } from 'react'
import FormField from '../../components/FormField'
import { TouchableOpacity } from 'react-native-web'
import { ResizeMode, Video } from 'expo-av'
import { icons } from '../../constants'
import CustomButton from '../../components/CustomButton'

const Create = () => {
  const [form, setForm] = useState({
    title: "",
    thumbnail: null,
    video: null,
    prompt: "",

  })
  const [uploading, setUploading] = useState(false)


  const submit = ()=>{

  }
  return (
    <SafeAreaView className="h-full bg-primary">
      <ScrollView className="px-4 my-6">

        <Text className="text-2xl text-white font-psemibold">
          Upload Video
        </Text>
        <FormField title="Video Title" value={form.title} placeholder="Give Your video a catch title ..." handleChangeText={(e) => setForm({ ...obj, title: e })}
          otherStyles="mt-10" />
        <View className="mt-7 space-y-2">
          <Text className="text-base text-gray-100 font-pmedium">
            Upload Video
          </Text>
          <TouchableOpacity>
            {form.video ? <Video className="w-full h-64 rounded-2xl" source={{ uri: form.video.uri }} useNativeControls isLooping resizeMode={ResizeMode.COVER} /> : (
              <View className="w-full h-40 px-4 rounded-2xl  justify-center items-center bg-black-100">
                <View className="h-14 w-14 justify-center border border-dashed  border-secondary-100 items-center">
                  <Image source={icons.upload} className="w-1/12 h-1/12" resizeMode='contain' />

                </View>


              </View>
            )}
          </TouchableOpacity>

        </View>
        <View className="mt-7 space-y-2 ">
        <Text className="text-2xl text-white font-psemibold">
          Upload Thumnail Images
        </Text>
        <TouchableOpacity>
            {form.thumbnail ? (
            <Image source={{uri:form.thumbnail.uri}} className="w-full h-64 rounded-2xl" resizeMode='cover'/>
            )  : (
              <View className="w-full h-16 px-4 rounded-2xl  justify-center flex-row space-x-2 items-center bg-black-100 border-2 border-black-200">
                  <Image source={icons.upload} className="w-5 h-5" resizeMode='contain' />

<Text className="text-gray-100 text-sm font-pmedium">
  Choose a file
</Text>


              </View>
            )}
          </TouchableOpacity>

        </View>
        <FormField title="AI Prompt" value={form.prompt} placeholder="The Prompt you used to create this video" handleChangeText={(e) => setForm({ ...obj, prompt: e })}
          otherStyles="mt-7" />
          <CustomButton title="submit & Publish " handlePress={submit} containerStyles="mt-7" isLoading={up}/>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Create 
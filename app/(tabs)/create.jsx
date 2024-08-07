import { View, Text, SafeAreaView, ScrollView, Image,TouchableOpacity, Alert } from 'react-native'
import React, { useState } from 'react'
import FormField from '../../components/FormField'
import { ResizeMode, Video } from 'expo-av'
import { icons } from '../../constants'
import CustomButton from '../../components/CustomButton'
import * as DocumentPicker from "expo-document-picker"
import { createVideo, updatePost } from '../../lib/appwrite'
import { router } from 'expo-router'
import { useGlobalContext } from '../../context/GlobalProvider'

const Create = () => {
  const  [ editMode , setEditMode] = useState(false)

  const { user,editingData } =  useGlobalContext()
  const [form, setForm] = useState({
    title: "",
    thumbnail: null,
    video: null,
    prompt: "",

  })
  const [uploading, setUploading] = useState(false)


  const update = async(updatedPost)=>{
    setEditMode(true)
    try {
      await updatePost(updatePost)
      Alert.alert("Success", "successfuly update the data")
      
    } catch (error) {
      throw error  ; 
    }
    finally{
      setEditMode(false)
    }

  }


  const openPicker = async(selectType)=>{
    const result = await DocumentPicker.getDocumentAsync({
      type:selectType === "image" ? ["image/png", "image/jpeg"] : ["video/mp4", "video/gif"]
    })
    if(!result.canceled){

      if(selectType === "image"){
        setForm({...form ,   thumbnail:result.assets[0]})
        
      }
      if(selectType === "video"){
        setForm({...form ,   video:result.assets[0]})

      }

    }
  

  }


  const submit =async ()=>{

    if(!form.title || !form.thumbnail || !form.video || !form.prompt){
      Alert.alert("Missing", "Please  Enter all the fields ")
    }
  setUploading(true)
  try {
    const data = await createVideo({
      ...form , userId : user.$id
    })

    Alert.alert("Success", "Post uploaded  successfully")

    router.push("/home")
    
  } catch (error) {
    Alert.alert("Error", error.message)
    
  }
  finally{
    setForm({
      title: "",
      thumbnail: null,
      video: null,
      prompt: "",
    })
    setUploading(false)

  }
  }
  return (
    <SafeAreaView className="h-full bg-primary">
      <ScrollView className="px-4 my-6">

        <Text className="text-2xl text-white font-psemibold">
          Upload Video
        </Text>
        <FormField title="Video Title" value={form.title} placeholder="Give Your video a catch title ..." handleChangeText={(e) => setForm({ ...form, title: e })}
          otherStyles="mt-10" />
        <View className="mt-7 space-y-2">
          <Text className="text-base text-gray-100 font-pmedium">
            Upload Video
          </Text>
          <TouchableOpacity  onPress={()=>openPicker("video")}>
            {form.video ? <Video className="w-full h-64 rounded-2xl" source={{ uri: form.video.uri }}  resizeMode={ResizeMode.COVER} /> : (
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
        <TouchableOpacity onPress={()=>openPicker("image")}>
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
        <FormField title="AI Prompt" value={form.prompt} placeholder="The Prompt you used to create this video" handleChangeText={(e) => setForm({ ...form, prompt: e })}
          otherStyles="mt-7" />
          <CustomButton    title={`${editMode?"Updata":"Submit & Push"}`}  handlePress={`${editMode? update: submit}`} containerStyles="mt-7" isLoading={uploading}/>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Create 
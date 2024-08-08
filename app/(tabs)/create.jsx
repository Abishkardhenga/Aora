import { View, Text, SafeAreaView, ScrollView, Image, TouchableOpacity, Alert } from 'react-native';
import React, { useState, useEffect } from 'react';
import FormField from '../../components/FormField';
import { ResizeMode, Video } from 'expo-av';
import { icons } from '../../constants';
import CustomButton from '../../components/CustomButton';
import * as DocumentPicker from "expo-document-picker";
import { createVideo, updatePost } from '../../lib/appwrite';
import { router } from 'expo-router';
import { useGlobalContext } from '../../context/GlobalProvider';

const Create = () => {
  const { user, editingData, editMode, setEditMode ,setEditingData} = useGlobalContext();
  console.log("Editing Data id", editingData?.$id);


  const [form, setForm] = useState({
    title: editMode ? editingData.title : "",
    thumbnail: editMode ? editingData.thumbnail : null,
    video: editMode ? editingData.video : null,
    prompt: editMode ? editingData.prompt : "",
  });

  const resetState = ()=>{
    setForm({
      title: "",
      thumbnail: null,
      video: null,
      prompt: "",
    });

  }
  useEffect(() => {
    if (editMode && editingData) {
      setForm({
        title: editingData?.title,
        thumbnail: editingData?.thumbnail,
        video: editingData?.video,
        prompt: editingData?.prompt,
      });
    }
  }, [editMode, editingData]);
  
  
  const [uploading, setUploading] = useState(false);
  

  const update = async () => {
    try {
      console.log("editijg data id ", editingData.$id)
      await updatePost(editingData?.$id,form);
      setEditMode(false)
      setEditingData(null)
      resetState()
      Alert.alert("Success", "Successfully updated the data");
    } catch (error) {
      Alert.alert("Error", error.message);
    } finally {
      setEditMode(false);
      setEditingData(null)

    }
  };

  const openPicker = async (selectType) => {
    const result = await DocumentPicker.getDocumentAsync({
      type: selectType === "image" ? ["image/png", "image/jpeg"] : ["video/mp4", "video/gif"]
    });
    if (!result.canceled) {
      if (selectType === "image") {
        setForm({ ...form, thumbnail: result.assets[0] });
      } else if (selectType === "video") {
        setForm({ ...form, video: result.assets[0] });
      }
    }
  };

  const submit = async () => {
    if (!form.title || !form.thumbnail || !form.video || !form.prompt) {
      Alert.alert("Missing", "Please enter all the fields");
      return;
    }
    setUploading(true);
    try {
      await createVideo({ ...form, userId: user.$id });
      Alert.alert("Success", "Post uploaded successfully");
      router.push("/home");
    } catch (error) {
      Alert.alert("Error", error.message);
    } finally {
      resetState()
      setUploading(false);
    }
  };

  return (
    <SafeAreaView className="h-full bg-primary">
      <ScrollView className="px-4 my-6">
        <Text className="text-2xl text-white font-psemibold">{

          editMode ? "Update Video":"Upload Video"
      }</Text>
        <FormField
          title="Video Title"
          value={form.title}
          placeholder="Give your video a catchy title ..."
          handleChangeText={(e) => setForm({ ...form, title: e })}
          otherStyles="mt-10"
        />
        <View className="mt-7 space-y-2">
          <Text className="text-base text-gray-100 font-pmedium">Upload Video</Text>
          <TouchableOpacity onPress={() => openPicker("video")}>
            {editMode ? (
              <Video className="w-full h-64 rounded-2xl" source={{ uri: form.video }} resizeMode={ResizeMode.COVER} />
            ) : form.video ? (
              <Video className="w-full h-64 rounded-2xl" source={{ uri: form.video.uri  }} resizeMode={ResizeMode.COVER} />
            ) : (
              <View className="w-full h-40 px-4 rounded-2xl justify-center items-center bg-black-100">
                <View className="h-14 w-14 justify-center border border-dashed border-secondary-100 items-center">
                  <Image source={icons.upload} className="w-1/12 h-1/12" resizeMode="contain" />
                </View>
              </View>
            )}
          </TouchableOpacity>
        </View>
        <View className="mt-7 space-y-2">
          <Text className="text-2xl text-white font-psemibold">Upload Thumbnail Images</Text>
          <TouchableOpacity onPress={() => openPicker("image")}>
            {editMode ? (
              <Image source={{uri: form.thumbnail }} className="w-full h-64 rounded-2xl" resizeMode="cover" />
            ) : form.thumbnail ? (
              <Image source={{uri:  form.thumbnail.uri  }} className="w-full h-64 rounded-2xl" resizeMode="cover" />
            ) : (
              <View className="w-full h-16 px-4 rounded-2xl justify-center flex-row space-x-2 items-center bg-black-100 border-2 border-black-200">
                <Image source={icons.upload} className="w-5 h-5" resizeMode="contain" />
                <Text className="text-gray-100 text-sm font-pmedium">Choose a file</Text>
              </View>
            )}
          </TouchableOpacity>
        </View>
        <FormField
          title="AI Prompt"
          value={form.prompt}
          placeholder="The prompt you used to create this video"
          handleChangeText={(e) => setForm({ ...form, prompt: e })}
          otherStyles="mt-7"
        />
        <CustomButton
          title={editMode ? "Update" : "Submit"}
          handlePress={editMode ? update : submit}
          containerStyles="mt-7"
          isLoading={uploading}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Create;

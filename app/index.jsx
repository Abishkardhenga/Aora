import { Text, View, ScrollView, Image } from 'react-native';
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import { images } from "../constants"
import CustomButton from '../components/CustomButton';
import { Redirect, router } from 'expo-router';
import { useGlobalContext } from '../context/GlobalProvider';

const App = () => {

  const { isLoading , isLoggedIn} = useGlobalContext()
  if(!isLoading && isLoggedIn) return <Redirect href='/home'/>

  return (

    <SafeAreaView className="bg-primary h-full">
            <StatusBar backgroundColor='#161622' style='light'/>

      <ScrollView contentContainerStyle={{ height: "100%" }} >
        <View className="w-full justify-center min-h-[85vh] items-center px-4">
          <Image source={images.logo} className="h-[84px] w-[130px]" resizeMode='contain' />
          <Image source={images.cards} className="m-h-[400px] h-[360px] w-full" resizeMode='contain' />
          <View className="relative mt-5 ">
            <Text className="text-white font-bold  text-3xl text-center">
              Discover Endless Opportunities with  {""}
              <Text className="text-secondary-200">
                Aora
              </Text>
            </Text>

            <Image source={images.path} className=" w-[136px] h-[15px] absolute -right-8 -bottom-2 " resizeMode='contain'/>
          </View>
          <Text className="text-gray-100  font-pregular mt-7 text-center  text-sm font-bold">
            Where creativity meets the innovation . Explore Endless opportunities witho Aora
          </Text>
<CustomButton title={"Continue with email"} handlePress={()=>{

router.push("/sign-in")}} containerStyles="w-full mt-7" textStyles="text-black "/>
        </View>

      </ScrollView>

    </SafeAreaView>
  );
};

export default App;

import { View, Text, ScrollView, Image, Alert } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { images } from '../../constants'
import FormField from '../../components/FormField'
import CustomButton from '../../components/CustomButton'
import { Link, router } from 'expo-router'
import { GetCurrentUser, SignIn } from '../../lib/appwrite'
import { useGlobalContext } from '../../context/GlobalProvider'

const Signin = () => {
  const [form, setForm] = useState({
    email: "",
    password: ""
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const  { setIsLoggedIn, setUser} = useGlobalContext()

  const submit = async() => {
    if(!form.email || !form.password ){
      return Alert.alert("Error", "Please fill all the input")
     }
    setIsSubmitting(true)

    try {
  
     await SignIn(form.email, form.password)
     const user  = await GetCurrentUser()
     setIsLoggedIn(true)
     setUser(user)
     Alert.alert("Successfull", "User Login successfully")
   
      router.replace('/home')

    } catch (error) {
      Alert.alert("Error", error.message)
      
      
    }
    finally{
      setIsSubmitting(false)
    }
   
  }
  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView >
        <View className="w-full min-h-[85vh] justify-center px-4 my-6">
          <Image source={images.logo} className="w-[115px] h-[35px] " resizeMode='contain' />
          <Text className="font-psemibold text-white text-2xl mt-10">
            Login to Aora        </Text>
          <FormField title="Email" value={form.email} otherStyles="mt-7" keyboardType="email-address" handleChangeText={(e) => {
            setForm({
              ...form, email: e
            })
          }} />
          <FormField title="Password" value={form.password} otherStyles="mt-7" handleChangeText={(e) => {
            setForm({
              ...form, password: e
            })
          }} />


          <CustomButton title="Login" containerStyles="mt-7" handlePress={submit} isLoading={isSubmitting} />
          <View className="justify-center pt-5 flex-row gap-2">
            <Text className="text-lg  text-gray-100 font-pregular">
              Dont't have an Account
            </Text>
          <Link href="/sign-up" className='text-lg font-psemibold text-secondary'>
          Signup
          
          </Link>

          </View>
        </View>

      </ScrollView>

    </SafeAreaView>
  )
}

export default Signin
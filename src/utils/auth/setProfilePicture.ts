import { useAuthStore } from '@/src/state/Auth'
import * as ImagePicker from 'expo-image-picker'
import supabase from '../supabase'

export async function uploadProfilePicture() {
  const { user } = useAuthStore.getState()
  if (!user) throw new Error('User not logged in')

  // Ask permission to access photos
  const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync()
  if (status !== 'granted') {
    throw new Error('Permission to access media library is required!')
  }

  // Let user pick an image
  const result = await ImagePicker.launchImageLibraryAsync({
    allowsEditing: true,
    aspect: [1, 1],
    quality: 0.8,
  })

  if (result.canceled) return null

  const file = result.assets[0]
  const ext = file.uri.split('.').pop()
  const fileName = `${user.id}-${Date.now()}.${ext}`

  // Fetch the file into a blob (needed for upload)
  const response = await fetch(file.uri)
  const blob = await response.blob()

  // Upload to Supabase Storage
  const { error } = await supabase.storage
    .from('users')
    .upload(fileName, blob, {
      contentType: 'image/jpeg',
      upsert: true,
    })

  if (error) throw error

  // Get public URL (if bucket is public)
  const { data: publicUrlData } = supabase.storage
    .from('users')
    .getPublicUrl(fileName)

  const publicUrl = publicUrlData.publicUrl

  // Update user's profile row
  const { error: updateError } = await supabase
    .from('users')
    .update({ profile_picture: publicUrl })
    .eq('id', user.id)

  if (updateError) throw updateError

  return publicUrl
}

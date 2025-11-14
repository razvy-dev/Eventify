import { useAuthStore } from '@/src/state/Auth'
import * as FileSystem from 'expo-file-system'
import * as ImagePicker from 'expo-image-picker'
import supabase from '../supabase'

export async function uploadProfilePicture() {
  const { user } = useAuthStore.getState()
  if (!user) throw new Error('User not logged in')

  // Pick image
  const result = await ImagePicker.launchImageLibraryAsync({
    allowsEditing: true,
    aspect: [1, 1],
    quality: 0.8,
    base64: true,
  })

  if (result.canceled || !result.assets?.length) return null

  const file = result.assets[0]

  // Get base64 safely (from picker or from filesystem)
  let base64 = file.base64

  if (!base64) {
    base64 = await FileSystem.readAsStringAsync(file.uri, {
      encoding: FileSystem.EncodingType.Base64,
    })
  }

  const ext = file.uri.split('.').pop() || 'jpg'
  const fileName = `${user.id}-${Date.now()}.${ext}`

  // Upload to Supabase as base64
  const { data, error: uploadError } = await supabase.storage
    .from('users')
    .upload(fileName, decodeBase64(base64), {
      contentType: file.mimeType || `image/${ext}`,
      upsert: true,
    })

  if (uploadError) throw uploadError

  // Get public URL
  const { data: { publicUrl } } = supabase.storage
    .from('users')
    .getPublicUrl(fileName)

  // Update user row
  const { error: updateError } = await supabase
    .from('users')
    .update({ profile_picture: publicUrl })
    .eq('id', user.id)

  if (updateError) throw updateError

  return publicUrl
}

// Helper: convert base64 → Uint8Array
function decodeBase64(base64) {
  const binary = atob(base64)
  const len = binary.length
  const bytes = new Uint8Array(len)

  for (let i = 0; i < len; i++) {
    bytes[i] = binary.charCodeAt(i)
  }

  return bytes
}

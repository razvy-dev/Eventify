import { useAuthStore } from "@/src/state/Auth"
import { signOutUser } from "@/src/utils/auth/signOut"
import { Redirect, router } from "expo-router"
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

export default function Account() {
  const { user, session, loading } = useAuthStore()

  console.log("User", user)
  console.log("Session", session)

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={{ color: "#ccc", textAlign: "center" }}>Loading...</Text>
      </SafeAreaView>
    )
  }

  if (!session || !user) {
    return <Redirect href="/Auth/LogIn" />
  }

  const handleSignOut = async () => {
    try {
      await signOutUser()
      router.replace("/Auth/LogIn")
    } catch (error) {
      console.log("Error logging out:", error)
    }
  }

  // const handleUploadProfilePicture = async () => {
  //   try {
  //     const url = await uploadProfilePicture()
  //     //   if (url) setAvatarUrl(url)
  //   } catch (err) {
  //     console.error(err)
  //   } 
  // }

  return (
    <SafeAreaView style={styles.container}>
        <Text style={styles.title}>Your Account</Text>
        {user.profile?.profile_picture && 
            <View>
                <Image
                    
                />
            </View>
        }
        <View style={styles.userData}>
          <Text style={styles.userInfo}>Email: {user.email}</Text>
          <Text style={styles.userInfo}>ID: {user.id}</Text>
          <Text style={styles.userInfo}>
            Member since: {user.identities?.[0]?.created_at ?? "Unknown"}
          </Text>
        </View>
      <TouchableOpacity style={styles.logOut} onPress={handleSignOut}>
        <Text>Log Out</Text>
      </TouchableOpacity>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#000",
    flex: 1,
    flexDirection: "column",
    padding: 20,
    gap: 14,
    justifyContent: "center",
  },
  title: {
    color: "#ccc",
    fontSize: 22,
    fontWeight: "600",
    marginBottom: 10,
    textAlign: "center",
  },
  userData: {
    backgroundColor: "#000",
    flex: 1,
    flexDirection: "column",
    gap: 10,
    justifyContent: "center",
  },
  userInfo: {
    fontSize: 14,
    color: "#ccc",
    fontWeight: "500",
    textAlign: "center",
  },
  logOut: {
    backgroundColor: "#A3F",
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: "center",
    marginTop: 20,
  },
})

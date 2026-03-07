import { router } from "expo-router";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  StatusBar,
  Dimensions,
} from "react-native";

const { width } = Dimensions.get("window");

export default function WelcomeScreen({ navigation }: any) {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />

      {/* Logo */}
      <View style={styles.logoWrapper}>
        <View style={styles.logoCircle}>
          <Text style={styles.logoLetter}>H</Text>
          <Text style={styles.logoPlus}>+</Text>
        </View>
        <Text style={styles.brandName}>
          HouseKeep<Text style={styles.brandAccent}>+</Text>
        </Text>
        <Text style={styles.tagline}>Hotel-level cleanliness, at home.</Text>
      </View>

      {/* Hero Image */}
      <View style={styles.imageWrapper}>
        <Image
          source={{ uri: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800" }}
          style={styles.heroImage}
          resizeMode="cover"
        />
      </View>

      {/* Actions */}
      <View style={styles.actions}>
        <TouchableOpacity
          style={styles.primaryBtn}
          onPress={() => router.push("/signup")}
          activeOpacity={0.85}
        >
          <Text style={styles.primaryBtnText}>Get Started</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.secondaryBtn}
          onPress={() => router.push("/login")}
          activeOpacity={0.7}
        >
          <Text style={styles.secondaryBtnText}>Login</Text>
        </TouchableOpacity>

        <TouchableOpacity activeOpacity={0.6}>
          <Text style={styles.guestText}>Browse services as guest</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFDF9",
    paddingHorizontal: 28,
    paddingTop: 64,
    paddingBottom: 40,
    alignItems: "center",
  },

  // Logo
  logoWrapper: {
    alignItems: "center",
    marginBottom: 32,
  },
  logoCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: "#F5A623",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    marginBottom: 12,
  },
  logoLetter: {
    fontSize: 26,
    fontWeight: "700",
    color: "#fff",
  },
  logoPlus: {
    fontSize: 16,
    fontWeight: "700",
    color: "#fff",
    marginTop: -8,
  },
  brandName: {
    fontSize: 28,
    fontWeight: "700",
    color: "#1A1A1A",
    letterSpacing: -0.5,
  },
  brandAccent: {
    color: "#F5A623",
  },
  tagline: {
    fontSize: 14,
    color: "#888",
    marginTop: 4,
    fontStyle: "italic",
  },

  // Hero Image
  imageWrapper: {
    width: width - 56,
    height: 200,
    borderRadius: 16,
    overflow: "hidden",
    marginBottom: 40,
  },
  heroImage: {
    width: "100%",
    height: "100%",
  },

  // Actions
  actions: {
    width: "100%",
    alignItems: "center",
    gap: 12,
  },
  primaryBtn: {
    width: "100%",
    backgroundColor: "#F5A623",
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
  },
  primaryBtnText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
    letterSpacing: 0.3,
  },
  secondaryBtn: {
    width: "100%",
    borderWidth: 1.5,
    borderColor: "#E0E0E0",
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: "center",
  },
  secondaryBtnText: {
    color: "#1A1A1A",
    fontSize: 16,
    fontWeight: "600",
  },
  guestText: {
    fontSize: 13,
    color: "#AAAAAA",
    marginTop: 4,
  },
});
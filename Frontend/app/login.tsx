import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    TextInput,
    Image,
    StatusBar,
    KeyboardAvoidingView,
    Platform,
} from "react-native";
import { useState } from "react";
import { router } from "expo-router";
import Toast from "react-native-toast-message";

export default function LoginScreen() {
    const [phone, setPhone] = useState("");

    const handleSendOTP = () => {
        if (!phone.trim()) {
            Toast.show({ type: "error", text1: "Phone number is required" });
            return;
        }
        if (phone.replace(/\D/g, "").length < 10) {
            Toast.show({ type: "error", text1: "Enter a valid 10-digit phone number" });
            return;
        }

        router.push({
            pathname: "/otp",
            params: { phone, source: "login" },
        });
    };

    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === "ios" ? "padding" : undefined}
        >
            <StatusBar barStyle="light-content" />

            {/* Hero Image Section */}
            <View style={styles.imageWrapper}>
                <Image
                    source={{ uri: "https://images.unsplash.com/photo-1585412727339-54e4bae3bbf9?w=800" }}
                    style={styles.heroImage}
                    resizeMode="cover"
                />
                <View style={styles.overlay} />

                {/* Top Bar */}
                <View style={styles.topBar}>
                    <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
                        <Text style={styles.backArrow}>‹</Text>
                    </TouchableOpacity>
                    <Text style={styles.brandText}>HOUSEKEEP+</Text>
                    <View style={{ width: 36 }} />
                </View>

                {/* Hero Text */}
                <View style={styles.heroTextWrapper}>
                    <Text style={styles.heroSubtitle}>EXCELLENCE IN SERVICE</Text>
                    <Text style={styles.heroTitle}>Elevated{"\n"}Housekeeping.</Text>
                </View>
            </View>

            {/* Form Section */}
            <View style={styles.formContainer}>
                <Text style={styles.title}>Welcome Back</Text>
                <Text style={styles.subtitle}>
                    Log in to your premium dashboard via secure phone verification.
                </Text>

                <Text style={styles.label}>PHONE NUMBER</Text>
                <View style={styles.inputRow}>
                    <View style={styles.flagBox}>
                        <Text style={styles.flagIcon}>🌐</Text>
                        <Text style={styles.countryCode}>+91</Text>
                    </View>
                    <View style={styles.divider} />
                    <TextInput
                        style={styles.input}
                        placeholder="(555) 000-0000"
                        placeholderTextColor="#C0C0C0"
                        keyboardType="phone-pad"
                        value={phone}
                        onChangeText={setPhone}
                    />
                </View>

                <TouchableOpacity style={styles.primaryBtn} activeOpacity={0.85} onPress={handleSendOTP}>
                    <Text style={styles.primaryBtnText}>Send OTP Code →</Text>
                </TouchableOpacity>

                <View style={styles.orRow}>
                    <View style={styles.orLine} />
                    <Text style={styles.orText}>OR CONTINUE WITH</Text>
                    <View style={styles.orLine} />
                </View>

                <View style={styles.socialRow}>
                    <TouchableOpacity style={styles.socialBtn} activeOpacity={0.8}>
                        <Text style={styles.socialIcon}>G</Text>
                        <Text style={styles.socialBtnText}>Google</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.socialBtn, styles.appleBtnDark]} activeOpacity={0.8}>
                        <Text style={styles.appleBtnText}> Apple</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.footerRow}>
                    <Text style={styles.footerText}>New to HouseKeep+? </Text>
                    <TouchableOpacity onPress={() => router.push("/signup")}>
                        <Text style={styles.footerLink}>Create Account</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    imageWrapper: { width: "100%", height: 260, position: "relative" },
    heroImage: { width: "100%", height: "100%" },
    overlay: { ...StyleSheet.absoluteFillObject, backgroundColor: "rgba(0,0,0,0.45)" },
    topBar: {
        position: "absolute",
        top: 52,
        left: 0,
        right: 0,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 20,
    },
    backBtn: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: "rgba(255,255,255,0.2)",
        alignItems: "center",
        justifyContent: "center",
    },
    backArrow: {
        color: "#fff",
        fontSize: 28,
        lineHeight: 30,
        textAlign: "center",
        includeFontPadding: false,
    },
    brandText: { color: "#fff", fontSize: 13, fontWeight: "700", letterSpacing: 2 },
    heroTextWrapper: { position: "absolute", bottom: 24, left: 24 },
    heroSubtitle: { color: "#F5A623", fontSize: 11, fontWeight: "700", letterSpacing: 2, marginBottom: 6 },
    heroTitle: { color: "#fff", fontSize: 28, fontWeight: "800", lineHeight: 34, letterSpacing: -0.5 },
    formContainer: {
        flex: 1,
        backgroundColor: "#FFFDF9",
        paddingHorizontal: 24,
        paddingTop: 28,
        paddingBottom: 32,
    },
    title: { fontSize: 22, fontWeight: "700", color: "#1A1A1A", marginBottom: 6, letterSpacing: -0.4 },
    subtitle: { fontSize: 13, color: "#999", marginBottom: 22, lineHeight: 19 },
    label: { fontSize: 11, fontWeight: "700", color: "#444", letterSpacing: 1, marginBottom: 8 },
    inputRow: {
        flexDirection: "row",
        alignItems: "center",
        borderWidth: 1.5,
        borderColor: "#EBEBEB",
        borderRadius: 10,
        backgroundColor: "#FAFAFA",
        marginBottom: 16,
        overflow: "hidden",
    },
    flagBox: { flexDirection: "row", alignItems: "center", paddingHorizontal: 12, paddingVertical: 13, gap: 6 },
    flagIcon: { fontSize: 16 },
    countryCode: { fontSize: 14, fontWeight: "600", color: "#1A1A1A" },
    divider: { width: 1, height: 22, backgroundColor: "#E0E0E0" },
    input: { flex: 1, paddingHorizontal: 14, paddingVertical: 13, fontSize: 14, color: "#1A1A1A" },
    primaryBtn: {
        backgroundColor: "#F5A623",
        paddingVertical: 16,
        borderRadius: 12,
        alignItems: "center",
        marginBottom: 20,
    },
    primaryBtnText: { color: "#fff", fontSize: 16, fontWeight: "700", letterSpacing: 0.3 },
    orRow: { flexDirection: "row", alignItems: "center", marginBottom: 16, gap: 10 },
    orLine: { flex: 1, height: 1, backgroundColor: "#EBEBEB" },
    orText: { fontSize: 11, color: "#BBBBBB", fontWeight: "600", letterSpacing: 1 },
    socialRow: { flexDirection: "row", gap: 12, marginBottom: 24 },
    socialBtn: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 8,
        paddingVertical: 13,
        borderRadius: 10,
        borderWidth: 1.5,
        borderColor: "#E0E0E0",
        backgroundColor: "#fff",
    },
    socialIcon: { fontSize: 15, fontWeight: "700", color: "#4285F4" },
    socialBtnText: { fontSize: 14, fontWeight: "600", color: "#1A1A1A" },
    appleBtnDark: { backgroundColor: "#1A1A1A", borderColor: "#1A1A1A" },
    appleBtnText: { fontSize: 14, fontWeight: "600", color: "#fff" },
    footerRow: { flexDirection: "row", justifyContent: "center" },
    footerText: { fontSize: 13, color: "#999" },
    footerLink: { fontSize: 13, color: "#F5A623", fontWeight: "700" },
});
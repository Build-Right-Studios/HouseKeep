import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    TextInput,
    Image,
    StatusBar,
    ScrollView,
    KeyboardAvoidingView,
    Platform,
} from "react-native";
import { useState } from "react";
import { router } from "expo-router";
import Toast from "react-native-toast-message";

export default function SignupScreen() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");

    const handleSubmit = () => {
        if (!name.trim()) {
            Toast.show({ type: "error", text1: "Full name is required" });
            return;
        }
        if (!email.trim()) {
            Toast.show({ type: "error", text1: "Email address is required" });
            return;
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            Toast.show({ type: "error", text1: "Enter a valid email address" });
            return;
        }
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
            params: { phone, name, email, source: "signup" },
        });
    };

    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === "ios" ? "padding" : undefined}
        >
            <ScrollView
                style={styles.container}
                contentContainerStyle={styles.content}
                showsVerticalScrollIndicator={false}
                bounces={false}
            >
                <StatusBar barStyle="light-content" />

                {/* Hero Image with back arrow */}
                <View style={styles.imageWrapper}>
                    <Image
                        source={{ uri: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800" }}
                        style={styles.heroImage}
                        resizeMode="cover"
                    />
                    <TouchableOpacity
                        style={styles.backBtn}
                        onPress={() => router.back()}
                    >
                        <Text style={styles.backArrow}>‹</Text>
                    </TouchableOpacity>
                    <View style={styles.brandBadge}>
                        <Text style={styles.brandBadgeText}>HouseKeep+</Text>
                    </View>
                </View>

                {/* Form */}
                <View style={styles.formContainer}>
                    <Text style={styles.title}>Create Account</Text>
                    <Text style={styles.subtitle}>Experience premium hospitality at home.</Text>

                    <View style={styles.fields}>
                        <InputField
                            label="Full Name"
                            placeholder="Enter your full name"
                            icon="👤"
                            keyboardType="default"
                            value={name}
                            onChangeText={setName}
                        />
                        <InputField
                            label="Email Address"
                            placeholder="example@luxury.com"
                            icon="✉️"
                            keyboardType="email-address"
                            value={email}
                            onChangeText={setEmail}
                        />
                        <InputField
                            label="Phone Number"
                            placeholder="+1 (555) 000-0000"
                            icon="📞"
                            keyboardType="phone-pad"
                            value={phone}
                            onChangeText={setPhone}
                        />
                    </View>

                    <TouchableOpacity style={styles.primaryBtn} activeOpacity={0.85} onPress={handleSubmit}>
                        <Text style={styles.primaryBtnText}>Start Membership →</Text>
                    </TouchableOpacity>

                    <Text style={styles.terms}>
                        By signing up, you agree to our{" "}
                        <Text style={styles.link}>Terms of Service</Text>
                    </Text>

                    <View style={styles.loginRow}>
                        <Text style={styles.loginText}>Already have an account? </Text>
                        <TouchableOpacity onPress={() => router.push("/login")}>
                            <Text style={styles.loginLink}>Log in</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

function InputField({
    label,
    placeholder,
    icon,
    keyboardType,
    value,
    onChangeText,
}: {
    label: string;
    placeholder: string;
    icon: string;
    keyboardType?: any;
    value: string;
    onChangeText: (text: string) => void;
}) {
    return (
        <View style={inputStyles.wrapper}>
            <Text style={inputStyles.label}>{label}</Text>
            <View style={inputStyles.inputRow}>
                <Text style={inputStyles.icon}>{icon}</Text>
                <TextInput
                    style={inputStyles.input}
                    placeholder={placeholder}
                    placeholderTextColor="#C0C0C0"
                    keyboardType={keyboardType}
                    autoCapitalize="none"
                    value={value}
                    onChangeText={onChangeText}
                />
            </View>
        </View>
    );
}

const inputStyles = StyleSheet.create({
    wrapper: { marginBottom: 16 },
    label: { fontSize: 13, fontWeight: "600", color: "#444", marginBottom: 6 },
    inputRow: {
        flexDirection: "row",
        alignItems: "center",
        borderWidth: 1.5,
        borderColor: "#EBEBEB",
        borderRadius: 10,
        paddingHorizontal: 14,
        backgroundColor: "#FAFAFA",
    },
    icon: { fontSize: 15, marginRight: 10 },
    input: { flex: 1, paddingVertical: 13, fontSize: 14, color: "#1A1A1A" },
});

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#FFFDF9" },
    content: { flexGrow: 1 },
    imageWrapper: { width: "100%", height: 220, position: "relative" },
    heroImage: { width: "100%", height: "100%" },
    backBtn: {
        position: "absolute",
        top: 48,
        left: 20,
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: "rgba(0,0,0,0.35)",
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
    brandBadge: {
        position: "absolute",
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        alignItems: "center",
        justifyContent: "center",
        pointerEvents: "none",
    },
    brandBadgeText: { color: "#fff", fontSize: 16, fontWeight: "700", letterSpacing: 0.5 },
    formContainer: { flex: 1, paddingHorizontal: 24, paddingTop: 28, paddingBottom: 40 },
    title: { fontSize: 24, fontWeight: "700", color: "#1A1A1A", marginBottom: 4, letterSpacing: -0.4 },
    subtitle: { fontSize: 13, color: "#999", marginBottom: 24 },
    fields: { marginBottom: 8 },
    primaryBtn: {
        backgroundColor: "#F5A623",
        paddingVertical: 16,
        borderRadius: 12,
        alignItems: "center",
        marginTop: 8,
        marginBottom: 16,
    },
    primaryBtnText: { color: "#fff", fontSize: 16, fontWeight: "700", letterSpacing: 0.3 },
    terms: { fontSize: 12, color: "#AAAAAA", textAlign: "center", marginBottom: 20 },
    link: { color: "#F5A623", fontWeight: "600" },
    loginRow: { flexDirection: "row", justifyContent: "center" },
    loginText: { fontSize: 13, color: "#999" },
    loginLink: { fontSize: 13, color: "#F5A623", fontWeight: "700" },
});
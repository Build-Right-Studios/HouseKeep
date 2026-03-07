import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    TextInput,
    StatusBar,
    KeyboardAvoidingView,
    Platform,
} from "react-native";
import { useRef, useState, useEffect } from "react";
import { router, useLocalSearchParams } from "expo-router";

const OTP_LENGTH = 6;

export default function OTPScreen() {
    const { phone, name, email, source } = useLocalSearchParams<{
        phone: string;
        name?: string;
        email?: string;
        source: "signup" | "login";
    }>();

    const [otp, setOtp] = useState<string[]>(Array(OTP_LENGTH).fill(""));
    const [timer, setTimer] = useState(54);
    const inputs = useRef<(TextInput | null)[]>([]);

    useEffect(() => {
        if (timer === 0) return;
        const interval = setInterval(() => setTimer((t) => t - 1), 1000);
        return () => clearInterval(interval);
    }, [timer]);

    const handleChange = (text: string, index: number) => {
        const newOtp = [...otp];
        newOtp[index] = text;
        setOtp(newOtp);
        if (text && index < OTP_LENGTH - 1) {
            inputs.current[index + 1]?.focus();
        }
    };

    const handleKeyPress = (e: any, index: number) => {
        if (e.nativeEvent.key === "Backspace" && !otp[index] && index > 0) {
            inputs.current[index - 1]?.focus();
        }
    };

    const handleResend = () => {
        setTimer(54);
        setOtp(Array(OTP_LENGTH).fill(""));
        inputs.current[0]?.focus();
    };

    const handleVerify = () => {
        // Navigate based on where the user came from
        if (source === "signup") {
            router.push("/welcome");
        } else {
            router.push("/welcome");
        }
    };

    const formatTime = (s: number) => `0:${s.toString().padStart(2, "0")}`;
    const isComplete = otp.every((d) => d);

    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === "ios" ? "padding" : undefined}
        >
            <StatusBar barStyle="dark-content" />
            <View style={styles.container}>

                {/* Back Button */}
                <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
                    <Text style={styles.backArrow}>‹</Text>
                </TouchableOpacity>

                {/* Header */}
                <View style={styles.header}>
                    <Text style={styles.title}>Verify Phone Number</Text>
                    <Text style={styles.subtitle}>
                        We've sent a 6-digit code to{" "}
                        <Text style={styles.phoneHighlight}>{phone}</Text>
                    </Text>
                    {source === "signup" && name ? (
                        <Text style={styles.welcomeNote}>Welcome, {name}! 👋</Text>
                    ) : null}
                </View>

                {/* OTP Inputs */}
                <View style={styles.otpRow}>
                    {otp.map((digit, index) => (
                        <TextInput
                            key={index}
                            ref={(ref) => { inputs.current[index] = ref; }}
                            style={[styles.otpBox, digit ? styles.otpBoxFilled : null]}
                            value={digit}
                            onChangeText={(text) => handleChange(text.slice(-1), index)}
                            onKeyPress={(e) => handleKeyPress(e, index)}
                            keyboardType="number-pad"
                            maxLength={1}
                            textAlign="center"
                            selectionColor="#F5A623"
                        />
                    ))}
                </View>

                {/* Verify Button */}
                <TouchableOpacity
                    style={[styles.primaryBtn, !isComplete && styles.primaryBtnDisabled]}
                    activeOpacity={0.85}
                    disabled={!isComplete}
                    onPress={handleVerify}
                >
                    <Text style={styles.primaryBtnText}>VERIFY & PROCEED</Text>
                </TouchableOpacity>

                {/* Resend */}
                <Text style={styles.resendLabel}>Didn't receive the code?</Text>
                <View style={styles.resendRow}>
                    <TouchableOpacity onPress={handleResend} disabled={timer > 0}>
                        <Text style={[styles.resendLink, timer > 0 && styles.resendDisabled]}>
                            Resend Code
                        </Text>
                    </TouchableOpacity>
                    <Text style={styles.resendSeparator}> | </Text>
                    <Text style={styles.timerIcon}>🕐</Text>
                    <Text style={styles.timer}>{formatTime(timer)}</Text>
                </View>

            </View>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F7F6F2",
        paddingHorizontal: 28,
        paddingTop: 56,
        paddingBottom: 40,
    },
    backBtn: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: "#EDECEA",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 40,
    },
    backArrow: {
        color: "#F5A623",
        fontSize: 28,
        lineHeight: 30,
        textAlign: "center",
        includeFontPadding: false,
    },
    header: { marginBottom: 40 },
    title: { fontSize: 26, fontWeight: "800", color: "#1A1A1A", letterSpacing: -0.5, marginBottom: 10 },
    subtitle: { fontSize: 14, color: "#999", lineHeight: 20 },
    phoneHighlight: { color: "#1A1A1A", fontWeight: "600" },
    welcomeNote: { fontSize: 13, color: "#F5A623", fontWeight: "600", marginTop: 8 },
    otpRow: { flexDirection: "row", gap: 10, marginBottom: 36 },
    otpBox: {
        flex: 1,
        height: 52,
        borderRadius: 10,
        borderWidth: 1.5,
        borderColor: "#E0E0E0",
        backgroundColor: "#fff",
        fontSize: 20,
        fontWeight: "700",
        color: "#1A1A1A",
    },
    otpBoxFilled: { borderColor: "#F5A623", backgroundColor: "#FFFDF9" },
    primaryBtn: {
        backgroundColor: "#F5A623",
        paddingVertical: 17,
        borderRadius: 12,
        alignItems: "center",
        marginBottom: 24,
    },
    primaryBtnDisabled: { opacity: 0.5 },
    primaryBtnText: { color: "#fff", fontSize: 15, fontWeight: "800", letterSpacing: 1 },
    resendLabel: { fontSize: 12, color: "#BBBBBB", textAlign: "center", marginBottom: 8 },
    resendRow: { flexDirection: "row", alignItems: "center", justifyContent: "center" },
    resendLink: { fontSize: 13, color: "#F5A623", fontWeight: "700" },
    resendDisabled: { color: "#BBBBBB" },
    resendSeparator: { fontSize: 13, color: "#CCCCCC", marginHorizontal: 2 },
    timerIcon: { fontSize: 13, marginRight: 3 },
    timer: { fontSize: 13, color: "#F5A623", fontWeight: "700" },
});
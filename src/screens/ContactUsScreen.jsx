import React, { useState } from 'react';
import {
    StyleSheet,
    Text,
    TextInput,
    View,
    TouchableOpacity,
    ScrollView,
    Alert,
} from 'react-native';
import { FontAwesome, Entypo } from '@expo/vector-icons';

const ContactUsScreen = ({ navigation }) => {
    const [form, setForm] = useState({
        name: '',
        email: '',
        message: '',
    });
    const [isLoading, setIsLoading] = useState(false);

    const handleInputChange = (field, value) => {
        setForm({ ...form, [field]: value });
    };

    const handleSubmit = async () => {
        const trimmedName = form.name.trim();
        const trimmedEmail = form.email.trim();
        const trimmedMessage = form.message.trim();

        if (!trimmedName || !trimmedEmail || !trimmedMessage) {
            Alert.alert('Error', 'Please fill in all fields before submitting.');
            return;
        }

        const formData = {
            name: trimmedName,
            email: trimmedEmail,
            message: trimmedMessage,
        };

        setIsLoading(true);
        try {
            const response = await fetch('https://rustams-mill-backend-i7yh.onrender.com/guest/contactus', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (!response.ok) throw new Error(`Server Error: ${response.status}`);

            Alert.alert('Success', 'Your message has been sent!');
            setForm({ name: '', email: '', message: '' });
        } catch (error) {
            Alert.alert('Error', 'Could not send your message. Please try again later.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                    <Entypo name="chevron-left" size={24} color="#fff" />
                </TouchableOpacity>
                <Text style={styles.headerText}>Contact Us</Text>
            </View>

            <View style={styles.form}>
                <Text style={styles.sectionTitle}>Get in Touch</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Your Name"
                    value={form.name}
                    onChangeText={(text) => handleInputChange('name', text)}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Your Email"
                    keyboardType="email-address"
                    value={form.email}
                    onChangeText={(text) => handleInputChange('email', text)}
                />
                <TextInput
                    style={[styles.input, styles.textArea]}
                    placeholder="Your Message"
                    value={form.message}
                    onChangeText={(text) => handleInputChange('message', text)}
                    multiline
                />
                <TouchableOpacity
                    style={[styles.button, { backgroundColor: isLoading ? '#ccc' : '#4CAF50' }]}
                    onPress={handleSubmit}
                    disabled={isLoading}
                >
                    <FontAwesome name="send" size={18} color="#fff" />
                    <Text style={styles.buttonText}>
                        {isLoading ? 'Sending...' : 'Send Message'}
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.button, { backgroundColor: '#FF5733', marginTop: 20 }]} // Different color for distinction
                    onPress={() => navigation.navigate('RaiseGrievance')}
                >
                    <FontAwesome name="file-text" size={18} color="#fff" />
                    <Text style={styles.buttonText}> Raise Grievance</Text>
                </TouchableOpacity>
            </View>

            {/* Address Box */}
            <View style={styles.addressContainer}>
                <Text style={styles.addressHeader}>📍 Our Address</Text>
                <Text style={styles.addressText}>
                    11, Mahatma Phule Ward, Sindhi Colony, Hinganghat, Maharashtra 442301
                </Text>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#f5f5f5' },
    header: {
        backgroundColor: '#4CAF50',
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        paddingTop: 40,
    },
    backButton: { marginRight: 16 },
    headerText: { color: '#fff', fontSize: 22, fontWeight: 'bold' },
    form: { padding: 20 },
    sectionTitle: { fontSize: 20, fontWeight: 'bold', color: '#333', marginBottom: 10 },
    input: {
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 12,
        padding: 12,
        marginBottom: 15,
    },
    textArea: { height: 120, textAlignVertical: 'top' },
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#4CAF50',
        padding: 15,
        borderRadius: 12,
    },
    buttonText: { color: '#fff', fontSize: 16, fontWeight: 'bold', marginLeft: 8 },

    // Address Box Styles
    addressContainer: {
        margin: 20,
        padding: 15,
        backgroundColor: '#fff',
        borderRadius: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 5,
    },
    addressHeader: { fontSize: 18, fontWeight: 'bold', color: '#333', marginBottom: 8 },
    addressText: { fontSize: 16, color: '#555', textAlign: 'center' },
});

export default ContactUsScreen;

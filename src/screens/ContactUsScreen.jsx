import React, { useState } from 'react';
import {
    StyleSheet,
    Text,
    TextInput,
    View,
    TouchableOpacity,
    ScrollView,
    Alert,
    Dimensions,
} from 'react-native';
import { FontAwesome, Entypo } from '@expo/vector-icons';
import MapView, { Marker } from 'react-native-maps';

const ContactUsScreen = ({ navigation }) => {
    const [form, setForm] = useState({
        name: '',
        email: '',
        message: '',
    });

    // Handle changes in the form inputs
    const handleInputChange = (field, value) => {
        setForm({ ...form, [field]: value });
    };

    // Handle form submission
    const handleSubmit = async () => {
        if (!form.name || !form.email || !form.message) {
            Alert.alert('Error', 'Please fill in all fields before submitting.');
        } else {
            const formData = {
                name: form.name,
                email: form.email,
                message: form.message,
                location: {
                    latitude: 20.5511339,  // Example latitude
                    longitude: 78.839962,  // Example longitude
                    latitudeDelta: 0.05,   // Example latitude delta
                    longitudeDelta: 0.05,  // Example longitude delta
                },
            };

            try {
                const response = await fetch('http://192.168.234.245:5000/guest/contactus', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData), // Send the form data as a JSON payload
                });

                

                const result = await response.json();
                console.log('API Response:', result);
                Alert.alert('Success', 'Your message has been sent!');
                
                // Reset the form after successful submission
                setForm({
                    name: '',
                    email: '',
                    message: '',
                });

            } catch (error) {
                console.error('Error:', error);
                Alert.alert('Error', 'Could not send your message. Please try again later.');
            }
        }
    };

    return (
        <ScrollView style={styles.container}>
            {/* Header with Back Button */}
            <View style={styles.header}>
                <TouchableOpacity
                    style={styles.backButton}
                    onPress={() => navigation.goBack()}
                >
                    <Entypo name="chevron-left" size={24} color="#fff" />
                </TouchableOpacity>
                <Text style={styles.headerText}>Contact Us</Text>
            </View>

            {/* Form Section */}
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
                <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                    <FontAwesome name="send" size={18} color="#fff" />
                    <Text style={styles.buttonText}> Send Message</Text>
                </TouchableOpacity>
            </View>

            {/* Map Section */}
            <View style={styles.mapContainer}>
                <Text style={styles.mapHeader}>Find Us Here</Text>
                <MapView
                    style={styles.map}
                    initialRegion={{
                        latitude: 20.5511339,
                        longitude: 78.839962,
                        latitudeDelta: 0.05,
                        longitudeDelta: 0.05,
                    }}
                >
                    <Marker
                        coordinate={{ latitude: 20.5511339, longitude: 78.839962 }}
                        title="Our Office"
                        description="Visit us here!"
                    />
                </MapView>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    header: {
        backgroundColor: '#4CAF50',
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        paddingTop: 40, // For notch compatibility
    },
    backButton: {
        marginRight: 16,
    },
    headerText: {
        color: '#fff',
        fontSize: 22,
        fontWeight: 'bold',
    },
    form: {
        padding: 20,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 10,
    },
    input: {
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 12,
        padding: 12,
        marginBottom: 15,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    textArea: {
        height: 120,
        textAlignVertical: 'top',
    },
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#4CAF50',
        padding: 15,
        borderRadius: 12,
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 3,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
        marginLeft: 8,
    },
    mapContainer: {
        margin: 20,
        borderRadius: 12,
        overflow: 'hidden',
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 4,
    },
    mapHeader: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        padding: 16,
    },
    map: {
        width: Dimensions.get('window').width - 40,
        height: 250,
    },
});

export default ContactUsScreen;

import React, { useState } from 'react';
import {
    StyleSheet,
    Text,
    TextInput,
    View,
    TouchableOpacity,
    Image,
    Alert,
    ScrollView
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';

const RaiseGrievanceScreen = () => {
    const [form, setForm] = useState({
        name: '',
        number: '',
        title: '',
        description: '',
        imageURL: '',
    });

    // Handle input changes
    const handleInputChange = (field, value) => {
        setForm({ ...form, [field]: value });
    };

    // Handle image selection
    const handleImagePicker = async () => {
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (!permissionResult.granted) {
            Alert.alert('Permission Denied', 'You need to allow access to your photo library.');
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            setForm({ ...form, imageURL: result.assets[0].uri });
        }
    };

    // Handle form submission
    const handleSubmit = async () => {
        const { name, number, title, description, imageURL } = form;

        if (!name || !number || !title || !description || !imageURL) {
            Alert.alert('Error', 'Please fill in all fields and upload an image.');
            return;
        }

        const formdata = new FormData();
        formdata.append('name',name);
        formdata.append('title',title)
        formdata.append('no',number);
        formdata.append('description',description);

        const filename = imageURL.split('/').pop();
        const type = `image/${filename.split('.').pop()}`;
        formdata.append('image', { uri: imageURL, name: filename, type });

        try{
            const response = await fetch('https://rustams-mill-backend-i7yh.onrender.com/guest/grevience', {
                method: 'POST',
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                body: formdata,
            });
            const result = await response.json();

            if(response.ok){
                Alert.alert('Success', 'Your grievance has been submitted.');
                setForm({ name: '', number: '', title: '', description: '', imageURL: '' });
            }
            else{
                Alert.alert('Error', result.message || 'Failed to submit grievance.');
            }
        }
        catch{
            console.error('Error:', error);
            Alert.alert('Error', 'Failed to submit grievance. Please try again.');
            
        }
        
    
    };

    return (
        <ScrollView>
        <View style={styles.container}>
            <Text style={styles.title}>Raise a Grievance</Text>

            <TextInput
                style={styles.input}
                placeholder="Your Name"
                value={form.name}
                onChangeText={(text) => handleInputChange('name', text)}
            />
            <TextInput
                style={styles.input}
                placeholder="Your Contact Number"
                keyboardType="phone-pad"
                value={form.number}
                onChangeText={(text) => handleInputChange('number', text)}
            />
            <TextInput
                style={styles.input}
                placeholder="Grievance Title"
                value={form.title}
                onChangeText={(text) => handleInputChange('title', text)}
            />
            <TextInput
                style={[styles.input, styles.textArea]}
                placeholder="Describe your grievance here"
                value={form.description}
                onChangeText={(text) => handleInputChange('description', text)}
                multiline
            />

            <TouchableOpacity style={styles.imageButton} onPress={handleImagePicker}>
                <Text style={styles.imageButtonText}>Upload Image</Text>
            </TouchableOpacity>

            {form.imageURL ? (
                <Image source={{ uri: form.imageURL }} style={styles.imagePreview} />
            ) : null}

            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                <Text style={styles.buttonText}>Submit Grievance</Text>
            </TouchableOpacity>
        </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f5f5f5',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 20,
        textAlign: 'center',
    },
    input: {
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 12,
        padding: 12,
        marginBottom: 15,
    },
    textArea: {
        height: 100,
        textAlignVertical: 'top',
    },
    imageButton: {
        backgroundColor: '#4CAF50',
        padding: 15,
        borderRadius: 12,
        alignItems: 'center',
        marginBottom: 15,
    },
    imageButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    imagePreview: {
        width: '100%',
        height: 200,
        borderRadius: 12,
        marginBottom: 15,
        borderWidth: 1,
        borderColor: '#ccc',
    },
    button: {
        backgroundColor: '#4CAF50',
        padding: 15,
        borderRadius: 12,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default RaiseGrievanceScreen;

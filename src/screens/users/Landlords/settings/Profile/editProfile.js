import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";
import theme from "../../../../../styles/theme";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import ImagePicker from "react-native-image-picker"; // For image selection

const EditProfile = ({ navigation }) => {
  const [name, setName] = useState(""); // State for name
  const [email, setEmail] = useState(""); // State for email
  const [phone, setPhone] = useState(""); // State for phone
  const [profileImage, setProfileImage] = useState(null); // State for profile image

  const handleBack = () => {
    // Handle navigating back to the previous screen
    navigation.navigate("LandlordSettingsPage");
  };

  // Function to handle image selection
  const selectImage = () => {
    const options = {
      title: "Select Profile Picture",
      storageOptions: {
        skipBackup: true,
        path: "images",
      },
    };

    ImagePicker.showImagePicker(options, (response) => {
      if (response.uri) {
        setProfileImage(response);
      }
    });
  };

  // Function to update profile
  const updateProfile = () => {
    // Implement your logic to update the user's profile here
    // You can send the new data (name, email, phone) and the profile image to your API
  };

  useEffect(() => {
    // Fetch and set the user's current profile photo here
    // Example: Fetch the profile image URL from your backend and set it to `setProfileImage`
    // const currentProfileImageURL = ...;
    // setProfileImage({ uri: currentProfileImageURL });
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack} style={styles.backButton}>
          <Icon
            name="arrow-left"
            size={theme.spacing.large}
            color={theme.colors.grey.dark}
          />
        </TouchableOpacity>
        <Text style={styles.headerText}>Change Your Password</Text>
      </View>

      <Text style={styles.uploadText}>Upload New Photo</Text>

      <View style={styles.profileImageContainer}>
        {profileImage ? (
          <Image
            source={{ uri: profileImage.uri }}
            style={styles.profileImage}
          />
        ) : (
          <TouchableOpacity onPress={selectImage} style={styles.selectImageBtn}>
            <Icon
              name="camera"
              size={theme.spacing.medium}
              color={theme.colors.grey.dark}
            />
          </TouchableOpacity>
        )}
      </View>

      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={(text) => setName(text)}
      />

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={(text) => setEmail(text)}
      />

      <TextInput
        style={styles.input}
        placeholder="Phone"
        value={phone}
        onChangeText={(text) => setPhone(text)}
      />

      <TouchableOpacity style={styles.button} onPress={updateProfile}>
        <Text style={styles.buttonText}>Save Changes</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: theme.spacing.large,
    backgroundColor: theme.colors.white,
    borderBottomWidth: 0.5,
    borderBottomColor: theme.colors.grey.light,
    position: "relative", // To allow absolute positioning
  },
  backButton: {
    position: "absolute", // Position the back button absolutely
    left: 10, // Adjust the left position as needed
  },
  headerText: {
    flex: 1, // Allow the text to take the remaining space
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center", // Center the text horizontally
  },
  profileImageContainer: {
    alignItems: "center",
    marginTop: theme.spacing.large,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  selectImageBtn: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: theme.colors.grey.lighter,
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    height: 40,
    borderColor: theme.colors.primary.dark,
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  button: {
    backgroundColor: theme.colors.primary.dark,
    borderRadius: 5,
    paddingVertical: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default EditProfile;

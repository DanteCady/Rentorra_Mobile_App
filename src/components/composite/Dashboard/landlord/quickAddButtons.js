import React, { useState, useRef } from "react";
import { View, TouchableOpacity, StyleSheet, Animated } from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import theme from "../../../../styles/theme";

// QuickAddButtons provides a set of animated buttons that pop out from a central button.
// These are typically used for quickly adding new properties or tenants.
const QuickAddButtons = ({ onAddProperty, onAddTenant }) => {
  // State to manage the open/closed state of the buttons.
  const [isOpen, setIsOpen] = useState(false);

  // useRef hook to manage the animated value throughout rerenders.
  const animation = useRef(new Animated.Value(0)).current;

  // Function to toggle the opening/closing of the quick add buttons.
  const toggleButtons = () => {
    // Animate the buttons open or closed based on their current state.
    Animated.timing(animation, {
      toValue: isOpen ? 0 : 1,
      duration: 300,
      useNativeDriver: true,
    }).start();

    // Update the state to reflect the new open/closed state.
    setIsOpen(!isOpen);
  };

  // Translate value for the property button. It will move leftwards when opened.
  const propertyTranslateX = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -60], // adjust this value to change the distance buttons move
  });

  // Translate value for the tenant button. It will move rightwards when opened.
  const tenantTranslateX = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 60], // adjust this value to change the distance buttons move
  });

  return (
    <View style={styles.quickAddContainer}>
      {/* Animated button for adding property */}
      <Animated.View
        style={{ transform: [{ translateX: propertyTranslateX }] }}
      >
        <TouchableOpacity onPress={onAddProperty} style={styles.quickAddButton}>
          <View style={styles.buttonIconContainer}>
            <MaterialIcons name="home" size={32} color="white" />
          </View>
        </TouchableOpacity>
      </Animated.View>

      {/* Animated button for adding tenant */}
      <Animated.View style={{ transform: [{ translateX: tenantTranslateX }] }}>
        <TouchableOpacity onPress={onAddTenant} style={styles.quickAddButton}>
          <View style={styles.buttonIconContainer}>
            <MaterialIcons name="person" size={32} color="white" />
          </View>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};

// StyleSheet for styling the QuickAddButtons component.
const styles = StyleSheet.create({
  quickAddContainer: {
    position: "absolute",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    bottom: 100,
    left: 0,
    right: 75,
  },
  quickAddButton: {
    alignItems: "center",
    backgroundColor: theme.colors.primary.dark,
    borderRadius: 30,
    width: 45,
    height: 45,
    marginHorizontal: 5,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  buttonIconContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default QuickAddButtons;

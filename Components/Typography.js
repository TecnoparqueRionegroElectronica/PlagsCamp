import React, { useState } from 'react';
import { Text, StyleSheet, TouchableOpacity } from 'react-native';

const Typography = ({ children, size, style, onPress, ...props }) => {
  const [pressed, setPressed] = useState(false);
  return (
    <TouchableOpacity
      onPressIn={() => setPressed(true)}
      onPressOut={() => setPressed(false)} 
      onPress={onPress}
      disabled={!onPress}
      {...props}
    >
      <Text
        style={[
          styles.text,
          { fontSize: size, opacity: pressed ? 0.3 : 1 },
          style,
        ]}
      >
        {children}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  text: {
    fontFamily: 'Questrial_400Regular',
  },
});

export default Typography;

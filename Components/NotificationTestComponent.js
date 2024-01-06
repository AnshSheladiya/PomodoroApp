// NotificationTestComponent.js
import React, { useEffect } from 'react';
import { View, Button } from 'react-native';
import PushNotification from 'react-native-push-notification';

const NotificationTestComponent = () => {
  const channelId = 'channel-id'; // Match this with the channel ID in AndroidManifest.xml

  useEffect(() => {
    // Create a notification channel for Android
    PushNotification.createChannel(
      {
        channelId: channelId,
        channelName: 'My Notification Channel',
      },
      created => console.log(`Channel created: ${created}`)
    );

    // Clean up the notification channel when the component unmounts
    return () => {
      PushNotification.deleteChannel(channelId);
    };
  }, []);

  const handleTestNotification = () => {
    PushNotification.localNotification({
      channelId: channelId, // Specify the channel ID when sending the notification
      title: 'Test Notification',
      message: 'This is a test notification',
    });
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Button title="Test Notification" onPress={handleTestNotification} />
    </View>
  );
};

export default NotificationTestComponent;

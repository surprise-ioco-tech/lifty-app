import notifee, {
  AuthorizationStatus,
  EventType,
  AndroidStyle,
} from "@notifee/react-native";
import messaging from "@react-native-firebase/messaging";
import * as Device from "expo-device";

export const configurePushNotifications = async () => {
  console.log("CONFIGURE GOT A CALL");
  const permisionsStatus = await checkIfNotificationsEnabled();
  console.log("THE PERMISION STATUS", permisionsStatus);
  if (!permisionsStatus) {
    try {
      await requestUNotifPermission();
    } catch (err) {
      console.log("REQUEST FOR PERMISSION ERROR", err);
    }
  }

  getDeviceToken();
  registerForFCMNotifications();
  listenToEvents();
};

registerDeviceInfo = (deviceInfo, token) => {
  let body = {
    DeviceToken: deviceInfo.token,
    OperatingSystem: deviceInfo.os,
  };
  console.log("!!! body", body);
  try {
    fetch("https://wwww.ricimr.com/registerDevice", {
      method: "POST",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
        //   Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    })
      .then((res) => {
        console.log("THE Response;;;", res);
        console.log("!!! ", res);
        if (res.status === 201 || res.status === 200) {
          console.log("(@@@@@@@ Device was registered", res);
        } else {
          console.log("THe failing status;;;");
          console.log(JSON.stringify(res));
        }
      })
      .catch((err) => {
        console.error("@@@@@@@ Err", err);
      });
  } catch (error) {
    console.log("ERROR COMMUNICATIONG WITH RICIMR");
  }
};

checkIfNotificationsEnabled = async () => {
  const settings = await notifee.getNotificationSettings();
  console.log("THE SETTINGS;;;", settings);
  console.log("--- EventType ---", EventType);
  console.log(
    "Settings CheckResults AUTH;;;",
    settings.authorizationStatus == 1
  );
  console.log(
    "Settings CheckResults UNAUTH;;;",
    settings.authorizationStatus === -1
  );
  if (
    settings.authorizationStatus == AuthorizationStatus.AUTHORIZED ||
    settings.authorizationStatus === 1
  ) {
    console.log("--- permisions granted ---");
    return true;
  } else if (
    settings.authorizationStatus ==
    (AuthorizationStatus.DENIED || settings.authorizationStatus === -1)
  ) {
    console.log("Notification permissions has been denied");
    return false;
  } else {
    return false;
  }
  console.log("THE CODE REACH");
};

requestUNotifPermission = async () => {
  await notifee.requestPermission();
};

listenToEvents = async () => {
  handleForgroundEvent();
  handleBackgroundEvent();
};

handleForgroundEvent = () => {
  notifee.onForegroundEvent(({ type, detail }) => {
    console.log("--- EVENT HAPPENING IN FOREGROUND ---", type);
    reactToNotificationAction(type, detail, "foreground");
  });
};

handleBackgroundEvent = () => {
  notifee.onBackgroundEvent(async ({ type, detail }) => {
    console.log("--- EVENT HAPPENING IN BACKGROUND ---", type);
    reactToNotificationAction(type, detail, "background");
  });
};

handleNotificationDisplay = async (message) => {
  try {
    console.log("About to show notifications;;;");
    // Create a channel (required for Android)
    const channelId = await notifee.createChannel({
      id: "default",
      name: "Default Channel",
    });
    const notificationParsed = JSON.parse(message.data.notifee);
    console.log("--- parsed json ---", notificationParsed);
    const android = notificationParsed.android;
    const { notification } = android;
    const { image } = notification;

    console.log("--- NOTIFICAION STRINGIGY ---", image);

    //Display a notification
    await notifee.displayNotification({
      title: "The Push App Notification",
      body: "Main body content of the notification",
      android: {
        channelId,
        //smallIcon: 'name-of-a-small-icon', // optional, defaults to 'ic_launcher'.
        // pressAction is needed if you want the notification to open the app when pressed
        style: { type: AndroidStyle.BIGPICTURE, picture: image },
        largeIcon: image,
        pressAction: {
          id: "default",
        },
      },
    });

    //notifee.displayNotification(JSON.parse(message.data.notifee));
  } catch (e) {
    console.log("--- notifications failing to show ---", e);
    console.log(e);
  }
};

// Note that an async function or a function that returns a Promise
// is required for both subscribers.
const onMessageReceived = async (message) => {
  console.log("WE HAVE RECEIVED FCM MESSAGE", message);
  handleNotificationDisplay(message);
  //notifee.displayNotification(JSON.parse(message.data.notifee));
};

const registerForFCMNotifications = () => {
  messaging().onMessage(onMessageReceived);
  messaging().setBackgroundMessageHandler(onMessageReceived);
};

const getDeviceToken = async () => {
  // Register the device with FCM
  await messaging().registerDeviceForRemoteMessages();

  // Get the token
  const token = await messaging().getToken();

  // Save the token
  console.log("--- device token ---", token);
  registerDeviceInfo({ token: token, os: Device.osName });
};

const handleDismisedNotification = async () => {
  console.log("--- The App Has Been Dismissed ---");
};

const handlePressedNotifcation = async () => {
  console.log("--- The App Has Been Pressed ---");
};

const reactToNotificationAction = (type, detail, event) => {
  console.log("The event on which event occured;;;", event);

  switch (type) {
    case EventType.DISMISSED:
      console.log("User dismissed notification", detail.notification);
      handleDismisedNotification();
      break;
    case EventType.PRESS:
      console.log("User pressed notification", detail.notification);
      handlePressedNotifcation();
      break;
  }
};

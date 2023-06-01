// import PushNotification from 'react-native-push-notification';
// import PushNotificationIOS from '@react-native-community/push-notification-ios';
// import * as RootNavigation from '../RootNavigation';
// import {Platform} from 'react-native';

// export const configurePushNotifications = () => {
//   console.log('CONFIGURE GOT A CALL');
//   try {
//     PushNotification.configure({
//       onRegister: function (info) {
//         registerDeviceInfo({token: info.token, os: info.os});
//       },

//       onNotification: function (notification) {
//         console.log('@@@@@@@ onNotification ', notification);
//         notification.finish(PushNotificationIOS.FetchResult.NoData);
//         let clicked = notification.userInteraction;
//         console.log('THE CLICKED STATE');
//         console.log(clicked);
//         if (clicked && notification.data) {
//           console.log('@@@@@@@ onNotification If Statement ', notification);
//           console.log('@@@@@@ Platform', Platform.OS);
//           console.log('THE NOTIFICATION IS WORKING');
//           //   let pushedItem =
//           //     Platform.OS == 'ios'
//           //       ? JSON.parse(notification.data.custom)
//           //       : JSON.parse(notification.data.custom);

//           //   console.log('@@@ pushed item', pushedItem);
//           //   console.log('@@@ bundle_id', pushedItem.bundle_id);

//           //   pushedItem.utm_content = notification.data['google.message_id'];
//           //   pushedItem.utm_campaign = notification.data.from;

//           RootNavigation.navigate('Home', {
//             itemId: clicked,
//             otherParam: {...notification.data},
//           });
//           console.log(
//             '!!! onNotification the pushed item',
//             JSON.stringify(clicked),
//           );
//         }
//       },
//       onRegistrationError: function (err) {
//         console.log('registration error');
//         console.error(err.message, err);
//       },
//       permissions: {
//         alert: true,
//         badge: true,
//         sound: true,
//       },
//       popInitialNotification: true,
//       requestPermissions: true,
//     });
//   } catch (e) {
//     console.log('!!! onNotification FAILED ', e);
//   }
// };

// registerDeviceInfo = (deviceInfo, token) => {
//   let body = {
//     DeviceToken: deviceInfo.token,
//     OperatingSystem: deviceInfo.os,
//   };
//   console.log('!!! body', body);

//   fetch('https://wwww.ricimr.com/registerDevice', {
//     method: 'POST',
//     headers: {
//       'Access-Control-Allow-Origin': '*',
//       'Content-Type': 'application/json',
//       //   Authorization: `Bearer ${token}`,
//     },
//     body: JSON.stringify(body),
//   })
//     .then(res => {
//       console.log('THE Response;;;', res);
//       console.log('!!! ', res);
//       if (res.status === 201 || res.status === 200) {
//         console.log('(@@@@@@@ Device was registered', res);
//       } else {
//         console.log('THe failing status;;;');
//         console.log(JSON.stringify(res));
//       }
//     })
//     .catch(err => {
//       //   console.error('@@@@@@@ Err', JSON.stringify(err));
//     });
// };


// import PushNotification from 'react-native-push-notification';
// import PushNotificationIOS from '@react-native-community/push-notification-ios';
// import * as RootNavigation from '../RootNavigation';
// import {Platform} from 'react-native';


import notifee, {AuthorizationStatus,EventType,AndroidStyle } from '@notifee/react-native';
import messaging from '@react-native-firebase/messaging';

export const configurePushNotifications = () => {
  console.log('CONFIGURE GOT A CALL');
  if(!checkIfNotificationsEnabled()) requestUNotifPermission()


  getDeviceToken()
  registerForFCMNotifications()
  listenToEvents()
  // try {
  //   PushNotification.configure({
  //     onRegister: function (info) {
  //       registerDeviceInfo({token: info.token, os: info.os});
  //     },

  //     onNotification: function (notification) {
  //       console.log('@@@@@@@ onNotification ', notification);
  //       notification.finish(PushNotificationIOS.FetchResult.NoData);
  //       let clicked = notification.userInteraction;
  //       console.log('THE CLICKED STATE');
  //       console.log(clicked);
  //       if (clicked && notification.data) {
  //         console.log('@@@@@@@ onNotification If Statement ', notification);
  //         console.log('@@@@@@ Platform', Platform.OS);
  //         console.log('THE NOTIFICATION IS WORKING');
  //         //   let pushedItem =
  //         //     Platform.OS == 'ios'
  //         //       ? JSON.parse(notification.data.custom)
  //         //       : JSON.parse(notification.data.custom);

  //         //   console.log('@@@ pushed item', pushedItem);
  //         //   console.log('@@@ bundle_id', pushedItem.bundle_id);

  //         //   pushedItem.utm_content = notification.data['google.message_id'];
  //         //   pushedItem.utm_campaign = notification.data.from;

  //         RootNavigation.navigate('Home', {
  //           itemId: clicked,
  //           otherParam: {...notification.data},
  //         });
  //         console.log(
  //           '!!! onNotification the pushed item',
  //           JSON.stringify(clicked),
  //         );
  //       }
  //     },
  //     onRegistrationError: function (err) {
  //       console.log('registration error');
  //       console.error(err.message, err);
  //     },
  //     permissions: {
  //       alert: true,
  //       badge: true,
  //       sound: true,
  //     },
  //     popInitialNotification: true,
  //     requestPermissions: true,
  //   });
  // } catch (e) {
  //   console.log('!!! onNotification FAILED ', e);
  // }
  
};

registerDeviceInfo = (deviceInfo, token) => {
  let body = {
    DeviceToken: deviceInfo.token,
    OperatingSystem: deviceInfo.os,
  };
  console.log('!!! body', body);

  fetch('https://wwww.ricimr.com/registerDevice', {
    method: 'POST',
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json',
      //   Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(body),
  })
    .then(res => {
      console.log('THE Response;;;', res);
      console.log('!!! ', res);
      if (res.status === 201 || res.status === 200) {
        console.log('(@@@@@@@ Device was registered', res);
      } else {
        console.log('THe failing status;;;');
        console.log(JSON.stringify(res));
      }
    })
    .catch(err => {
      //   console.error('@@@@@@@ Err', JSON.stringify(err));
    });
};

checkIfNotificationsEnabled = async ()=>{

    const settings = await notifee.getNotificationSettings();
    console.log('THE SETTINGS;;;',settings)
    console.log('--- EventType ---',EventType)
    if (settings.authorizationStatus == AuthorizationStatus.AUTHORIZED) {
      console.log("--- permisions granted ---")
      return true
    } else if (settings.authorizationStatus == AuthorizationStatus.DENIED) {
      console.log('Notification permissions has been denied');
      return false
    }
  
}


requestUNotifPermission = async ()=>{
  await notifee.requestPermission()
}


listenToEvents = async ()=>{

   handleForgroundEvent()
   handleBackgroundEvent()
}

handleForgroundEvent = ()=>{

  notifee.onForegroundEvent(({ type, detail }) => {
    console.log('--- EVENT HAPPENING IN FOREGROUND ---',type)
    reactToNotificationAction(type,detail,'foreground')
   
  });

}

handleBackgroundEvent = ()=>{

 
  notifee.onBackgroundEvent(async ({ type, detail }) => {
    console.log('--- EVENT HAPPENING IN BACKGROUND ---',type)
    reactToNotificationAction(type,detail,'background')
    
  });

}

handleNotificationDisplay = async (message)=>{

    try {
      console.log("About to show notifications;;;")
      // Create a channel (required for Android)
    const channelId = await notifee.createChannel({
      id: 'default',
      name: 'Default Channel',
    });
    const notificationParsed = JSON.parse(message.data.notifee)
    console.log('--- parsed json ---',notificationParsed)
    const android = notificationParsed.android
    const {notification} = android
    const {image} = notification

    console.log('--- NOTIFICAION STRINGIGY ---',image)

    //Display a notification
    await notifee.displayNotification({
      title: 'The Push App Notification',
      body: 'Main body content of the notification',
      android: {
        channelId,
        //smallIcon: 'name-of-a-small-icon', // optional, defaults to 'ic_launcher'.
        // pressAction is needed if you want the notification to open the app when pressed
        style: { type: AndroidStyle.BIGPICTURE, picture: image },
        largeIcon: image,
        pressAction: {
          id: 'default',
        },
      },
    });

    //notifee.displayNotification(JSON.parse(message.data.notifee));
    } catch (e) {
      console.log('--- notifications failing to show ---',e)
      console.log(e);
    }
 

}

// Note that an async function or a function that returns a Promise 
// is required for both subscribers.
const onMessageReceived = async (message)=> {
   console.log('WE HAVE RECEIVED FCM MESSAGE',message)
   handleNotificationDisplay(message)
   //notifee.displayNotification(JSON.parse(message.data.notifee));
   

}


const registerForFCMNotifications = ()=>{

  messaging().onMessage(onMessageReceived);
  messaging().setBackgroundMessageHandler(onMessageReceived);

}


const getDeviceToken = async ()=>{


  // Register the device with FCM
  await messaging().registerDeviceForRemoteMessages();

  // Get the token
  const token = await messaging().getToken();

  // Save the token
  console.log('--- device token ---',token)
  registerDeviceInfo({token: token, os: 'android'})
}

const handleDismisedNotification = async ()=>{

 console.log("--- The App Has Been Dismissed ---")
}

const handlePressedNotifcation = async ()=>{

  console.log("--- The App Has Been Pressed ---")
 }

const reactToNotificationAction = (type,detail,event)=>{

  console.log('The event on which event occured;;;',event)

  switch (type) {
    case EventType.DISMISSED:
      console.log('User dismissed notification', detail.notification);
      handleDismisedNotification()
      break;
    case EventType.PRESS:
      console.log('User pressed notification', detail.notification);
      handlePressedNotifcation()
      break;
  
   

      
  }
}












import firebase, { notifications } from 'react-native-firebase'

const CHANNEL_NOTIFICATIONS = {
	CHANNEL_ID: 'test_id',
	CHANNEL_NAME: 'test_name',
	CHANNEL_DESCRIPTION: 'test_description'
}

const channel = new firebase.notifications.Android.Channel(
	CHANNEL_NOTIFICATIONS.CHANNEL_ID,
	CHANNEL_NOTIFICATIONS.CHANNEL_NAME,
	firebase.notifications.Android.Importance.Max
).setDescription(CHANNEL_NOTIFICATIONS.CHANNEL_DESCRIPTION);
firebase.notifications().android.createChannel(channel);


async function getToken() {
	const fcmToken = await firebase.messaging().getToken();
	if (fcmToken) {
		console.log('token', fcmToken)
	}
};

async function requestPermission() {
	firebase
	.messaging()
	.requestPermission()
	.then(() => {
		getToken();
	})
	.catch(error => {
		console.warn(`${error} permission rejected`);
	});
}

async function checkPermission() {
	const enabled = await firebase.messaging().hasPermission();
	if (enabled) {
		await getToken();
	} else {
		await requestPermission();
	}
};

async function createNotificationListeners() {
	// This listener triggered when notification has been received in foreground
	firebase.notifications().onNotification((notification) => {
		const { title, body } = notification;
		const {
			notifications: {
				Android: {
					Priority: { Max }
				}
			}
		} = firebase;
		notification.android.setChannelId(CHANNEL_NOTIFICATIONS.CHANNEL_ID);
		notification.android.setPriority(Max);
		notification.setData(notification.data);
		firebase.notifications().displayNotification(notification);
	});
	
	/*// This listener triggered when app is in backgound and we click, tapped and opened notifiaction
	notificationOpenedListener = firebase.notifications().onNotificationOpened((notificationOpen) => {
		console.log('2')
		const { title, body } = notificationOpen.notification;
		displayNotification(title, body);
	});
	
	// This listener triggered when app is closed and we click,tapped and opened notification 
	const notificationOpen = await firebase.notifications().getInitialNotification();
	console.log('3')
	if (notificationOpen) {
		const { title, body } = notificationOpen.notification;
		displayNotification(title, body);
	}*/
}

export default async function PushNotification() {
	await checkPermission()
	await createNotificationListeners()
}
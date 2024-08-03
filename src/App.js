import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';
import { APP_ID, SERVER_SECRET } from './utils';

export default function App() {
  const roomID = "hemant-sharma"; // Ensure the room ID is unique and URL-friendly

  let myMeeting = async (element) => {
    const appID = APP_ID;
    const serverSecret = SERVER_SECRET;

    // Ensure APP_ID and SERVER_SECRET are valid
    if (!appID || !serverSecret) {
      console.error('APP_ID or SERVER_SECRET is missing.');
      return;
    }

    // Generate kit token
    const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(appID, serverSecret, roomID, Date.now().toString(), "Enter Name");

    // Ensure kitToken is generated
    if (!kitToken) {
      console.error('Failed to generate kit token.');
      return;
    }

    // Create ZegoUIKitPrebuilt instance
    const zp = ZegoUIKitPrebuilt.create(kitToken);

    // Join the room
    zp.joinRoom({
      container: element,
      sharedLinks: [
        {
          name: 'Personal link',
          url:
            window.location.protocol + '//' +
            window.location.host + window.location.pathname +
            '?roomID=' + roomID,
        },
      ],
      scenario: {
        mode: ZegoUIKitPrebuilt.GroupCall, // Modify to ZegoUIKitPrebuilt.OneONoneCall for 1-on-1 calls
      },
    });
  };

  return (
    <div
      ref={(element) => {
        if (element) {
          myMeeting(element);
        }
      }}
      style={{ width: '100vw', height: '100vh' }}
    ></div>
  );
}

1. Gestures (Beyond just "Clicking")
   Web: You mostly just click (onClick) or hover (onHover).
   Mobile: Phones are tactile. You Swipe, Pinch, Long Press, and Drag.

The Basics:

onPress: Standard tap.
onLongPress: Holding the button down (like selecting a message in WhatsApp).
The Advanced (Gesture Handler):
For complex stuff (Swipe to Delete, Pinch to Zoom), React Native has a library called react-native-gesture-handler.

Recruiter Q: "How would you implement a 'Swipe to Delete' feature?"
A: "I would use the Gesture Handler library combined with Reanimated. I'd wrap the list item in a Swipeable component."

Hinglish:
Web mein mouse hota hai, mobile mein ungli. Hum sirf "click" nahi karte, hum swipe aur zoom bhi karte hain. Simple clicks ke liye TouchableOpacity kaafi hai, lekin agar Tinder jaisa swipe feature banana hai, toh hamein React Native Gesture Handler library use karni padti hai.

2. Deep Linking (Connecting URLs to your App)
   The Concept:
   When you click a link in an email saying "Reset Password," on the web, it opens a website. On mobile, it should open your specific app screen. This is called Deep Linking.

How it works:

Custom Scheme: You define a URL like myapp://profile.
Universal Links: Standard https://myapp.com/profile that the phone intercepts.
Hinglish:
Socho kisi ne WhatsApp pe link bheja. Uspe click karke Chrome nahi khulna chahiye, seedha tumhari app ka "Product Page" khulna chahiye. Isko Deep Linking kehte hain. React Navigation isko handle kar leta hai configuration ke through.

3. Shadows (The Android vs. iOS Styling War)
   This is a classic "Gotcha" styling question.

Web: box-shadow: 10px 10px 5px grey; (Works everywhere).
React Native:

iOS: Supports shadowColor, shadowOffset, shadowOpacity.
Android: Does NOT support those properties. You must use the elevation property.
The Fix:
You usually write a style object that has both to be safe:

JavaScript

const styles = StyleSheet.create({
card: {
// iOS
shadowColor: '#000',
shadowOffset: { width: 0, height: 2 },
shadowOpacity: 0.25,
// Android
elevation: 5,
}
});
Hinglish:
Web wala box-shadow copy-paste karoge toh Android pe kuch nahi dikhega. Android mein shadow ke liye elevation property use hoti hai (jo Material Design concept hai). iOS ke liye alag properties hain. Hamein dono likhni padti hain.

4. Hermes (The Performance Engine)
   The Buzzword:
   Recruiters hearing "Hermes" tick a generic "He knows his stuff" box.

The Concept:
React Native relies on a JavaScript Engine to run your code.

Old days: Used JavaScriptCore (the engine inside Safari). It was slow on Android.
Now: Meta built Hermes. It is a lightweight JS engine optimized for Android. It makes the app start 2x faster.
Recruiter Q: "How do you improve app startup time?"
A: "I ensure that the Hermes engine is enabled in the build settings. It pre-compiles JavaScript to bytecode, making the app launch much faster, especially on Android."

Hinglish:
Pehle Android pe React Native apps start hone mein time leti thi. Facebook ne ek naya engine banaya Hermes. Ye app ko bohot fast load karwata hai. Default settings mein ye on hota hai, bas pata hona chahiye ki ye exist karta hai.

5. SVG and Icons (It's not like HTML)
   Web: You paste <svg>...</svg> code directly into HTML.
   React Native: Does NOT support SVG directly.

The Solution:

Icons: We use libraries like react-native-vector-icons (gives you FontAwesome, Ionicons, etc.).
Custom SVGs: We use a library called react-native-svg and a tool called SVGR to convert SVG code into a React Component.
Hinglish:
Web ki tarah seedha SVG file ya tag copy-paste nahi kar sakte. Error aa jayega. Hamein transformer libraries use karni padti hain jo SVG ko React Native ke shapes (Lines, Paths) mein convert karti hain.

6. Networking (Axios vs Fetch)
   Good News:
   This is exactly 100% the same as MERN.
   You can use fetch or axios.
   You use useEffect to call APIs.

One Small Catch (Localhost):
If your backend (Node/Express) is running on localhost:5000:

Web: accessing localhost:5000 works fine.
Android Emulator: localhost refers to the phone itself, not your laptop. You must use 10.0.2.2 (Special IP alias for the host loopback) or your Laptop's LAN IP (e.g., 192.168.1.5).
Recruiter Q: "My API works on Postman but fails on the Android Emulator. Why?"
A: "Because on Android, localhost points to the device itself. To reach the laptop's server, we need to use 10.0.2.2 or the machine's local IP address."

Summary Checklist: Differences for MERN Devs
When the recruiter asks "How is RN different from React?", verify these points in your head:

HTML Tags? No. (View, Text instead).
CSS? JS Objects (StyleSheet). No cascading.
Navigation? No URL bar. Use React Navigation (Stack/Tab).
Scrolling? Not automatic. Use ScrollView or FlatList.
Clicking? No onClick. Use onPress inside TouchableOpacity.
Database? No MongoDB on the phone. Use AsyncStorage or SQLite (local).
Shadows? elevation for Android.
Final Confidence Boost for the Call

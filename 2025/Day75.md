1. Pull-to-Refresh (Standard Mobile UX)
   Web: Users press F5 or the Reload button to refresh data.
   Mobile: There is no reload button. Users pull the screen down.

How to do it:
You don't need an external library. It’s built into FlatList and ScrollView.

JavaScript

import { FlatList, RefreshControl } from 'react-native';

const App = () => {
const [refreshing, setRefreshing] = useState(false);

const onRefresh = () => {
setRefreshing(true);
// Call API here...
// When data comes back -> setRefreshing(false);
};

return (
<FlatList
data={data}
renderItem={renderItem}
refreshControl={
<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
}
/>
);
};
Hinglish:
Web pe refresh button hota hai. Mobile pe user aadat se screen ko neeche khinchta hai (Pull down). React Native mein RefreshControl prop hota hai jo hum FlatList mein lagate hain. Ye apne aap wo "loading circle" dikhata hai jab tak API se naya data na aa jaye.

2. Offline Handling (NetInfo)
   Web: If internet goes, Chrome shows the Dinosaur game.
   Mobile: If internet goes, the app should NOT crash or show a white screen. It should say "No Internet Connection" or show cached data.

The Tool: @react-native-community/netinfo

Recruiter Q: "How do you handle the app when the user loses internet connection?"
A: "I use the NetInfo library to subscribe to network state changes. If isConnected becomes false, I show a Toast message or a specific 'No Internet' UI, and I might disable certain buttons that require API calls."

Hinglish:
Mobile user lift mein ya basement mein ho sakta hai jahan net na ho. Hamein NetInfo library use karni padti hai check karne ke liye. Agar net chala gaya, toh user ko ek chota popup (Toast) dikhana chahiye ki "You are offline", taaki wo frustrate na ho.

3. Redux Persist (Don't lose state on close)
   Web: If you close a tab and reopen it, Redux state resets (unless you save to localStorage).
   Mobile: Users close and open apps constantly. If they login, close the app, and open it again, they should still be logged in.

The Solution:
In MERN, you use standard Redux. In React Native, we almost always use Redux Persist. It automatically saves your Redux store to AsyncStorage and rehydrates (reloads) it when the app opens.

Hinglish:
Mobile mein agar user ne app band karke wapas kholi, toh uska data (jaise Cart items ya User Token) gayab nahi hona chahiye. Hum Redux Persist use karte hain jo Redux ki state ko phone ki memory mein save kar leta hai.

4. Fast Image (Performance Optimization)
   The Problem:
   The standard <Image /> component in React Native is okay, but it has issues with:

Caching (saving images so they don't download every time).
Flickering (image blinks when scrolling fast).
The Solution:
We use a library called react-native-fast-image. It is a wrapper around native iOS/Android image caching tools (SDWebImage / Glide).

Recruiter Q: "We have a feed with hundreds of high-quality images. It's laggy. How do you fix it?"
A: "I would replace the standard Image component with FastImage. It handles caching aggressively and prevents flickering in lists, making scrolling much smoother."

Hinglish:
Agar Instagram jaisa app bana rahe ho jahan bohot photos hain, toh normal Image tag slow ho jayega. Hum FastImage library use karte hain. Ye images ko phone mein cache (save) kar leta hai taaki agli baar load na karna pade.

5. Environment Variables (.env security)
   Web: You use .env files for API keys.
   Mobile: You also use .env, BUT you must be careful.

The Danger:
In a website, your backend code is hidden on the server.
In a mobile app, the whole code is downloaded to the user's phone. A hacker can decompile your APK and read your .env file.

Recruiter Q: "Where do you store your Stripe Secret Key or AWS Secret in the app?"
A: "I NEVER store secret keys in the React Native code. I only store Public Keys (like Firebase Config) in the app. All sensitive operations (like charging a credit card) are done on my Node.js backend, and the app just calls my API."

Hinglish:
Web mein .env server pe rehta hai. Mobile mein .env phone ke andar chala jata hai. Isliye kabhi bhi "Secret Keys" ya passwords app ke code mein mat dalo. Hacker nikaal lega. Sensitive kaam hamesha backend API ke through karo.

6. The "Keyboard Dismiss" Trick
   Problem:
   In a standard React Native app, if you type in a text box and then tap outside on the empty screen, the keyboard does not close automatically (unlike some websites).

Solution:
You have to wrap your screen in a TouchableWithoutFeedback.

JavaScript

import { Keyboard, TouchableWithoutFeedback } from 'react-native';

<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
  <View style={{ flex: 1 }}>
     {/* Your Form */}
  </View>
</TouchableWithoutFeedback>
Hinglish:
Mobile mein keyboard dheet hota hai. Agar aap form bhar rahe ho aur background pe click karte ho, toh keyboard neeche nahi jata. Hamein Keyboard.dismiss function call karna padta hai jab user background pe touch kare.

7. Versioning (versionCode vs versionName)
   Web: You deploy whenever you want.
   Mobile: You have versions.

versionName: "1.0.0" (What the user sees in the App Store).
versionCode (Android) / Build Number (iOS): An integer (1, 2, 3...).
Rule: You cannot upload an APK to the Play Store with the same versionCode twice. Even if versionName is still "1.0.0", you must increase the versionCode to update the app.

Summary: Technical Jargon to Impress
If you want to sound like a Pro, try to weave these sentences into your conversation:

"I avoid Prop Drilling by using Context API or Redux." (Shows architecture knowledge).
"I always memoize my list items (React.memo) inside FlatList to prevent unnecessary re-renders." (Shows performance knowledge).
"I use Platform.select for minor styling tweaks between iOS and Android." (Shows clean code habits).
"I prefer Functional Components with Hooks over Class Components." (Shows you are modern).
treams: The Water Pipe Concept
🛑 The Problem: "Bucket Strategy" (fs.readFile)
Abhi tak tu file aise padhta hoga:
fs.readFile('movie.mp4')

Ye kya karta hai?

Poori 2GB ki movie ko pehle RAM (Memory) mein load karta hai.
Fir user ko bhejta hai.
Nuksan:

Agar server ki RAM sirf 1GB hai, aur file 2GB ki hai -> CRASH! (Heap Out of Memory) 💥
User ko wait karna padega jab tak poori file load na ho jaye.
✅ The Solution: "Pipe Strategy" (fs.createReadStream)
Hum poori file ko memory mein nahi rakhenge. Hum usko Boond-Boond (Chunks) karke bhejenge.

Tanki (Hard Drive) se paani (Data) pipe (Stream) mein aaya.
Seedha User ke glass mein gaya.
RAM mein kabhi bhi paani jama nahi hua, bas beh gaya.
🛠️ Implementation
Scenario 1: User ko Badi File (Video/PDF) Bhejna
File: controllers/fileController.js

JavaScript

const fs = require('fs');
const path = require('path');

const downloadBigFile = (req, res) => {
const filePath = path.join(\_\_dirname, '../files/big-movie.mp4');

// ❌ BAD WAY (Don't do this for big files)
// const file = fs.readFileSync(filePath);
// res.send(file);

// ✅ GOOD WAY (Streams)
// 1. Stream banao (Nalka kholo)
const stream = fs.createReadStream(filePath);

// 2. Pipe (Jodna): File Stream -> Response Stream
// Jaise jaise data padha jayega, waise waise user ko bheja jayega
stream.pipe(res);

// Error handling zaroori hai (Agar pipe phat jaye)
stream.on('error', (err) => {
res.status(500).json({ error: "Stream mein error aa gaya" });
});
};
Fayda:
User turant video dekhna shuru kar sakta hai (Buffering), use poori file download hone ka wait nahi karna padega. Aur Server ki RAM sirf kuch KBs use hogi.

Scenario 2: Badi CSV File Process Karna (Upload & Save)
Imagine kar user ne 10 Lakh Users ki CSV file upload ki hai. Tujhe DB mein save karna hai.

Agar tu poori file ek saath padhega -> RAM Full -> Server Dead.

Hum use karenge: npm install csv-parser

JavaScript

const fs = require('fs');
const csv = require('csv-parser');

const processCsvUpload = (req, res) => {
const results = [];

// req.file.path wo file hai jo Multer ne save ki hai
fs.createReadStream(req.file.path)
.pipe(csv()) // Converter: Raw Buffer -> JSON Object
.on('data', (data) => {
// 🌊 Ye event har EK ROW ke liye call hoga
// Hum yahan data modify kar sakte hain
// Example: results.push(data) ya seedha DB mein insert karo

      // Pro Tip: Yahan batch mein insert karna chahiye (e.g. 100 rows at a time)
      console.log("Reading row:", data.name);
    })
    .on('end', () => {
      // Jab poori file khatam ho jaye
      console.log("CSV Processing Complete ✅");
      res.json({ message: "File processed successfully" });
    });

};
🧠 Types of Streams (Interview Gyan)
Node.js mein 4 tarah ki streams hoti hain:

Readable Stream: Jisse data padha jata hai (Source).
Ex: fs.createReadStream, req (User jo data bhejta hai).
Writable Stream: Jisme data likha jata hai (Destination).
Ex: fs.createWriteStream, res (User ko response bhejna).
Duplex Stream: Dono kaam kar sakta hai.
Ex: Sockets (WebSockets).
Transform Stream: Data ko beech mein modify karta hai.
Ex: zlib.createGzip() (File ko on-the-fly compress/zip karna).
🔥 Cool Trick: File ko Zip karke bhejna
JavaScript

const zlib = require('zlib'); // Built-in Node module

const downloadZipped = (req, res) => {
const source = fs.createReadStream('input.txt');
const gzip = zlib.createGzip(); // Transform Stream (Compressor)

// Pipeline: Source -> Compressor -> User
res.setHeader('Content-Encoding', 'gzip');
source.pipe(gzip).pipe(res);
};
🚀 Summary
Streams data ko chunks (tukdo) mein handle karta hai.
Memory Efficient: 1GB RAM mein 100GB ki file process kar sakte ho.
Time Efficient: Processing turant shuru ho jati hai (wait nahi karna padta).
Keyword: .pipe() (Ek stream ko dusre se jodna).
Ab bata, Streams ka concept clear hua?
Next topic kya karein?

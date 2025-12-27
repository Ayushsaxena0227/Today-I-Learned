Charge" kya hai? (What is a Charge?)
Simple English mein "Charge" ka matlab hota hai kisi se paise lena.
Payment gateway ki duniya mein, "Charge" ek digital file ya record hai jo ek single payment transaction ko represent karta hai.

Jab tum Tap ko bolte ho ki "Mere customer se 10 BHD lo", toh Tap ek Charge Object create karta hai. Isko tum ek "Digital Receipt" samajh sakte ho jo abhi kacchi (draft) hai.

Isme kya likha hota hai?

ID: chg_12345 (Is receipt ka unique number)
Amount: 10.5
Currency: BHD
Status: Shuru mein ye INITIATED hota hai (matlab process shuru hua hai, paise abhi kate nahi hain).
Flow:

Create Charge: Tumne receipt banayi (Status: Initiated).
Process: User ne card details daali.
Result:
Agar paise kat gaye → Status ban jata hai CAPTURED (Paise pakad liye).
Agar card decline ho gaya → Status ban jata hai FAILED.
Conclusion:
Jab bhi code mein createCharge likha ho, uska matlab hai: "Tap bhai, ek nayi payment ki receipt kholo aur vasooli shuru karo."

2️⃣ "Webhook" kya hai? (Deep Dive)
Webhook shabd sunne mein technical lagta hai, par concept bahut simple hai.
Webhook = "Digital Chugli" (Notification) 🤫

Isse samajhne ke liye ek example lete hain:

Scenario: Pizza Order 🍕
Imagine karo tumne Domino's ko call kiya (Order place kiya).

Tareeka A (Polling - Old Style):
Tum har 2 minute mein Domino's ko call karke pooch rahe ho:

"Pizza bana?" -> "Nahi."
(2 min baad) "Pizza bana?" -> "Nahi."
(2 min baad) "Pizza bana?" -> "Haan ban gaya."
(Isme tumhari mehnat aur time waste ho raha hai).
Tareeka B (Webhook - Smart Style):
Tumne order dete waqt Domino's ko bola:
"Bhai, jab pizza ban jaye, toh tum mujhe call karke bata dena (Call me back)."
Tum aram se baithe ho. Jab pizza ready hua, Domino's ne tumhe phone (Webhook) kiya: "Sir, pizza ready hai."

Yahi Webhook hai.

Bina Webhook ke: Tera server baar-baar Tap se poochega "Payment hui? Payment hui?" (Server par load badhega).
Webhook ke saath: Tera server chupchap baitha hai. Jaise hi payment hoti hai, Tap khud tere server ko "ping" karta hai.
3️⃣ "Tap sends a webhook" ka matlab kya hai?
Iska matlab hai Roles Reverse ho jaate hain.

Normally: Tera Frontend/Backend → Tap ko call karta hai (createCharge).
Webhook ke time: Tap ka Server → Tere Backend ko call karta hai.
Tap tere backend ke ek specific URL (jo tune WebhookService mein banaya hai) par ek HTTP POST Request bhejta hai.

Wo request ek lifafa (JSON body) hoti hai jisme likha hota hai:

"Suno Backend bhai! Ye jo Charge ID chg_123 tha na, jiska order ID ord_555 tha, wo abhi-abhi CAPTURED (Pass) ho gaya hai. Apne database mein update kar lo."

4️⃣ Is Webhook a "Callback"?
Haan, bilkul! 100%.

"Callback" ka literal matlab hai "Call Back" (Wapas call karna).

Flow dekho:

Call: Tune Tap ko call kiya → "Payment lo."
Wait: Tap payment process kar raha hai...
Callback: Jab kaam ho gaya, Tap ne tujhe wapas call (Callback) kiya → "Kaam ho gaya."
Technically, Webhook ek "Asynchronous HTTP Callback" hai.

Asynchronous matlab: Turant nahi hota, thodi der baad hota hai jab event complete ho jata hai.
💡 Hamein iska fayda (benefit) kya hai? (Crucial Point)
Tu soch raha hoga: "Jab user payment karke wapas meri site par redirect hota hi hai, toh main wahi check kyu na kar lun? Webhook kyu chahiye?"

Badi problem samjho:
User ne Tap ke page par payment kar di (Paise kat gaye).
Lekin...

Uska internet turant band ho gaya.
Ya usne galti se browser close kar diya.
Ya redirect hone mein error aa gaya.
Agar Webhook nahi hota, toh:

Tap ke paas paise aa gaye.
Lekin tera user tere site par wapas nahi pahuncha.
Tere database ko kabhi pata hi nahi chalega ki payment ho gayi.
Order "Pending" reh jayega par customer ke paise kat chuke honge. (Bada issue! 😡)
Webhook ka fayda:
User chahe browser band kar de, laptop phod de, ya bhaag jaye... Tap ka server aur Tera server toh zinda hain na?
Tap chupke se tere server ko Webhook bhej dega: "Bhai user bhaag gaya par payment ho gayi hai, tum order confirm kar do."

Isliye Webhook Reliability (bharose) ke liye zaroori hai.

🎯 Summary in Hinglish
Charge: Ek payment ki file/receipt. Jab tak paise na mile INITIATED, mil gaye toh CAPTURED.
Webhook: Tap ki taraf se automatic phone call tere server ko, jo batata hai ki payment ka status kya hua.
Tap sends webhook: Tap ka server tere server ke ek URL ko hit karta hai data ke saath.
Callback: Haan, Webhook ek callback hi hai.
Kyu chahiye: Taaki agar user ka internet chala jaye ya wo window close kar de, tab bhi humare database mein pata chal jaye ki payment ho gayi hai.
Tap ek "Ziddi Postman" (Stubborn Postman) hai
Imagine karo Tap ek Postman hai jo chitthi (Webhook) lekar tumhare ghar (Server) aaya.

Attempt 1 (Server Down):
Postman ne darwaza khatkhataya. Tumhare ghar pe koi nahi tha (Server Error 500 ya Timeout).
Kya Postman chitthi faad ke phek dega? Nahi.
Wo sochega: "Shayad so raha hoga. Main thodi der baad wapas aaunga."

Wait & Retry (Thodi der baad):
Tap turant wapas nahi aata. Wo thoda wait karega (maan lo 5 minute).
Phir wapas aayega (Attempt 2).
Agar abhi bhi server down hai, wo phir chala jayega.

Exponential Backoff (Lamba intezaar):
Ab wo 5 minute nahi, balki 30 minute wait karega. Phir 1 ghanta. Phir 4 ghante.
Isse kehte hain Exponential Backoff. Wo time gap badhata jayega taaki tumhare server par load na pade agar wo struggle kar raha hai.

Kab tak try karega?
Zyadatar payment gateways 24 ghante tak koshish karte rehte hain. Wo lagataar ping karte rahenge jab tak:

Tumhara server "200 OK" (Success) na bol de.
Ya time limit (e.g. 24 hours) khatam na ho jaye.
To scenario ye hai:
Tera server 2 ghante ke liye down tha.
Jaise hi server wapas ONLINE aayega, Tap (jo wait kar raha tha) turant wo pending Webhook deliver kar dega.
Tera order 2 ghante late sahi, par CONFIRM zaroor hoga.

🛡️ Ek "Safety Net" bhi hota hai (Reconciliation)
Maan lo kismat hi kharab thi. Tera server 24 ghante se zyada down raha (Bahut badi disaster). Tap ne try karna band kar diya.
Ab kya?

Yahan ek Cron Job (Scheduled Task) kaam aata hai.

Professional systems mein hum ek script likhte hain jo har raat (ya har ghante) chalti hai:

Script: "Database bhai, mujhe wo saare orders dikhao jo pichle 24 ghante mein create huye the lekin abhi tak 'Pending' hain."
Database: "Ye lo list: Order #123, #125."
Script: "Theek hai." (Ab Script TapService.getCharge(chargeId) use karke Tap se poochegi).
"Tap bhai, Order #123 ka status kya hai?"
Tap: "Arre wo toh kab ka Pass (Captured) ho gaya."
Script: "Achha! Update kar deta hoon."
Is process ko "Reconciliation" kehte hain. Ye Webhook ka backup plan hai.

⚠️ Ek Zaroori Cheez (Idempotency)
Kyunki Tap "Ziddi" hai aur baar-baar try karta hai, ek choti si problem ho sakti hai jab server wapas online aaye:
Double Processing.

Scenario:

Tap ne Webhook bheja.
Tere server ne process kar diya (Database update ho gaya).
Lekin tere server ne Tap ko "OK" bolne se pehle hi network error de diya.
Tap ko laga "Fail ho gaya".
Tap ne DOBARA wahi Webhook bhej diya.
Solution:
Tere code mein check hona chahiye:

JavaScript

if (order.status === 'Paid') {
return { message: 'Ye toh pehle se Paid hai, main kuch nahi karunga.' };
}
Isse kehte hain Idempotency (Ek hi kaam ko 10 baar bhi bolo, result same rahega, double paise add nahi honge).

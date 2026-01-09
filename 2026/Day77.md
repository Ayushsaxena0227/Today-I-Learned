3️⃣ Optimistic Locking (The Intelligent Save) 🔒
Definition:
Ye ek strategy hai jahan hum data lock nahi karte (block nahi karte). Hum bas save karne se pehle Check karte hain ki "Kya kisi aur ne mere peeth peeche data badal diya?"

Detailed Example (Back to Bank Account with **v):
Database Row: { balance: 100, **v: 0 }

User A (Read): Balance padha (100) aur Version padha (0).

User B (Read): Balance padha (100) aur Version padha (0).

User A (Write): A ne kaha "Balance 20 kar do".

Mongoose DB se bolega: "Update kar do, LEKIN sirf tabhi agar Version abhi bhi 0 hai."
DB check karega: "Haan, abhi 0 hai."
Success! Update: { balance: 20, \_\_v: 1 }.
User B (Write): B ne kaha "Balance 50 kar do".

Mongoose DB se bolega: "Update kar do, LEKIN sirf tabhi agar Version abhi bhi 0 hai."
DB check karega: "Arre nahi! Version to ab 1 ho chuka hai (User A ki wajah se)."
FAILURE! DB bolega: "Version Match Error! Tumhara data purana hai."
Result:
User B ka transaction fail ho jayega. Bank ke paise bach gaye.
Ab User B ko error milega, aur wo wapas naya balance (20) check karega aur dekhega ki ab wo 50 nahi nikal sakta.

Summary in English/Hinglish:
Race Condition: A "timing bug" where two processes overwrite each other because they didn't know the other was working on the same data.
**v: A counter managed by Mongoose to track how many times a document has been modified.
Optimistic Locking: Using the **v field to prevent overwrites. "I will only update this document if it hasn't changed since I last looked at it."
Bhai, ab ekdum crystal clear hua? Ki hum wo \_\_v field kyun rakhte hain?

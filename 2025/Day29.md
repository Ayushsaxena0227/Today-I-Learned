Whatever you put inside onClick={ ... } must be a function reference that React can call later when the user clicks.

React does not immediately run what’s inside — it just stores whatever that expression evaluates to.

❌ The unsafe version
React

onClick={handleDelete(id)}
Here, JavaScript executes handleDelete(id) right away (during rendering).
Whatever that call returns (e.g. undefined) becomes the onClick handler.
So React ends up attaching undefined → you already ran the function once per render instead of on click.

✅ The safe “arrow wrapper” version
React

onClick={() => handleDelete(id)}
Why is this okay?

Because () => handleDelete(id) is itself a brand‑new function — a function that does nothing now but promises that when React invokes it later (on click), it will then call handleDelete(id).

So:

Expression When it executes
handleDelete(id) immediately, during render
() => handleDelete(id) later, when user clicks
⚙️ 2️⃣ When you don’t need arguments
When you simply have:

React

onClick={changeColor}
changeColor is already the function reference you want to run later.
No arguments → no need for an arrow wrapper.

Adding () => changeColor() still works but just adds an extra layer that creates a new function every render (slightly less efficient).

🧩 3️⃣ So the logical rule
Need to pass data? Correct syntax Why
❌ No, simple function call onClick={handleClick} Hand React the function directly
✅ Yes, parameters to pass onClick={() => handleClick(id)} Wrap in arrow so it only calls on click
🚫 Wrong onClick={handleClick(id)} Function runs right away during render
💬 Mental picture
Think of onClick as React asking:

“Give me the phone number to call when the button is clicked.”

onClick={handleDelete} → you hand them the number: “Call this person later.”
onClick={handleDelete(id)} → you already called and hung up (too early).
onClick={() => handleDelete(id)} → you give React a helper:
“When you call this helper, it will then dial that number with this id.”
✅ So both of these statements are true:

Don’t put ()  directly → because it executes immediately.
Do wrap it in () => … if you need to defer execution with arguments.
ow optional chaining works
?. says:

“If the thing on the left exists (is not null or undefined), go ahead and access the next property;
otherwise stop here and just give me undefined — don’t throw an error.”

Without it, if user or info were missing, this line would crash with:

text

TypeError: Cannot read properties of undefined (reading 'info')
✅ What happens in your case
All levels exist, so:

arr → object exists
- arr.user → exists
- arr.user.info → exists
- arr.user.info.name → exists → returns "Ayush"
Output:

text

Ayush
🔒 If one level were missing
Example:

JavaScript

const arr = {};
console.log(arr?.user?.info?.name);
Here:
- arr.user is undefined,
so JS stops right there and returns undefined, without throwing an error.

No crash, just safely undefined.

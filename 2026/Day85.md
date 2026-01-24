estions Designed to Uncover True Understanding

1. For Your E-commerce App
   The Simple Question:
   "I see you built an e-commerce app with a shopping cart. That's great. When a user is not logged in, how did you decide to store their cart data? Did you use localStorage, sessionStorage, or something else? Why?"

The "Typing" Answer: "The tutorial used localStorage, so I used that." (This is the equivalent of "the YouTuber used MongoDB").
The "Engineering" Answer: "That was an interesting decision. I considered both sessionStorage and localStorage. I chose localStorage because I wanted the user's cart to persist even if they accidentally closed the browser tab and came back later. sessionStorage would have been wiped out. However, I made a conscious decision not to store any sensitive information in it, only product IDs and quantities, because I know localStorage is accessible via JavaScript and can be vulnerable to XSS attacks. Once the user logs in, I sync the localStorage cart with a permanent cart stored in the backend database."
What this question reveals:

Understanding of different browser storage mechanisms.
Awareness of their persistence rules and security trade-offs.
Thinking about the user experience (what happens if I close the tab?).
Architectural thinking (syncing local state with backend state). 2. For Your Spotify/Music Player Clone
The Simple Question:
"In your music player, I see a 'Now Playing' bar at the bottom of the page that's always visible. How did you manage the state of the currently playing song? Where did that state live in your React component tree, and why did you put it there?"

The "Typing" Answer: "I used useState in the main App.js component."
The "Engineering" Answer: "This was a classic "lifting state up" problem. Initially, I put the currentlyPlaying state inside the SongList component. But then I realized the PlayerControls component (the bar at the bottom) also needed to know which song was playing to show its name and handle the play/pause button. Since SongList and PlayerControls were sibling components, I had to lift the state up to their nearest common ancestor, which was my main App component. App now owns the state, passes the currentSong down as a prop to both components, and passes the setCurrentSong function down to the SongList so it can change the song when a user clicks on a new one. I considered using Context, but since only two components needed the state, lifting it up was a simpler and cleaner solution."
What this question reveals:

Deep understanding of React state management and component communication.
Knowledge of core patterns like "Lifting State Up."
Architectural trade-off analysis (Lifting State vs. Context).
Ability to explain a problem and the evolution of its solution. 3. For Any App with a Login System
The Simple Question:
"You have a login feature. After the user successfully logs in, the server sends back a JWT. Where did you store this token on the client-side, and what were the security trade-offs you considered?"

The "Typing" Answer: "I stored it in localStorage."
The "Engineering" Answer: "I researched this and found there were a few options, primarily localStorage and httpOnly cookies. I ended up using localStorage for this project because it's simpler to implement from the frontend—I can easily read and attach the token to my API requests with an Axios interceptor. However, I am aware of the security risk: if my site has an XSS vulnerability, a malicious script could steal the token from localStorage. In a real production application with higher security needs, I would advocate for using httpOnly cookies. They can't be accessed by JavaScript, which mitigates the risk of XSS-based token theft, but it requires closer coordination with the backend to set and manage the cookie correctly. It's a trade-off between implementation simplicity and security hardening."
What this question reveals:

Awareness of web security fundamentals.
Knowledge of different client-side storage options.
Understanding of attack vectors like XSS.
The ability to weigh pros and cons of different technical approaches.

<h4>4. For Any Project with a List and a Search Bar</h4>
The Simple Question:

# Memory Matching Game

A browser-based card flip game built with HTML, CSS and jQuery.

---

##  How to Play?

1. Click any card to flip it and reveal the emoji
2. Click a second card to find its pair
3. If both cards match — they stay face up with a green border
4. If they don't match — they flip back after 1 second
5. Match all 8 pairs to win!

---

##  Features

- 16 cards — 8 emoji pairs, shuffled randomly every game
- 3D flip animation using CSS rotateY and backface-visibility
- Move counter — tracks every pair attempt
- Live timer — starts on first flip, stops on win
- Win message when all pairs are matched
- Restart button resets everything
<img width="873" height="854" alt="image" src="https://github.com/user-attachments/assets/cf82690c-2ee5-497e-a1be-8645ad42468c" />

---

## Built With

- HTML5 — page structure
- CSS3 — card flip animation (perspective, rotateY, backface-visibility, transition)
- jQuery 3.7.1 — DOM manipulation and game logic

---

## How to Run

No installation needed. Just:

1. Clone the repo
   git clone https://github.com/dania-usman/memory-matching-game

2. Open index.html in any browser

That's it!

---

##  Concepts Practiced

- jQuery selectors — $(this), $('.card'), $('#gameBoard')
- DOM manipulation — addClass, removeClass, hasClass, attr, append
- Game state management using JavaScript variables
- setInterval and clearInterval for the live timer
- setTimeout for the 1 second flip-back delay
- CSS 3D transforms for the card flip animation

---


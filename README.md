🎙️ Podcast App
A modern podcast browsing and listening application where you can discover shows, save your favorites, and enjoy seamless audio playback across all pages.

🌐 Live Demo
View Live App

📖 About This Project
I built this podcast app as part of my coding journey and honestly, it was way harder than I expected but also super rewarding! The idea was to make something that actually feels like a real app you'd download from an app store. You can scroll through different podcasts, listen to episodes, save the ones you like, and even switch between light and dark mode depending on your vibe. It's been really cool seeing it all come together.

✨ Features I Built

🎵 Audio Player
The audio player was probably the most challenging part! It stays at the bottom of the screen no matter which page you're on, so you can keep listening while browsing other shows. I added play/pause controls, a progress bar you can drag to skip around, and it even saves where you left off if you refresh the page. There's also a warning if you try to close the tab while something's playing so you don't lose your spot.

❤️ Favorites System
You can click the heart icon on any episode to save it to your favorites. I used localStorage to make sure your favorites stick around even after you close the browser. The favorites page shows everything organized by show, and you can sort them by title or by when you added them. It also shows the date you favorited each episode which I thought was a nice touch.

🎠 Recommended Shows
On the home page, there's a carousel at the top with recommended shows you can scroll through. I added left and right arrow buttons to make it easy to browse. When you click on a show, it takes you straight to the detail page. If you've favorited any episodes from a show, it shows a little heart indicator on the card.

🌗 Theme Toggle
I wanted to make sure the app looks good whether you prefer light or dark mode. The theme toggle is in the header and it switches everything smoothly. Your choice gets saved so next time you visit, it remembers what you picked.

🔍 Search and Filters
You can search for podcasts by name, filter by genre, and sort by different options like title or date updated. I also made the pagination adjust based on your screen size so you see more items on bigger screens.

🛠️ Technologies I Used
React - I used this to build everything because it makes creating interactive UIs so much easier

Vite - Way faster than Create React App, made development much smoother

React Router - So people can bookmark specific shows and navigate properly

CSS Modules - Helped me keep my styles organized without everything clashing

Context API - Honestly saved my life when dealing with the audio player state across pages

localStorage - For saving favorites and theme choices so they don't disappear when you refresh

Podcast API - Where all the actual podcast data comes from

🚀 What I Learned
This project taught me a lot about managing state in React, especially with the audio player. Getting the player to work across different pages without interrupting playback was tricky but really rewarding once I figured it out. I also learned a lot about localStorage and how to structure a bigger React app with contexts and custom hooks.
Responsive design was another big learning area. Making sure the carousel works on mobile, the audio player doesn't cover important content, and everything scales nicely took some experimentation but I'm happy with how it turned out.

🎯 Future Improvements
If I had more time, I'd love to add user accounts so your favorites sync across devices. It would also be cool to add a "continue listening" section that shows episodes you started but didn't finish. Maybe even add the ability to create custom playlists or share episodes with friends.

📱 Mobile Responsive
The app works on phones, tablets, and desktops. I used media queries to make sure everything adapts to different screen sizes. The carousel is swipeable on touch devices, and the audio player controls stack nicely on smaller screens.

🙏 Acknowledgments
Thanks to the podcast API for providing all the data, and to everyone who helped me troubleshoot issues along the way. This was a challenging project but I learned so much and I'm really proud of what I built!
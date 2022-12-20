<h1 align="center">Notate</h1>

<p align="center"><img src="public/social.png"></p>

<h3 align="center">
Notate is an effective and intuitive cloud-based note-taking tool with a great user experience for writing down ideas, taking quick notes or keeping a journal at any time, synced across multiple devices.
</h3>

<h4 align="center">
<br>
Made with

<a href="https://firebase.google.com/"><img src="https://img.shields.io/badge/firebase-%23FFCA28.svg?&style=for-the-badge&logo=firebase&logoColor=black" /></a>
<a href="https://vuejs.org/"><img src="https://img.shields.io/badge/vue.js-%234FC08D.svg?&style=for-the-badge&logo=vue.js&logoColor=white" /></a>
<a href="https://javascript.com"><img src="https://img.shields.io/badge/javascript-%23F7DF1E.svg?&style=for-the-badge&logo=javascript&logoColor=black" /></a>
<a href="https://tailwindcss.com/"><img src="https://img.shields.io/badge/tailwind%20css-%2338B2AC.svg?&style=for-the-badge&logo=tailwind%20css&logoColor=white" /></a>
<a href="https://tiny.cloud"><img src="https://img.shields.io/badge/TinyMCE-%230696D7.svg?&style=for-the-badge&logo=a&logoColor=white" /></a>
<br/>
</h4>
<br>

<h3>
<strong>Links</strong>

<a href="https://notate.netlify.app" target="_blank">View the app in action.</a>

<a href="https://www.behance.net/gallery/154544225/Notate-Note-taking-application" target="_blank">Check out more screenshots on behance.</a>
</h3>
<br>

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```

### Firebase config
Create a firebase web app from firebase console and paste the app config in source folder (src/firebase.js).
```javascript
import { initializeApp } from 'firebase/app'

const firebaseConfig = {
    //...your firebase config
}

const initFirebase = initializeApp(firebaseConfig)
export default initFirebase
```

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

<br>
Some images used in the UI were gotten from <a href="iconscout.com">iconscout.com</a> and <a href="freepik.com">freepik.com</a>
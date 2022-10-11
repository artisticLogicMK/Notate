<script setup>
import AppIntro from './components/AppIntro.vue'
import AuthModal from './components/AuthModal.vue'
import NoteBoard from './components/NoteBoard.vue'
import Loader from './components/Loader.vue'

import initFirebase  from './firebase'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { useStore } from './stores/global'
import { onMounted, ref } from 'vue'
import AOS from 'aos'

//initialize pinia store
const store = useStore()

//initialize firebase app
initFirebase

//init firebase services
const auth = getAuth()

//set display states
const showAppIntro = ref(false)
const showNoteBoard = ref(false)

onMounted(() => {
  AOS.init({
    duration: 600
  })
})

//listen to firebase user sign in and sign out
onAuthStateChanged(auth, (user) => {
  if (user) {

    //user is signed in
    store.setUser(user.uid) //user is signed in, store uid in state
    showNoteBoard.value = true //display NoteBoard
    store.displayAuthModal(false) //hide sign in modal

  } else {

    //user is signed out
    store.setUser(null) //user is signed out, nullify user
    showAppIntro.value = true //display AppIntro
    store.displayAuthModal(false) //hide sign in modal

  }
})
</script>

<template>
  <div class="fixed top-0 left-0 z-10 w-screen h-screen flex items-center justify-center" v-if="!showNoteBoard && !showAppIntro">
    <Loader class="w-16 animate-spin" />
  </div>

  <AppIntro v-if="showAppIntro && !store.userId" />

  <NoteBoard v-if="showNoteBoard && store.userId" />

  <AuthModal />

  <div class="absolute bottom-0 z-10 w-full text-white text-sm bg-red-500/[.85] py-1 px-2 text-center" v-if="store.internetOff">
    Check Your Internet Connection!
  </div>
</template>
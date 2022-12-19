<script setup>
import AppIntro from './components/AppIntro.vue'
import NoteBoard from './components/NoteBoard.vue'
import Loader from './components/Loader.vue'

import { useRouter } from 'vue-router'
import initFirebase  from './firebase'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { useStore } from './stores/global'
import { onMounted, ref, watch } from 'vue'
import AOS from 'aos'

const router = useRouter()

const store = useStore() //initialize pinia store

initFirebase //initialize firebase app

const auth = getAuth() //init firebase auth

const loading = ref(true)

onMounted(() => {
  //init AOS anims
  AOS.init({
    duration: 600
  })
})

//listen to firebase user sign in and sign out
onAuthStateChanged(auth, (user) => {
  if (user) {

    //user is signed in
    store.setUser(user.uid) //store uid in state
    loading.value = false //hide loader
    store.displayAuthModal(false) //hide auhth modal

    router.push({path: '/noteboard/'+user.uid}) //go to noteboard

  } else {

    //user is signed out
    store.setUser(null) //nullify user state
    loading.value = false //hide loader
    store.displayAuthModal(false) //hide auhth modal
    
    router.push('/') //go to home

  }
})
</script>

<template>
  <div
    class="fixed top-0 left-0 z-10 w-screen h-screen flex items-center justify-center"
    v-if="loading"
  >
    <Loader class="w-16 animate-spin" />
  </div>

  <RouterView v-if="!loading"  />
  

  <div
    v-if="store.internetOff"
    class="absolute bottom-0 z-10 w-full text-white text-sm bg-red-500/[.85] py-1 px-2 text-center"
  >
    Check Your Internet Connection!
  </div>
</template>
<script setup>
import { useStore } from '../stores/global'
import { ref } from "vue"
import initFirebase  from '../firebase'
import {
    getAuth,
    GoogleAuthProvider,
    FacebookAuthProvider,
    signInWithPopup,
    signInWithRedirect,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword
} from 'firebase/auth'

//initialize pinia store
const store = useStore()


//initialize firebase app
initFirebase


//init firebase auth services
const auth = getAuth()


//chooses to continue with google authentication
const openGoogle = () => {
    //open google auth window
    const provider = new GoogleAuthProvider()
    signInWithPopup(auth, provider)
}


//signify sign in mode. login or create account
const signMode = ref('login')


//user form
const signform = ref({
    email: '',
    password: '',
    error: '',
    processing: false
})


const handleUser = () => {
    //for when form action is still in process
    signform.value.processing = true

    if (signMode.value == 'create') {
        createUserWithEmailAndPassword(auth, signform.value.email, signform.value.password)
        .then(() => signform.value.processing = false )
        .catch((err) => {
            signform.value.error = err.message.replace('Firebase: ', '')
            signform.value.processing = false
        })
    }

    if (signMode.value == 'login') {
        signInWithEmailAndPassword(auth, signform.value.email, signform.value.password)
        .then(() => signform.value.processing = false )
        .catch((err) => {
            signform.value.error = err.message.replace('Firebase: ', '')
            signform.value.processing = false
        })
    }
}
</script>


<template>
  <transition enter-active-class="ans an-fadeIn an-fast" leave-active-class="ans an-fadeOut an-fast">
    <div class="modal" v-if="store.authModal">
    </div>
  </transition>

  <transition enter-active-class="ans an-zoomIn an-faster" leave-active-class="ans an-zoomOut an-fast">
    <div class="dialogue-con" v-if="store.authModal" @click.self="store.displayAuthModal(false)">
      <div class="dialogue" v-if="store.authModal">

        <div class="w-fit mx-auto mb-4">
          <button class="modalBtns text-neutral-700 mr-2" :class="{'active': signMode == 'login'}" @click="signMode = 'login'">Login</button>
          <button class="modalBtns text-neutral-700" :class="{'active': signMode == 'create'}" @click="signMode = 'create'">Sign Up</button>
        </div>

        <div>
          <button class="oAuths" v-wave @click="openGoogle">
            <img src="../assets/img/icons/google.svg">
            Continue with Google
          </button>
          <button class="oAuths hidden" v-wave @click="openFacebook">
            <i class="la la-facebook-square text-[#4267b2] text-3xl leading-[0]"></i>
            Continue with Facebook
          </button>
        </div>

        <div class="text-neutral-400 dark:text-neutral-500 font-bold my-3 text-center">or</div>

        <form id="signform" @submit.prevent="handleUser">
            <p v-if="signform.error" class="mb-1 text-red-500 text-[0.8rem]">{{signform.error}}</p>

            <div>
              <label data-aos="zoom-in" data-aos-offset="0" v-if="signform.email.length">Email</label>
              <input type="email" v-model="signform.email" placeholder="Email" required>
            </div>

            <div>
              <label data-aos="zoom-in" data-aos-offset="0" v-if="signform.password.length">Password</label>
              <input type="password" v-model="signform.password" placeholder="Password" required>
            </div>

            <div class="text-right">
                <button type="submit" class="modalBtns authBtn active" :disabled="signform.processing" v-wave>
                  Get In
                  <i class="ml-0.5 la la-arrow-right" :class="{'la-spinner la-pulse': signform.processing}"></i></button>
            </div>
        </form>

      </div>
    </div>
  </transition>
</template>


<style>
.modal {
  @apply fixed w-full h-full top-0 bg-black/[0.03] backdrop-blur-[1.7px] backdrop-saturate-[171%] z-10
}
.dialogue-con { @apply fixed w-full h-full top-0 z-10 flex items-end xsm:items-center justify-center }
.dialogue-con .dialogue { @apply rounded-xl bg-white dark:bg-neutral-800 px-3 xsm:px-5 py-8 my-5 w-[95%] xsm:w-96 mx-auto shadow-lg border dark:border-neutral-900/75 }
.dialogue .modalBtns { @apply rounded-md font-semibold text-sm px-3 py-1.5 dark:text-neutral-300 }
.dialogue .modalBtns.active{ @apply bg-neutral-700 text-white dark:text-neutral-300 }

.oAuths { @apply flex items-center justify-center mb-1.5 border-2 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300 rounded-md py-1.5 w-full text-sm }
.oAuths img { @apply w-5 inline-block mr-3 }

#signform div { @apply mb-5 last:mb-0 }
#signform label { @apply block text-xs text-neutral-700 dark:text-neutral-300 font-bold }
#signform input { @apply border-b-2 text-sm bg-transparent text-neutral-600 dark:text-neutral-300 w-full py-1.5 dark:border-neutral-700 focus:border-neutral-600 dark:focus:border-neutral-300/90 }
</style>
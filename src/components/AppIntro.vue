<script setup>
import ThemeSwitch from '../components/NoteBoard/ThemeSwitch.vue'
import { useStore } from '../stores/global'

//initialize pinia store
const store = useStore()
</script>

<template>
    <div class="bg-gradient-to-b from-neutral-300 dark:from-black to-transparent relative">
        <div class="bg-[url(../img/waves.png)] bg-cover bg-center w-full h-full absolute top-0 z-[9] dark:opacity-[.15]"></div>

        <div class="md:flex items-center md:h-screen max-w-5xl mx-auto pt-10 md:pt-0 md:mt-0 px-3 md:px-5 bg-grad relative z-10" data-aos="fade">
            <div class="md:mr-4 w-full md:w-1/2" data-aos="fade-right">
                <img src="../assets/img/logo.svg" class="dark:hidden">
                <img src="../assets/img/logo_dark.svg" class="hidden dark:block">
                
                <p class="mb-3 text-base text-neutral-900 dark:text-neutral-300">UpNote is an effective and intuitive cloud-based note-taking tool with a great user experience for writing down ideas, taking quick notes or keeping a journal at any time, synced across multiple devices.</p>
                
                <div class="flex items-center">
                    <button class="rounded-full bg-neutral-300 dark:bg-neutral-700 text-neutral-500 dark:text-neutral-300/90 text-lg font-semibold px-5 py-2" v-wave @click="store.displayAuthModal(true)">Get Started</button>
                    <ThemeSwitch class="text-neutral-900 dark:text-neutral-300/90" />
                </div>
            </div>

            <img src="../assets/img/notes.webp" oncontextmenu="false" class="w-[75%] xsm:w-[65%] md:w-1/2 mt-7 md:mt-0 mb-8 md:mb-0 dark:opacity-70 mx-auto" data-aos="flip-left" data-aos-delay="400">
        </div>

    </div>

    <div class="absolute bottom-0 z-10 w-full text-center text-[0.82rem] text-neutral-900 dark:text-neutral-300 py-1">
        <a href="https://artisticlogicmk.one" target="_blank" class="mr-2.5 hover:underline"><i class="la la-globe"></i> artisticlogicmk.one</a>
        <a href="https://github.com/artisticLogicMK/upnote" target="_blank" class="hover:underline"><i class="la la-github"></i> See the code</a>
    </div>
    
</template>

<style scoped>
.imgs{ @apply w-[200px] md:max-w-[250px] }
</style>
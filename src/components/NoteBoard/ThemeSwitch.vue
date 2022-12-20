<script setup>
import { ref } from "vue"

const emit = defineEmits(['refreshEditor'])

let currentTheme = ref(document.documentElement.getAttribute("class") ?? 'system')

const isChanging = ref(false)

const setTheme = (mode) => {
    //stop page css transition on theme change
    const setTransition = (s) => {
        let style = document.createElement('style')
        style.innerText = s
        document.head.appendChild(style)
    }
    setTransition(`*{transition: none}`)

    isChanging.value = true

    const doc = document.documentElement
    const setDarkBar = () => document.querySelector('meta[name=theme-color]').setAttribute("content", "#262626")
    const setLightBar = () => document.querySelector('meta[name=theme-color]').setAttribute("content", "#ffffff")
    
    if (mode == 'dark' || mode == 'light') {
        doc.className = ""
        doc.classList.add(mode)
        
        if (mode == 'dark') {
            setDarkBar()
            currentTheme.value = 'dark'
        }
        else if (mode == 'light') {
            setLightBar()
            currentTheme.value = 'light'
        }
        
        localStorage.theme = mode
    }
    
    if (mode == 'system') {
        localStorage.removeItem('theme')
        if (window.matchMedia('(prefers-color-scheme: dark)').matches === true) {
            doc.className = ""
            doc.classList.add('dark')
            setDarkBar()
        } else {
            doc.className = ""
            doc.classList.add('light')
            setLightBar()
        }

        currentTheme.value = 'system'
    }

    //send event to refresh editor input
    emit('refreshEditor')

    setTimeout(() => {
        setTransition(`*{transition: all 0.25s}`)
        isChanging.value = false
    }, 700)
}
</script>

<template>
    <i
        class="la la-sun themeIcos"
        v-if="currentTheme == 'dark'"
        @click="!isChanging ? setTheme('light') : ''"
        data-aos="fade-down" data-aos-offset="0"
    ></i>

    <i
        class="la la-laptop themeIcos"
        v-else-if="currentTheme == 'light'"
        @click="!isChanging ? setTheme('system') : ''"
        data-aos="fade-down" data-aos-offset="0"
    ></i>

    <i
        class="la la-cloud-moon themeIcos"
        v-else
        @click="!isChanging ? setTheme('dark') : ''"
        data-aos="fade-down" data-aos-offset="0"
    ></i>
</template>

<style>
.themeIcos{ @apply text-3xl ml-2 cursor-pointer }
</style>
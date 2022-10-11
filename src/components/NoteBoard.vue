<script setup>
import NoteCards from '../components/NoteCards.vue'
import DeletePrompt from '../components/NoteBoard/DeletePrompt.vue'
import SignoutPrompt from '../components/NoteBoard/SignoutPrompt.vue'
import ThemeSwitch from '../components/NoteBoard/ThemeSwitch.vue'
import TinyMCEEditor from '../components/NoteBoard/TinyMCEEditor.vue'

import { nextTick, onMounted, ref } from 'vue'
import { useStore } from '../stores/global'
import { useNoteStore } from '../stores/noteboard'
import moment from 'moment'
import initFirebase  from '../firebase'
import { getAuth, signOut } from 'firebase/auth'
import { getFirestore, collection, onSnapshot, addDoc, getDocs, doc, deleteDoc, query, where, orderBy, serverTimestamp, updateDoc, startAfter, limit } from 'firebase/firestore'

//initialize pinia stores
const store = useStore()
const noteStore = useNoteStore()


//initialize firebase app
initFirebase


//init firebase services
const auth = getAuth()
const db = getFirestore()


//get notes colection from firestore
const allNotes = collection(db, 'notes')
let currentNotes = null


//to store notes from firestore - reactive
const notes = ref(null)

const noteEmpty = ref(false) 


//unified state to indicate if action is to add or edit note
const workData = ref({
    mode: null,
    noteId: null,
    isSaving: false,
    error: null
})



//conditional add or update note
const noteAction = (mode, noteId) => {
    if (mode == 'add') {
        workData.value = {
            mode: 'add',
            noteId: null
        }
        noteStore.noteEditor.title = ''
        noteStore.noteEditor.data = '<p style="color:#555;">Write...</p>'
    }

    if (mode == 'edit') {
        workData.value = {
            mode: 'edit',
            noteId: noteId
        }

        let getNote = notes.value.find(e => e.id == noteId)
        noteStore.noteEditor.title = getNote.title
        noteStore.noteEditor.data = getNote.data 
    }
}



//add or update a note
const saveNote = async () => {

    if (noteStore.noteEditor.title.length && noteStore.noteEditor.data.length) {
        
        workData.value.isSaving = true

        if (workData.value.mode == 'add') {
            workData.value = { mode: null, noteId: null }

            await addDoc(allNotes, {
                userId: store.userId,
                ...noteStore.noteEditor,
                date: moment().format('Do MMM, YYYY'),
                createdAt: serverTimestamp()
            })
            .then(() => {
                noteStore.noteEditor = { title: '', data: '' }
                workData.value.isSaving = false

                //scroll note container to top
                nextTick(() => document.querySelector('.noteInside').scrollTop = 0 )
            })
        }


        if (workData.value.mode == 'edit') {
            let note = doc(db, 'notes', workData.value.noteId)
            await updateDoc(note, {
                ...noteStore.noteEditor,
                createdAt: serverTimestamp(),
                date: moment().format('Do MMM, YYYY')
            })
            .then(() => {
                workData.value.isSaving = false
                //scroll note container to top
                nextTick(() => document.querySelector('.noteInside').scrollTop = 0 )
            })
        }

    } else {
        workData.value.error = "Note title or content cant be empty."
        setTimeout(()=> workData.value.error = null, 6000)
    }
}



//delete a note
const deleteNote = (noteId) => {
    noteStore.deleteNotePrompt = false //hide delete note prompt

    let note = doc(db, 'notes', noteId)
    deleteDoc(note)
    .then(() => {
        if (workData.value.noteId == noteId) {
            workData.value = { mode: null, noteId: null }
            noteStore.noteEditor = { title: '', data: '' }
        }
    })
}



//firebase sign user out
const signout = () => {
    noteStore.signoutPrompt = false
  signOut(auth)
}



//get more notes from pagination
const loadMore = async () => {
    let lastFetchedNote = currentNotes[currentNotes.length - 1]

    if (lastFetchedNote) {
        await getDocs(query(allNotes,
            where('userId', '==', store.userId),
            orderBy('createdAt', 'desc'),
            startAfter(lastFetchedNote),
            limit(20))
        )
        .then((snap) => {
            currentNotes = snap.docs
            notes.value = notes.value.concat(snap.docs.map((doc) => ({id: doc.id, ...doc.data() })))
        })
    }
}


//when entire NoteBoard component mounts
onMounted(() => {
    //watch for change in firebase notes collection and repopulate data
    const qry = query(allNotes, where('userId', '==', store.userId), orderBy('createdAt', 'desc'), limit(20))
    onSnapshot(qry,
        (snapshot) => {
            currentNotes = snapshot.docs
            notes.value = snapshot.docs.length ? currentNotes.map((doc) => ({id: doc.id, ...doc.data() })) : (window.navigator.onLine ? false : null)
        }
    )
})

//emitted from themeSwitch: refresh tinyMCE component for change in theme
const editorDisplayState = ref(true)
const refreshEditor = () => {
    editorDisplayState.value = false
    setTimeout(() => editorDisplayState.value = true, 200)
}

const expandEditor = ref(false) //toggle fullscreen on editor
</script>


<template>
    <div class="h-screen w-screen bg-[url(../img/doodle.png)] dark:bg-[url(../img/doodle_dark.png)]">
        <div class="table-cell lg:align-middle h-screen w-screen bg-gradient-to-b from-neutral-300 dark:from-neutral-900 to-transparent">


            <div class="flex items-stretch bg-white dark:bg-neutral-800 shadow-lg dark:shadow-black/50 xsm:rounded-2xl xsm:my-3 w-full xsm:w-[95%] sm:w-[95%] max-w-7xl mx-auto h-full xsm:h-auto max-h-screen xsm:max-h-[95vh] md:max-h-[90vh] xsm:min-h-[80vh] my-auto xsm:border border-b-neutral-200 dark:border-neutral-900/70 overflow-hidden relative">


            <div class="grow flex flex-col w-8/12 bg-neutral-50/70 dark:bg-neutral-900/50" :class="{'hidden':expandEditor}">
                <div class="relative flex justify-between items-center bg-white dark:bg-neutral-800 px-3 xsm:px-5 py-1.5 border border-transparent border-b-neutral-200 dark:border-b-neutral-900 lg:dark:border-r-neutral-900/80">
                    <img src="../assets/img/logo.svg" class="w-32 dark:hidden">
                    <img src="../assets/img/logo_dark.svg" class="w-32 hidden dark:block">

                    <div class="flex items-center justify-center text-neutral-600 dark:text-neutral-300/90">
                        <i class="la la-power-off text-3xl mr-2 cursor-pointer active:scale-125" @click="noteStore.signoutPrompt = true"></i>
                        <ThemeSwitch @refreshEditor="refreshEditor" />
                    </div>
                </div>


                <div class="noteInside grow px-3 overflow-y-auto">
                    <div class="flex items-center justify-between pt-3 px-3 xsm:px-5">
                        <div class="text-neutral-700 dark:text-neutral-300/90 text-base italic">Your notes...</div>
                        <button class="btns" v-wave @click="noteAction('add', null)"><i class="la la-plus"></i> New</button>
                    </div>

                    <div class="noteContainer" v-if="notes && notes.length">
                        <transition-group enter-active-class="ans an-zoomIn an-faster" leave-active-class="ans an-rotateOut an-faster">
                            <NoteCards
                                v-for="(note, i) in notes"
                                :key="note.id"
                                :data="{...note, index: i}"
                                @click="noteAction('edit', note.id)"
                                @showDeletePrompt="noteStore.deleteNotePrompt = note.id"
                                :class="{'activeNote': workData.noteId == note.id}"
                            />
                        </transition-group>
                    </div>

                    <!--if no notes-->
                    <div class="waiters" data-aos="zoom-in" data-aos-offset="0" v-if="notes == false && !store.internetOff">
                        <i class="flex-none la la-edit text-6xl"></i>
                        <h1 class="text-center text-3xl font-bold">Your Note Board is empty. Add a note to get started.</h1>
                    </div>

                    <!--loader-->
                    <div class="waiters" data-aos="zoom-in-up" data-aos-offset="0" v-if="notes == null">
                        <i class="flex-none la la-circle-notch la-spin text-6xl"></i>
                    </div>
                    
                    <!--load more notes btn-->
                    <div class="text-center -mt-3 mb-4" v-if="notes && notes.length > 19">
                        <button class="rounded-md border-2 text-neutral-400 text-sm font-semibold px-3 py-1" @click="loadMore" v-wave>Load More</button>
                    </div>
                </div>
            </div>






            <div
                class="flex flex-col absolute top-0 h-full lg:h-auto lg:relative max-w-[400px] min-w-full lg:min-w-[400px] xl:min-w-[500px] xl:max-w-[500px] bg-white dark:bg-neutral-800 lg:border-l border-l-neutral-200 dark:border-none duration-500 overflow-hidden"
                :class="{'translate-x-0': workData.mode, 'translate-x-full lg:translate-x-0': !workData.mode, 'xl:min-w-full lg:min-w-full':expandEditor}"
            >
                <div
                    class="bg-white w-full text-[0.8rem] text-red-500 py-1 px-2 self-start border-b border-b-neutral-200"
                    v-if="workData.error"
                    data-aos="flip-down"
                >
                    {{workData.error}}
                </div>
                <div class="flex items-center bg-white dark:bg-neutral-800 border border-transparent border-b-neutral-200 dark:border-b-neutral-900/60">
                    <i class="la la-arrow-left lg:hidden inputActions" @click="workData.mode = null"></i>
                    
                    <input
                        class="grow py-3 px-2 pr-1 w-full bg-transparent text-sm font-bold text-neutral-600 dark:text-neutral-300/95 break-words"
                        v-model="noteStore.noteEditor.title"
                        placeholder="Your title goes here..."
                        maxlength="60"
                    >
                    <i class="la la-expand hidden lg:inline-block inputActions mr-1" @click="expandEditor = !expandEditor"></i>
                    <button class="btns mr-2"
                        v-wave
                        v-if="workData.mode"
                        @click="saveNote"
                        :disabled="workData.isSaving"
                    >
                        <span v-if="!workData.isSaving">{{workData.mode == 'add' ? 'Add' : 'Save'}}</span>
                        <i class="la la-spinner la-pulse" v-else></i>
                    </button>
                </div>

                <TinyMCEEditor v-if="editorDisplayState" />

                <div class="absolute top-0 w-full h-full z-10 bg-white/70 dark:bg-neutral-800/60" v-if="!workData.mode"></div>
            </div>

            </div>


        </div>
    </div>


    <!--prompts-->
    <DeletePrompt @deleteNote="deleteNote" />
    <SignoutPrompt @signout="signout" />

</template>

<style>
.btns { @apply rounded-md bg-neutral-700 text-white dark:text-neutral-300 text-sm font-semibold px-2 py-1 shadow-md }

.waiters { @apply flex flex-col items-center justify-center max-w-md mx-auto px-3 h-[75%] text-neutral-300 dark:text-neutral-500 }

.inputActions { @apply text-2xl text-neutral-500 dark:text-neutral-300/90 ml-1 cursor-pointer }
</style>
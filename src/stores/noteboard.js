import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useNoteStore = defineStore('noteboard', () => {
    //prompt dialogues
    const deleteNotePrompt = ref(false)
    const signoutPrompt = ref(false)

    //note editor content
    const noteEditor = ref({
      title: '',
      data: '<p style="color:#555;">Write...</p>'
    })

  return { deleteNotePrompt, signoutPrompt, noteEditor }
})

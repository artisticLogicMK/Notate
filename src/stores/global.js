import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useStore = defineStore('global', () => {
  //states
  const userId = ref(null)
  const authModal = ref(false)
  const internetOff = ref(false)

  //check internet connection status
  setInterval(() => window.navigator.onLine ? internetOff.value = false : internetOff.value = true, 1500)

  //mutations or actions
  function displayAuthModal(bool) {
    authModal.value = bool
  }

  function setUser(id) {
    userId.value = id
  }

  return { authModal, displayAuthModal, setUser, userId, internetOff }
})

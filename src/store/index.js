import { createStore } from 'vuex'
import contacts from '@/data/contacts.json'

export default createStore({
  state: {
    contactsList: [],
    isGroupsActive: false,
    isNewContactActive: false,
    searchData: null,
  },
  getters: {
    contactsList: ({ contactsList }) => contactsList,
    ungroupedContacts(state) {
      return state.contactsList.map((contact) => contact.contactsList).flat(1)
    },
    getFilteredList: (state, getters) => {
      if (!state.searchData) return getters.ungroupedContacts

      return getters.ungroupedContacts.filter((contact) => {
        return (
          contact.firstName == state.searchData ||
          contact.lastName == state.searchData ||
          contact.email == state.searchData ||
          contact.phoneNumber == state.searchData
        )
      })
    },
    isGroupsActive: ({ isGroupsActive }) => isGroupsActive,
    isNewContactActive: ({ isNewContactActive }) => isNewContactActive,
  },
  mutations: {
    loadData(state, contacts) {
      state.contactsList = contacts
    },
    setSearchData(state, searchText) {
      state.searchData = searchText
    },
    switchToGroupsList(state) {
      state.isGroupsActive = true
    },
    switchToMainList(state) {
      state.isGroupsActive = false
    },
    switchToNewContactPage(state) {
      state.isNewContactActive = true
    },
    cancelingAddNewContact(state) {
      state.isNewContactActive = false
    },
    saveNewContact(state, newContact) {
      const contactGroup = state.contactsList.find((contact) => contact.title == newContact.title)
      if (contactGroup) {
        const contact = {
          id: Date.now(),
          ...newContact.contactData,
        }
        contactGroup.contactsList.push(contact)
      } else {
        const newGroup = {
          title: newContact.title,
          groupId: Date.now(),
          contactsList: [newContact.contactData],
        }
        state.contactsList.push(newGroup)
      }
      state.isNewContactActive = false
    },
  },
  actions: {
    loadData({ commit }) {
      commit('loadData', contacts)
    },
    setSearchData({ commit }, searchText) {
      commit('setSearchData', searchText)
    },
    switchToGroupsList({ commit }) {
      commit('switchToGroupsList')
    },
    switchToMainList({ commit }) {
      commit('switchToMainList')
    },
    switchToNewContactPage({ commit }) {
      commit('switchToNewContactPage')
    },
    cancelingAddNewContact({ commit }) {
      commit('cancelingAddNewContact')
    },
    saveNewContact({ commit }, newContact) {
      commit('saveNewContact', newContact)
    },
  },
})

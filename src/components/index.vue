<template>
  <div class="contacts">
    <div class="contacts__wrapper">
      <div class="contacts__actions actions">
        <div :class="{ disabled: isGroupsActive }" class="actions__search">
          <label class="actions__label" for="search-inp">
            <span class="actions__search-icon material-symbols-outlined"> search </span>
          </label>
          <input
            id="search-inp"
            v-model="searchText"
            type="search"
            placeholder="Пошук"
            @input="setSearchData(searchText)"
          />
        </div>
        <div class="actions__switch switch-acts">
          <div class="switch-acts__item" :class="{ active: !isGroupsActive }">
            <button class="switch-acts__button" @click="switchToMainList">Контакти</button>
          </div>
          <div class="switch-acts__item" :class="{ active: isGroupsActive }">
            <button class="switch-acts__button" @click="switchToGroupsList">Групи</button>
          </div>
        </div>
        <div class="actions__add-contact">
          <button class="actions__add-button" @click="switchToNewContactPage">
            <span class="actions__add-icon material-symbols-outlined"> add_circle </span>
            Новий контакт
          </button>
        </div>
      </div>
      <div class="contacts__container" :class="{ disabled: isNewContactActive }">
        <div v-if="isListEmpty">Список контактів порожні</div>
        <contacts-list v-else :contacts-data="currentContactsList" />
      </div>
      <new-contact-component class="contacts__add-contact" :class="{ active: isNewContactActive }" />
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

import ContactsList from '@/components/ContactsList'
import NewContactComponent from '@/components/NewContactComponent'

export default {
  name: 'ContactsComponent',
  components: {
    ContactsList,
    NewContactComponent,
  },
  data() {
    return {
      searchText: null,
    }
  },

  computed: {
    ...mapGetters(['contactsList', 'isGroupsActive', 'isNewContactActive', 'getFilteredList']),
    currentContactsList() {
      if (!this.isGroupsActive) return this.getFilteredList
      else return this.contactsList
    },
    isListEmpty() {
      return this.currentContactsList.length === 0
    },
  },
  created() {
    this.loadData()
  },
  methods: {
    ...mapActions(['loadData', 'setSearchData', 'switchToGroupsList', 'switchToMainList', 'switchToNewContactPage']),
    getSmt() {
      console.log(this.searchText)
    },
  },
}
</script>

<style lang="scss" scoped>
.contacts {
  width: 390px;
  height: 690px;
  margin: 0 auto;
  overflow-y: auto;
  overflow-x: hidden;
  border: 10px solid #000;
  border-radius: 15px;
  padding: 10px;
  // .contacts__wrapper
  &__wrapper {
    position: relative;
  }
  // .contacts__actions
  &__actions {
    margin-bottom: 20px;
  }
  &__container {
    &.disabled {
      display: none;
      visibility: hidden;
    }
  }
  // .contacts__add-contact
  &__add-contact {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: none;
    visibility: hidden;
    &.active {
      display: block;
      visibility: visible;
      background-color: #fff;
      z-index: 2;
    }
  }
}
.actions {
  display: flex;
  flex-direction: column;
  row-gap: 20px;
  // .actions__search
  &__search {
    display: flex;
    align-items: center;
    column-gap: 10px;
    input {
      width: 100%;
      background-color: inherit;
      border-bottom: 2px solid #000;
      padding: 5px;
    }
    &.disabled {
      display: none;
      visibility: hidden;
    }
  }
  &__label {
    display: inline-flex;
  }
  // .actions__search-icon
  &__search-icon {
    font-size: 30px;
    cursor: pointer;
  }
  // // .actions__switch
  // &__switch {
  // }
  // // .actions__add-contact
  // &__add-contact {
  // }
  // .actions__add-button
  &__add-button {
    display: flex;
    align-items: center;
    column-gap: 10px;
    color: green;
  }
  // .actions__add-icon
  &__add-icon {
    font-size: 30px;
  }
}
.switch-acts {
  display: flex;
  align-items: center;
  border: 2px solid darkslategray;
  border-radius: 3px;

  // .switch-acts__item
  &__item {
    flex: 0 1 50%;
    display: inline-flex;
    justify-content: center;
    background-color: gray;
    color: darkslategray;
    &.active {
      background-color: aquamarine;
      color: green;
    }
  }
  // .switch-acts__button
  &__button {
    height: 30px;
    width: 100%;
  }
}
</style>

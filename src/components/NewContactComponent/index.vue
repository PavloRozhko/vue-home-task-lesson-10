<template>
  <div class="new-contact">
    <div class="new-contact__container">
      <div class="new-contact__actions">
        <button class="new-contact__button save-button" @click="onCancel">Скасувати</button>
        <button class="new-contact__button cancel-button" @click="onSave">Зберегти</button>
      </div>
      <div class="new-contact__title">Новий контакт</div>
      <div class="new-contact__inputs inputs">
        <div class="inputs__item">
          <label for="first-name"> Ім'я </label>
          <input id="first-name" v-model="firstName" type="text" />
        </div>
        <div class="inputs__item">
          <label for="last-name"> Прізвище </label>
          <input id="last-name" v-model="lastName" type="text" />
        </div>
        <div class="inputs__item">
          <label for="phone-number"> Номер телефону </label>
          <input id="phone-number" v-model="phoneNumber" type="tel" @keydown="onKeydown" />
        </div>
        <div class="inputs__item">
          <label for="email"> Електронна пошта </label>
          <input id="email" v-model="email" type="email" />
        </div>
        <div class="inputs__item">
          <label for="group"> Група контактів </label>
          <input id="group" v-model="contactGroup" type="text" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'NewContactComponent',

  data() {
    return {
      firstName: null,
      lastName: null,
      phoneNumber: null,
      email: null,
      contactGroup: null,
    }
  },

  methods: {
    ...mapActions(['cancelingAddNewContact', 'saveNewContact']),
    onCancel() {
      this.cancelingAddNewContact()
      this.clearData()
    },
    onSave() {
      if (!this.contactGroup) {
        this.contactGroup = 'Контакти без групи'
      }

      const newContact = {
        title: this.contactGroup,
        contactData: {
          firstName: this.firstName,
          lastName: this.lastName,
          phoneNumber: this.phoneNumber,
          email: this.email,
        },
      }
      this.saveNewContact(newContact)
      this.clearData()
    },
    clearData() {
      this.firstName = null
      this.lastName = null
      this.phoneNumber = null
      this.email = null
      this.contactGroup = null
    },
    onKeydown(event) {
      const key = event.key
      const isDigit = key >= '0' && key <= '9'
      const isBackspace = key === 'Backspace'
      const isPlus = key === '+'

      if (!isDigit && !isBackspace && !isPlus) event.preventDefault()
    },
  },
}
</script>

<style lang="scss" scoped>
.new-contact {
  // .new-contact__container
  &__container {
    display: flex;
    flex-direction: column;
    row-gap: 20px;
  }
  // .new-contact__actions
  &__actions {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  // .new-contact__button
  &__button {
    color: darkblue;
    font-weight: 700;
    // &.save-button {
    // }
    // &.cancel-button {
    // }
  }
  // .new-contact__title
  &__title {
    text-align: center;
    font-size: 20px;
    font-weight: 700;
  }
  // .new-contact__inputs
  // &__inputs {
  // }
}

.inputs {
  display: flex;
  flex-direction: column;
  row-gap: 10px;
  // .inputs__item
  &__item {
    display: flex;
    align-items: stretch;
    column-gap: 10px;
    label {
      align-self: flex-end;
      flex-basis: 35%;
    }
    input {
      flex-basis: 65%;
      width: 100%;
      border-bottom: 1px solid #000;
      padding: 5px;
      background-color: inherit;
    }
  }
}
</style>

<template>
  <div class="contacts-list">
    <div v-if="!isGroupsActive" class="contacts-list__wrapper">
      <div v-for="contact in contactsData" :key="contact.id" class="contacts-list__item main-item">
        <div class="main-item__label">{{ contact.lastName[0] }}{{ contact.firstName[0] }}</div>
        <div class="main-item__info">
          <span>{{ contact.lastName }} {{ contact.firstName }} </span>
          <span>{{ contact.phoneNumber }}</span>
          <span>{{ contact.email }}</span>
        </div>
      </div>
    </div>
    <div v-else class="contacts-list__wrapper">
      <div v-for="group in contactsData" :key="group.id" class="contacts-list__groups groups-list">
        <h5 class="groups-list__title">{{ group.title }}</h5>
        <div v-for="contact in group.contactsList" :key="contact.id" class="groups-list__item contact">
          <div class="contact__info">
            <span class="contact__name">{{ contact.lastName }} {{ contact.firstName }}</span>
            <span class="contact__number">{{ contact.phoneNumber }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'ContactsList',

  props: {
    contactsData: {
      type: Object,
      default: () => ({}),
    },
  },
  computed: {
    ...mapGetters(['isGroupsActive']),
  },
}
</script>

<style lang="scss" scoped>
.contacts-list {
  // .contacts-list__wrapper
  &__wrapper {
    display: flex;
    flex-direction: column;
    row-gap: 10px;
  }
  // // .contacts-list__item
  // &__item {
  // }
  // // .contacts-list__groups
  // &__groups {
  // }
}
.main-item {
  display: flex;
  align-items: center;
  column-gap: 15px;
  // .main-item__label
  &__label {
    width: 50px;
    height: 50px;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    position: relative;
    font-size: 24px;
    font-weight: 700;
    &::after {
      content: '';
      position: absolute;
      display: inline-flex;
      justify-content: center;
      align-items: center;
      top: 0;
      left: 0;
      width: 100%; /* 50/60 */
      height: 100%; /* 50/60 */
      border-radius: 50%;
      background-color: lightgreen;
      z-index: -1;
    }
  }
  // .main-item__info
  &__info {
    display: flex;
    flex-direction: column;
    row-gap: 2px;
  }
}
.groups-list {
  // .groups-list__title
  &__title {
    font-size: 20px;
    font-weight: 700;
    margin-bottom: 10px;
  }
  // .groups-list__item
  &__item {
    &:not(:last-child) {
      margin-bottom: 5px;
    }
  }
}
.contact {
  // .contact__info
  &__info {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 10px;
  }
  &__name {
    font-weight: 700;
    font-size: 18px;
  }
  &__number {
    color: gray;
  }
}
</style>

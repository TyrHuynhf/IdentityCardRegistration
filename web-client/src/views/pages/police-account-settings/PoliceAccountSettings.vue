<template>
  <v-card id="account-setting-card">
    <!-- tabs -->
    <v-tabs
      v-model="tab"
      show-arrows
    >
      <v-tab
        v-for="tab in tabs"
        :key="tab.icon"
      >
        <v-icon
          size="20"
          class="me-3"
        >
          {{ tab.icon }}
        </v-icon>
        <span>{{ tab.title }}</span>
      </v-tab>
    </v-tabs>

    <!-- tabs item -->
    <v-tabs-items v-model="tab">
      <v-tab-item>
        <account-settings-account :key='componentKey' @refresh='forceRerender' :account='userInfoData' :hello='test'></account-settings-account>
      </v-tab-item>

      <v-tab-item>
        <account-settings-security :key='componentKey' @refresh='forceRerender' :accountPassword="userInfoData.password"></account-settings-security>
      </v-tab-item>

<!--      <v-tab-item>-->
<!--        <account-settings-info  :informationData='accountSettingData.information'></account-settings-info>-->
<!--      </v-tab-item>-->
    </v-tabs-items>
  </v-card>
</template>

<script>
import { mdiAccountOutline, mdiLockOpenOutline, mdiInformationOutline } from '@mdi/js'
import { ref } from '@vue/composition-api'
import axios from 'axios'
// demos
import AccountSettingsAccount from './AccountSettingsAccount.vue'
import AccountSettingsSecurity from './AccountSettingsSecurity.vue'
import AccountSettingsInfo from './AccountSettingsInfo.vue'


const { policeConfig } = require('@/main')

export default {
  components: {
    AccountSettingsAccount,
    AccountSettingsSecurity,
    AccountSettingsInfo,
  },
  setup() {
    const tab = ref('')

    // tabs
    const tabs = [
      { title: 'Tài khoản', icon: mdiAccountOutline },
      { title: 'Bảo mật', icon: mdiLockOpenOutline },
      // { title: 'Info', icon: mdiInformationOutline },
    ]
    // account settings data a
    const accountSettingData = {
      account: {
        avatarImg: require('@/assets/images/avatars/1.png'),
        username: 'johnDoe',
        name: 'john Doe',
        email: 'johnDoe@example.com',
        role: 'Admin',
        status: 'Active',
        company: 'Google.inc',
      },
      information: {
        bio: 'The name’s John Deo. I am a tireless seeker of knowledge, occasional purveyor of wisdom and also, coincidentally, a graphic designer. Algolia helps businesses across industries quickly create relevant 😎, scaLabel 😀, and lightning 😍 fast search and discovery experiences.',
        birthday: 'February 22, 1995',
        phone: '954-006-0844',
        website: 'https://themeselection.com/',
        country: 'USA',
        languages: ['English', 'Spanish'],
        gender: 'male',
      },
    }

    return {
      tab,
      tabs,
      accountSettingData,

      icons: {
        mdiAccountOutline,
        mdiLockOpenOutline,
        mdiInformationOutline,
      },
    }
  },
  data() {
    return {
      userInfoData: {
      },
      test: {},
      componentKey: 0
    }
  },
  methods:{
    forceRerender(){
      this.componentKey ++
    }
  },
   created() {
     axios.get('http://localhost:3000/users/me', policeConfig)
      .then(res => {
        this.userInfoData = res.data
        this.test = res.data
      })
      .catch(err => {
        console.log(err)
      })
  },
}
</script>

<template>
  <div class="auth-wrapper auth-v1">
    <div class="auth-inner">
      <v-card class="auth-card">
        <!-- logo -->
        <v-card-title class="d-flex align-center justify-center py-7">
          <v-img
            :src="require('@/assets/images/logos/logo.svg')"
            max-height="30px"
            max-width="30px"
            alt="logo"
            contain
            class="me-3 "
          ></v-img>

          <h2 class="text-2xl font-weight-semibold">
            Identity
          </h2>
        </v-card-title>

        <!-- title -->
        <v-card-text>
          <p class="text-2xl font-weight-semibold text--primary mb-2">
            Tao tai khoan tai day 🚀
          </p>
        </v-card-text>

        <!-- login form -->
        <v-card-text>
          <v-form ref='form'>
            <v-text-field
              v-model="registerInfo.fullName"
              outlined
              label="Username"
              :rules="nameRules"
              placeholder="Huynh Le Ty"
              hide-details="auto"
              class="mb-3"
            ></v-text-field>
            <v-spacer></v-spacer>
            <v-text-field
              v-model="registerInfo.phoneNumber"
              outlined
              :rules='phoneRules'
              type='number'
              label="PhoneNumber"
              placeholder="098xxxxxxxx"
              hide-details="auto"
              class="mb-3"
            ></v-text-field>

            <v-text-field
              v-model="registerInfo.password"
              outlined
              :rules='passwordRules'
              :type="isPasswordVisible ? 'text' : 'password'"
              label="Password"
              placeholder="············"
              :append-icon="isPasswordVisible ? icons.mdiEyeOffOutline : icons.mdiEyeOutline"
              hide-details="auto"
              @click:append="isPasswordVisible = !isPasswordVisible"
            ></v-text-field>
            <v-menu
              ref="menu1"
              v-model="menu1"
              :close-on-content-click="false"
              transition="scale-transition"
              offset-y
              max-width="290px"
              min-width="auto"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-model="registerInfo.dateOfBirth"
                  label="Date"
                  hint="DD/MM/YYYY format"
                  persistent-hint
                  prepend-icon="mdi-calendar"
                  v-bind="attrs"
                  @blur="date = parseDate(registerInfo.dateOfBirth)"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker
                v-model="date"
                no-title
                @input="menu1 = false"
              ></v-date-picker>
            </v-menu>
            <v-btn
              block
              color="primary"
              class="mt-6"
              @click='submit'
            >
              Sign Up
            </v-btn>
          </v-form>
        </v-card-text>

        <!-- create new account  -->
        <v-card-text class="d-flex align-center justify-center flex-wrap mt-2">
          <span class="me-2">
            Already have an account?
          </span>
          <router-link :to="{ name:'pages-login' }">
            Sign in instead
          </router-link>
        </v-card-text>
      </v-card>
    </div>

    <!-- background triangle shape  -->
    <img
      class="auth-mask-bg"
      height="190"
      :src="require(`@/assets/images/misc/mask-${$vuetify.theme.dark ? 'dark':'light'}.png`)"
    >

    <!-- tree -->
    <v-img
      class="auth-tree"
      width="247"
      height="185"
      src="@/assets/images/misc/tree.png"
    ></v-img>

    <!-- tree  -->
    <v-img
      class="auth-tree-3"
      width="377"
      height="289"
      src="@/assets/images/misc/tree-3.png"
    ></v-img>
  </div>
</template>

<script>
// eslint-disable-next-line object-curly-newline
import { mdiEyeOutline, mdiEyeOffOutline } from '@mdi/js'
import { ref } from '@vue/composition-api'
import axios from 'axios'
export default {
  setup() {
    const isPasswordVisible = ref(false)
    const username = ref('')
    const email = ref('')
    const password = ref('')

    return {
      isPasswordVisible,
      username,
      email,
      password,
      icons: {
        mdiEyeOutline,
        mdiEyeOffOutline,
      },
    }
  },
  data: vm => ({
    registerInfo: {
      fullName: '',
      password: '',
      dateOfBirth: vm.formatDate((new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10)),
      phoneNumber: '',
    },
    date: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
    menu1: false,
    passwordRules: [
      v => !!v || 'Password is required',
      v => (v && v.length <= 10) || 'Password must be less than 10 characters'
    ],
    nameRules: [
      v => !!v || 'Name is required',
      v => (v && v.length <= 56) || 'Name must be less than 56 characters'
    ],
    phoneRules: [
      v => !!v || 'Phone is required & must be number',
      v => (v && v.length <= 11) || 'Phone must be less than 11 number',
    ],
  }),
  methods: {
    formatDate(date) {
      if (!date) return null
      const [year, month, day] = date.split('-')
      return `${day}/${month}/${year}`
    },
    parseDate(date) {
      if (!date) return null
      const [month, day, year] = date.split('/')
      return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
    },
    submit() {
      if (this.$refs.form.validate()) {
        axios.post('http://localhost:3000/auth/registry/citizen', this.registerInfo)
          .then(res => {
            alert(res.data.message)
            this.$router.push('/login')
          })
          .catch(err => {
            console.log(err)
          })
      }
    },
  },
  computed: {

    computedDateFormatted() {
      return this.formatDate(this.date)
    },
  },
  watch: {
    date() {
      this.registerInfo.dateOfBirth = this.formatDate(this.date)
    },
  },
}
</script>

<style lang="scss">
@import '~@/plugins/vuetify/default-preset/preset/pages/auth.scss';
</style>

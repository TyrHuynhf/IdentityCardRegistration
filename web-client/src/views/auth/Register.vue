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
            Identity System
          </h2>
        </v-card-title>

        <!-- title -->
        <v-card-text>
          <p class="text-2xl font-weight-semibold text--primary mb-2">
            Tạo tài khoản tại đây 🚀
          </p>
        </v-card-text>

        <!-- login form -->
        <v-card-text>
          <v-form ref='form'>
            <v-text-field
              v-model="registerInfo.fullName"
              outlined
              label="Họ tên"
              :rules="nameRules"
              placeholder="Huỳnh Lê Tỷ"
              hide-details="auto"
              class="mb-3"
            ></v-text-field>
            <v-spacer></v-spacer>
            <v-text-field
              v-model="registerInfo.phoneNumber"
              outlined
              :rules='phoneRules'
              type='number'
              label="Số điện thoại"
              placeholder="098xxxxxxxx"
              hide-details="auto"
              class="mb-3"
            ></v-text-field>

            <v-text-field
              v-model="registerInfo.password"
              outlined
              :rules='passwordRules'
              :type="isPasswordVisible ? 'text' : 'password'"
              label="Mật khẩu"
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
                  label="Ngày sinh"
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
              Đăng ký
            </v-btn>
          </v-form>
        </v-card-text>

        <!-- create new account  -->
        <v-card-text class="d-flex align-center justify-center flex-wrap mt-2">
          <span class="me-2">
            Đã có tài khoản?
          </span>
          <router-link :to="{ name:'login' }">
            Đăng nhập tại đây
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
import Swal from 'sweetalert2'
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
      v => !!v || 'Bắt buộc',
      v => (v && v.length <= 10) || 'Mật khẩu không dài quá 10 ký tự'
    ],
    nameRules: [
      v => !!v || 'Bắt buộc',
      v => (v && v.length <= 56) || 'Tên quá dài'
    ],
    phoneRules: [
      v => !!v || 'Bắt buộc',
      v => (v && v.length <= 11) || 'Số điện thoại quá dài',

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
      const [ day,month, year] = date.split('/')
      return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
    },
    submit() {
      let loader = this.$loading.show({
        // Optional parameters
        container:  null ,
        color: 'blue',
        backgroundColor: 'white',
        loader: 'bars',
        canCancel: false,
        onCancel: this.onCancel,
      });
      if (this.$refs.form.validate()) {
        axios.post('http://localhost:3000/auth/registry/citizen', this.registerInfo)
          .then(res => {
            loader.hide()
            Swal.fire({
              icon: 'success',
              title: 'Đăng ký thành công'
            })
            loader.hide()
            this.$router.push('/login')
          })
          .catch(err => {
            loader.hide()
            Swal.fire({
              icon: 'error',
              title: 'Số điện thoại đã được sử dụng'
            })
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

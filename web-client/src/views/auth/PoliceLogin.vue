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
            Hệ thống đăng ký căn cước công dân 👋🏻
          </p>
          <p class="mb-2">
            Đăng nhập để tiếp tục
          </p>
        </v-card-text>

        <!-- login form -->
        <v-card-text>
          <v-form ref='form'>
            <v-text-field
              v-model="loginInfo.phoneNumber"
              outlined
              :rules='phoneRules'
              type='number'
              label="Số điện thoại"
              placeholder="098xxxxxxxx"
              hide-details="auto"
              class="mb-3"
            ></v-text-field>

            <v-text-field
              v-model="loginInfo.password"
              outlined
              :rules='passwordRules'
              :type="isPasswordVisible ? 'text' : 'password'"
              label="Mật khẩu"
              placeholder="············"
              :append-icon="isPasswordVisible ? icons.mdiEyeOffOutline : icons.mdiEyeOutline"
              hide-details="auto"
              @click:append="isPasswordVisible = !isPasswordVisible"
              v-on:keyup.enter='login'
            ></v-text-field>

            <!--            <div class="d-flex align-center justify-space-between flex-wrap">-->
            <!--              <v-checkbox-->
            <!--                label="Remember Me"-->
            <!--                hide-details-->
            <!--                class="me-3 mt-1"-->
            <!--              >-->
            <!--              </v-checkbox>-->

            <!--              &lt;!&ndash; forgot link &ndash;&gt;-->
            <!--              <a-->
            <!--                href="javascript:void(0)"-->
            <!--                class="mt-1"-->
            <!--              >-->
            <!--                Forgot Password?-->
            <!--              </a>-->
            <!--            </div>-->

            <v-btn
              block
              color="primary"
              class="mt-6"
              @click.capture='login'
            >
              Đăng nhập
            </v-btn>
          </v-form>
        </v-card-text>

        <!-- create new account  -->
        <v-card-text class="d-flex align-center justify-center flex-wrap mt-2">
          <span class="me-2">
            Nếu chưa có tài khoản vui lòng liên hệ admin để tạo tài khoản
          </span>
        </v-card-text>
      </v-card>
    </div>

    <!-- background triangle shape  -->
    <img
      class="auth-mask-bg"
      height="173"
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
import { AUTH_POLICE_REQUEST } from '@/store/actions/authAction'
import { USER_REQUEST} from '@/store/actions/userAction'
import axios from 'axios'
import Swal from 'sweetalert2'
import { adminConfig } from '@/main'
export default {
  setup() {
    const isPasswordVisible = ref(false)
    const email = ref('')
    const password = ref('')

    return {
      isPasswordVisible,
      email,
      password,
      icons: {
        mdiEyeOutline,
        mdiEyeOffOutline,
      },
    }
  },
  data() {
    return {
      loginInfo: {
        password: '',
        phoneNumber: '',
      },
      passwordRules: [
        v => !!v || 'Password is required',
        v => (v && v.length <= 10) || 'Password must be less than 10 characters'
      ],
      phoneRules: [
        v => !!v || 'Phone is required & must be number',
        v => (v && v.length <= 11) || 'Phone must be less than 11 number',

      ],
    }
  },
  methods: {
      login() {
      if (this.$refs.form.validate()) {
        let loader = this.$loading.show({
          // Optional parameters
          container: null,
          color: 'blue',
          backgroundColor: 'white',
          loader: 'bars',
          canCancel: false,
          onCancel: this.onCancel,
        });
          this.$store.dispatch(AUTH_POLICE_REQUEST, this.loginInfo)
          .then(res => {
            loader.hide()
            //console.log(this.$store.getters.getToken)
            this.$router.push('/police')
            alert('Chào mừng bạn')
            location.reload()
          })
          .catch(err => {
            console.log(err)
            loader.hide()
            Swal.fire({
              title: 'Số điện thoại hoặc mật khẩu không đúng',
              icon: 'error',
            })
          })
        // await this.$store.dispatch(AUTH_REQUEST, this.loginInfo)
        //   .then(() => {
        //     loader.hide()
        //     alert('Chao mung ban')
        //     this.$router.push('/')
        //     this.$router.go()
        //
        //   })
        //   .catch(err => {
        //     loader.hide()
        //     Swal.fire({
        //       title: 'sai sdt hoac mat khau',
        //       icon: 'error',
        //     })
        //     console.log(err)
        //   })

      }
    },
  },
}
</script>

<style lang="scss">
@import '~@/plugins/vuetify/default-preset/preset/pages/auth.scss';
</style>

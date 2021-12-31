<template>
  <v-card
    flat
    class="mt-5"
  >
    <v-form ref='form'>
      <div class="px-3">
        <v-card-text class="pt-5">
          <v-row>
            <v-col
              cols="12"
              sm="8"
              md="6"
            >
              <!-- current password -->
<!--              <v-text-field-->
<!--                v-model="accountPassword"-->
<!--                :type="isCurrentPasswordVisible ? 'text' : 'password'"-->
<!--                :append-icon="isCurrentPasswordVisible ? icons.mdiEyeOffOutline:icons.mdiEyeOutline"-->
<!--                label="Current Password"-->
<!--                outlined-->
<!--                dense-->
<!--                @click:append="isCurrentPasswordVisible = !isCurrentPasswordVisible"-->
<!--              ></v-text-field>-->
              <!-- new password -->
              <v-text-field
                v-model="payload.newPassword"
                :type="isNewPasswordVisible ? 'text' : 'password'"
                :append-icon="isNewPasswordVisible ? icons.mdiEyeOffOutline:icons.mdiEyeOutline"
                label="Mật khẩu mới"
                outlined
                dense
                :rules='passwordRules'
                hint="Ít nhất 8 ký tự"
                persistent-hint
                @click:append="isNewPasswordVisible = !isNewPasswordVisible"
              ></v-text-field>

              <!-- confirm password -->
              <v-text-field
                v-model="confirmPassword"
                :type="isCPasswordVisible ? 'text' : 'password'"
                :append-icon="isCPasswordVisible ? icons.mdiEyeOffOutline:icons.mdiEyeOutline"
                label="Nhập lại mật khẩu"
                outlined
                dense
                class="mt-3"
                :rules='confirmPasswordRules'
                @click:append="isCPasswordVisible = !isCPasswordVisible"
              ></v-text-field>
            </v-col>

            <v-col
              cols="12"
              sm="4"
              md="6"
              class="d-none d-sm-flex justify-center position-relative"
            >
              <v-img
                contain
                max-width="170"
                src="@/assets/images/3d-characters/pose-m-1.png"
                class="security-character"
              ></v-img>
            </v-col>
          </v-row>
        </v-card-text>
      </div>

      <!-- divider -->
      <v-divider></v-divider>

      <div class="pa-3">
<!--        <v-card-title class="flex-nowrap">-->
<!--          <v-icon class="text&#45;&#45;primary me-3">-->
<!--            {{ icons.mdiKeyOutline }}-->
<!--          </v-icon>-->
<!--          <span class="text-break">Two-factor authentication</span>-->
<!--        </v-card-title>-->

<!--        <v-card-text class="two-factor-auth text-center mx-auto">-->
<!--          <v-avatar-->
<!--            color="primary"-->
<!--            class="primary mb-4"-->
<!--            rounded-->
<!--          >-->
<!--            <v-icon-->
<!--              size="25"-->
<!--              color="white"-->
<!--            >-->
<!--              {{ icons.mdiLockOpenOutline }}-->
<!--            </v-icon>-->
<!--          </v-avatar>-->
<!--          <p class="text-base text&#45;&#45;primary font-weight-semibold">-->
<!--            Two factor authentication is not enabled yet.-->
<!--          </p>-->
<!--          <p class="text-sm text&#45;&#45;primary">-->
<!--            Two-factor authentication adds an additional layer of-->
<!--            security to your account by requiring more than just a-->
<!--            password to log in. Learn more.-->
<!--          </p>-->
<!--        </v-card-text>-->

        <!-- actions buttons -->
        <v-card-text>
          <v-btn
            color="primary"
            class="me-3 mt-3"
            @click='updatePassword'
          >
            Đổi mật khẩu
          </v-btn>
          <v-btn
            color="secondary"
            outlined
            class="mt-3"
          >
            Hủy
          </v-btn>
        </v-card-text>
      </div>
    </v-form>
  </v-card>
</template>

<script>
// eslint-disable-next-line object-curly-newline
import { mdiKeyOutline, mdiLockOpenOutline, mdiEyeOffOutline, mdiEyeOutline } from '@mdi/js'
import { ref } from '@vue/composition-api'
import axios from 'axios'
import { adminConfig } from '@/main'
import Swal from 'sweetalert2'
export default {
  props:{
    accountPassword:{

    }
  },
  data(){
    return{
      payload:{
        newPassword:''
      },
      passwordRules: [
        v => !!v || 'Bắt buộc',
        v => (v && v.length <= 10) || 'Mật khẩu có độ dài tối đa 10 ký tự'
      ],
      confirmPassword:'',
      confirmPasswordRules: [
        (value) => !!value || 'Nhập lại mật khẩu',
        (value) =>
          value == this.payload.newPassword || 'Mật khẩu không khớp',
      ],
    }
  },
  methods:{
    updatePassword(){
      if(this.$refs.form.validate()){
        axios.post('http://localhost:3000/users/changePassword',this.payload, policeConfig)
          .then(res =>{
            if(res.data.success == true) {
              Swal.fire({
                title:'Đổi mật khẩu thành công',
                icon: 'success'
              }).then(this.$emit('refresh'))
            }
          })
          .catch(err=>{
            console.log(err)
          })
      }
    }
  },
  setup() {
    const isCurrentPasswordVisible = ref(false)
    const isNewPasswordVisible = ref(false)
    const isCPasswordVisible = ref(false)
    const currentPassword = ref('12345678')
    //const newPassword = ref('87654321')
    const cPassword = ref('87654321')

    return {
      isCurrentPasswordVisible,
      isNewPasswordVisible,
      currentPassword,
      isCPasswordVisible,
      //newPassword,
      cPassword,
      icons: {
        mdiKeyOutline,
        mdiLockOpenOutline,
        mdiEyeOffOutline,
        mdiEyeOutline,
      },
    }
  },
}
</script>

<style lang="scss" scoped>
.two-factor-auth {
  max-width: 25rem;
}
.security-character {
  position: absolute;
  bottom: -0.5rem;
}
</style>

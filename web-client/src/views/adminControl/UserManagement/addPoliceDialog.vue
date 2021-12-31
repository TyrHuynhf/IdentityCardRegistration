<template>
  <v-row justify="space-around" >
    <v-col>

      <v-dialog
        transition="dialog-bottom-transition"
        max-width="800"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            color="#1E88E5"
            v-bind="attrs"
            v-on="on"
            style='color: #f4f5fa'
          > <v-icon left>{{icons.mdiPlus}} </v-icon>Tạo tài khoản công an</v-btn>
        </template>
        <template v-slot:default="dialog">
            <v-card class='justify-content: center' >
              <v-toolbar
                color="primary"
                dark
                style='justify-items: center; color: White'

              ><h3 >Tạo tài khoản công an </h3></v-toolbar>
              <br>
              <v-form class="multi-col-validation" ref='form'>
                <v-row style='padding: 10px'>
                  <v-col
                    cols="12"
                    md="6"
                  >
                    <v-text-field
                      v-model="registerInfo.fullName"
                      outlined
                      label="Họ tên"
                      :rules="nameRules"
                      placeholder="Huỳnh Lê Tỷ"
                      hide-details="auto"
                      class="mb-3"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    md="6"
                  >
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
                  </v-col>
                  <v-col
                    cols="12"
                    md="6"
                  >
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
                  </v-col>
                  <v-col
                    cols="12"
                    md="6"
                  >
                    <v-menu
                      ref="menu1"
                      outlined
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
                          outlined
                          :rules="[v => !!v || 'Required']"
                          :prepend-icon= 'icons.mdiCalendar'
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
                  </v-col>
                </v-row>
              </v-form>
              <v-divider></v-divider>
              <v-card-actions class="justify-end">
                <v-btn
                  text
                  @click="registryPolice"
                  color='primary'
                >Tạo tài khoản</v-btn>
                <v-btn
                  text
                  @click="dialog.value = false"
                  color='#E1BEE7'
                >Đóng</v-btn>
              </v-card-actions>
            </v-card>

        </template>
      </v-dialog>

    </v-col>
  </v-row>

</template>
<script>
import axios from 'axios'
import Swal from 'sweetalert2'
import { mdiEyeOutline, mdiEyeOffOutline,mdiCalendar, mdiPlus } from '@mdi/js'
import { adminConfig } from '@/main'
export default {
  data: vm => ({
    registerInfo: {
      fullName: '',
      password: '',
      dateOfBirth:'',
        //vm.formatDate((new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10)),
      phoneNumber: '',
    },
    date: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
    menu1: false,
    isPasswordVisible: false,
    icons: {
      mdiEyeOutline,
      mdiEyeOffOutline,
      mdiCalendar,
      mdiPlus
    },
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
      const [month, day, year] = date.split('/')
      return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
    },
    registryPolice() {

      if (this.$refs.form.validate()) {
        let loader = this.$loading.show({
          // Optional parameters
          container:  null ,
          color: 'blue',
          backgroundColor: 'white',
          loader: 'bars',
          canCancel: false,
          onCancel: this.onCancel,
        });
        axios.post('http://localhost:3000/auth/registry/police', this.registerInfo, adminConfig)
          .then(res => {
            loader.hide()
            Swal.fire({
              icon: 'success',
              title: 'Tạo tài khoản thành công'
            }).then(this.$emit('refresh'))

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
<style>
.v-toolbar__content, .v-toolbar__extension {
  justify-content: center;
}
</style>
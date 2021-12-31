<template>
  <v-card
    flat
    class="pa-3 mt-2"
  >
    <v-card-text class="d-flex">
      <v-avatar
        rounded
        size="120"
        class="me-6"
      >
        <v-img :src="require('@/assets/images/avatars/1.png')"></v-img>
      </v-avatar>

      <!-- upload photo -->
<!--      <div>-->
<!--        <v-btn-->
<!--          color="primary"-->
<!--          class="me-3 mt-5"-->
<!--          @click="$refs.refInputEl.click()"-->
<!--        >-->
<!--          <v-icon class="d-sm-none">-->
<!--            {{ icons.mdiCloudUploadOutline }}-->
<!--          </v-icon>-->
<!--          <span class="d-none d-sm-block">Upload new photo</span>-->
<!--        </v-btn>-->

<!--        <input-->
<!--          ref="refInputEl"-->
<!--          type="file"-->
<!--          accept=".jpeg,.png,.jpg,GIF"-->
<!--          :hidden="true"-->
<!--        />-->

<!--        <v-btn-->
<!--          color="error"-->
<!--          outlined-->
<!--          class="mt-5"-->
<!--        >-->
<!--          Reset-->
<!--        </v-btn>-->
<!--        <p class="text-sm mt-5">-->
<!--          Allowed JPG, GIF or PNG. Max size of 800K-->
<!--        </p>-->
<!--      </div>-->
    </v-card-text>

    <v-card-text>
      <v-form class="multi-col-validation mt-6" ref='form'>
        <v-row>
          <v-col
            md="6"
            cols="12"
          >
            <v-text-field
              v-model='account.fullName'
              label="Họ tên"
              dense
              outlined
              :rules='nameRules'
            ></v-text-field>
          </v-col>

          <v-col
            md="6"
            cols="12"
          >
            <v-text-field
              v-model='account.phoneNumber'
              label="Số điện thoại"
              dense
              outlined
              :rules='phoneRules'
            ></v-text-field>
          </v-col>

<!--          <v-col-->
<!--            cols="12"-->
<!--            md="6"-->
<!--          >-->
<!--            <v-text-field-->
<!--              v-model='account.role'-->
<!--              label=""-->
<!--              dense-->
<!--              outlined-->
<!--            ></v-text-field>-->
<!--          </v-col>-->

          <v-col
            cols="12"
            md="6"
          >
            <v-text-field
              v-model='account.dateOfBirth'
              dense
              label="Ngày sinh"
              outlined
            ></v-text-field>
          </v-col>

<!--          <v-col-->
<!--            cols="12"-->
<!--            md="6"-->
<!--          >-->
<!--            <v-select-->
<!--              v-model="cloneUser.status"-->
<!--              dense-->
<!--              outlined-->
<!--              label="Status"-->
<!--              :items="status"-->
<!--            ></v-select>-->
<!--          </v-col>-->

<!--          <v-col-->
<!--            cols="12"-->
<!--            md="6"-->
<!--          >-->
<!--            <v-text-field-->
<!--              v-model="accountDataLocale.company"-->
<!--              dense-->
<!--              outlined-->
<!--              label="Company"-->
<!--            ></v-text-field>-->
<!--          </v-col>-->

          <!-- alert -->
<!--          <v-col cols="12">-->
<!--            <v-alert-->
<!--              color="warning"-->
<!--              text-->
<!--              class="mb-0"-->
<!--            >-->
<!--              <div class="d-flex align-start">-->
<!--                <v-icon color="warning">-->
<!--                  {{ icons.mdiAlertOutline }}-->
<!--                </v-icon>-->

<!--                <div class="ms-3">-->
<!--                  <p class="text-base font-weight-medium mb-1">-->
<!--                    Your email is not confirmed. Please check your inbox.-->
<!--                  </p>-->
<!--                  <a-->
<!--                    href="javascript:void(0)"-->
<!--                    class="text-decoration-none warning&#45;&#45;text"-->
<!--                  >-->
<!--                    <span class="text-sm">Resend Confirmation</span>-->
<!--                  </a>-->
<!--                </div>-->
<!--              </div>-->
<!--            </v-alert>-->
<!--          </v-col>-->

          <v-col cols="12">
            <v-btn
              color="primary"
              class="me-3 mt-4"
              @click='updateUser'
            >
              Lưu thay đổi
            </v-btn>
            <v-btn
              color="secondary"
              outlined
              class="mt-4"
              type="reset"
              @click.prevent="resetForm"
            >
              Hủy
            </v-btn>
          </v-col>
        </v-row>
      </v-form>
    </v-card-text>
  </v-card>
</template>

<script>
import { mdiAlertOutline, mdiCloudUploadOutline } from '@mdi/js'
import { ref } from '@vue/composition-api'
import { cloneDeep } from 'lodash'
import axios from 'axios'
import {config} from '@/main'

export default {
  props: {
    account: {
       type: Object,
      default: () => {},
    },

},
  data() {
    return {
      componentKey: 0,
      // stringAccount: JSON.stringify(this.account),
      accountDataLocale: ref(JSON.parse(JSON.stringify(this.account))),
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
    }
  },
  computed: {
    // cloneUser(props) {
    //   return ((props.account))
    // }
  },
  setup(props) {
    const status = ['Active', 'Inactive', 'Pending', 'Closed']
    //const accountDataLocale = ref(JSON.parse(JSON.stringify(props.account)))
    // this.$forceUpdate() dsads dsaddsadasassdsasdsd
    const resetForm = () => {
      //accountDataLocale.value = JSON.parse(JSON.stringify(props.accountData))
    }
    return {
      // status,
      //accountDataLocale,
      resetForm,
      icons: {
        mdiAlertOutline,
        mdiCloudUploadOutline,
      },
    }
  },
  methods:{
    updateUser(){
      axios.put('http://localhost:3000/users/'+ this.account.id, this.account, config )
      .then(res => {
        console.log(res.data)
        alert(res.data.message)
        this.$router.go()
        //this.$forceUpdate()
      })
      .catch(err => {
       console.log(err)
      })
    }
  },
  created() {
    //console.log("This is "+ (this.accountData.fullName))
    //this.accountDataLocale = (JSON.parse(JSON.stringify(this.account)))a
    // console.log((this.account.id))
    // console.log(this.accountDataLocale)

  }
}
</script>

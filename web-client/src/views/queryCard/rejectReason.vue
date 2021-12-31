<template>
      <v-dialog
        transition="dialog-bottom-transition"
        max-width="400"
        style='margin: 10px'
      >
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            color="#e74c3c"
            v-bind="attrs"
            v-on="on"
            text
          > <v-icon left>{{icons.mdiCloseCircleOutline}}</v-icon>Loại bỏ</v-btn>
        </template>
        <template v-slot:default="dialog">
            <v-card class='justify-content: center' >
              <v-toolbar
                color="primary"
                dark
                style='justify-items: center; color: White'

              ><h3 >Lý do loại bỏ</h3></v-toolbar>
              <br>
              <v-form class="multi-col-validation" ref='form'  style='padding: 10px'>
                <v-row >
                    <v-textarea style='padding: 10px'
                                outlined
                                v-model='cardInformation.rejectReason'
                                :rules='textRules'
                    >
                    </v-textarea>

                </v-row>
              </v-form>
              <v-divider></v-divider>
              <v-card-actions class="justify-end">
                <v-btn
                  text
                  @click="RejectRegistration"
                  color='success'
                >Xong</v-btn>
                <v-btn
                  text
                  @click="dialog.value = false"
                  color='#E1BEE7'
                >Đóng</v-btn>
              </v-card-actions>
            </v-card>
        </template>
      </v-dialog>
</template>
<script>
import axios from 'axios'
import Swal from 'sweetalert2'
import { policeConfig } from '@/main'
import {mdiPlus, mdiCheck, mdiClockTimeFourOutline, mdiCalendar, mdiCloseCircleOutline} from '@mdi/js'
export default {
  props:{
    cardInformation:{
    }
  },
  data: vm=> ({
      icons:{
        mdiPlus,
        mdiCheck,
        mdiClockTimeFourOutline,
        mdiCalendar,
        mdiCloseCircleOutline
      },
      textRules: [
        v => !!v || 'Vui lòng điền lý do loại bỏ đăng ký'
      ],

  }),
  methods: {
    RejectRegistration(){
      if(this.$refs.form.validate()){
        let loader = this.$loading.show({
          // Optional parameters
          container: null,
          color: 'blue',
          backgroundColor: 'white',
          loader: 'bars',
          canCancel: false,
          onCancel: this.onCancel,
        });
        axios.put('http://localhost:3000/cards/rejectRegistration/'+ this.cardInformation.id, this.cardInformation,policeConfig)
          .then(async res =>{
            axios.post('http://localhost:3000/upload/send-mail-reject', this.cardInformation )
              .then(response =>{
                loader.hide()
                Swal.fire({
                  title: "Đã loại bỏ đăng ký và gửi mail thành công",
                  icon: 'success'
                })
                this.$emit('refresh')
              })
            this.$emit('refresh')
          })
          .catch(err=>{
            loader.hide()
            Swal.fire({
              title: 'Không thể cập nhật!',
              icon: 'error',
            })
            console.log(err)
          })
      }
    },
  },
  created() {
  }
}
</script>
<style>
.v-toolbar__content, .v-toolbar__extension {
  justify-content: center;
}
</style>
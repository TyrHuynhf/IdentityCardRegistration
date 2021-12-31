<template>
    <v-dialog
        transition="dialog-bottom-transition"
        max-width="400"
        justify="space-around"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            color="#1abc9c"
            v-bind="attrs"
            v-on="on"
            text
          > <v-icon left>{{icons.mdiCheck}}</v-icon>Duyệt</v-btn>
        </template>
        <template v-slot:default="dialog">
            <v-card class='justify-content: center' >
              <v-toolbar
                color="primary"
                dark
                style='justify-items: center; color: White'

              ><h3 >Đặt lịch hẹn</h3></v-toolbar>
              <br>
              <v-form class="multi-col-validation" ref='form'>
                <v-row style='padding: 10px'>
                  <v-col
                    cols="12"
                    md="6"
                  >
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
                          v-model="cardInformation.invitationDate"
                          label="Ngày hẹn"
                          dense
                          outlined
                          hint="DD/MM/YYYY format"
                          persistent-hint
                          :prepend-icon=icons.mdiCalendar
                          v-bind="attrs"
                          :rules='dateRules'
                          @blur="date = parseDate(cardInformation.invitationDate)"
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
                  <v-col
                    cols="12"
                    md="6"
                  >
                    <v-menu
                      ref="menu"
                      v-model="menu2"
                      :close-on-content-click="false"
                      :nudge-right="40"
                      :return-value.sync="cardInformation.inviteTime"
                      transition="scale-transition"
                      offset-y
                      max-width="290px"
                      min-width="290px"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                          dense
                          outlined
                          :rules='hourRules'
                          v-model="cardInformation.inviteTime"
                          label="Giờ hẹn"
                          :prepend-icon= icons.mdiClockTimeFourOutline
                          readonly
                          v-bind="attrs"
                          v-on="on"
                        ></v-text-field>
                      </template>
                      <v-time-picker
                        v-if="menu2"
                        format='24hr'
                        scrollable
                        v-model="cardInformation.inviteTime"
                        full-width
                        @click:minute="$refs.menu.save(cardInformation.inviteTime)"
                      ></v-time-picker>
                    </v-menu>
                  </v-col>
                </v-row>
              </v-form>
              <v-divider></v-divider>
              <v-card-actions class="justify-end">
                <v-btn
                  text
                  @click="ApproveRegistration"
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
import {mdiPlus, mdiCheck, mdiClockTimeFourOutline, mdiCalendar} from '@mdi/js'
export default {
  props:{
    cardInformation:{
    }
  },
  components:{

  },
  data: vm=> ({
      date: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
      menu1: false,
      menu2: false,
      icons:{
        mdiPlus,
        mdiCheck,
        mdiClockTimeFourOutline,
        mdiCalendar
      },
      dateRules: [
        v => !!v || 'Vui lòng chọn ngày hẹn'
      ],
      hourRules: [
        v => !!v || 'Vui lòng chọn giờ hẹn'
      ],

  }),
  methods: {
    ApproveRegistration(){
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
        axios.put('http://localhost:3000/cards/approveRegistration/test/'+ this.cardInformation.id, {},policeConfig)
          .then(async res =>{
            axios.post('http://localhost:3000/upload/send-mail', this.cardInformation )
              .then(response =>{
                loader.hide()
                Swal.fire({
                  title: "Đã duyệt và gửi mail thành công",
                  icon: 'success'
                }).then(this.$emit('refresh'))
              })
            this.$emit('refresh')
          })
          .catch(err=>{
            loader.hide()
            console.log(err)
          })
      }
    },
    formatDate(date) {
      if (!date) return null
      const [year, month, day] = date.split('-')
      return `${day}/${month}/${year}`
    },
    parseDate(date) {
      if (!date) return null
      const [ day, month, year] = date.split('/')
      return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
    },
  },
  computed: {
    computedDateFormatted() {
      return this.formatDate(this.date)
    },
  },
  watch: {
    date() {
      this.cardInformation.invitationDate = this.formatDate(this.date)
    },
  },
  created() {
    this.cardInformation.invitationDate = this.formatDate((new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10))

  }
}
</script>
<style>
.v-toolbar__content, .v-toolbar__extension {
  justify-content: center;
}
</style>
<template>
  <v-row justify="space-around">
    <v-col cols="auto">
      <v-dialog
        transition="dialog-bottom-transition"
        max-width="800"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            color="primary"
            v-bind="attrs"
            v-on="on"
            style='padding: 5px'
            x-small
          >Xem</v-btn>
        </template>
        <template v-slot:default="dialog">
            <v-card class='justify-content: center' >
              <v-toolbar
                color="primary"
                dark
                style='justify-items: center; color: White'

              ><h3 >THONG TIN DANG KY</h3></v-toolbar>
              <br>
              <v-row>
                <v-col
                  cols="12"
                  v-if='cardInfo.cardNumber'
                >
                    <v-list-item two-line class="text-center" >
                      <v-list-item-content >
                        <v-list-item-title >So cccd</v-list-item-title>
                        <v-list-item-subtitle>{{cardInfo.cardNumber}}</v-list-item-subtitle>
                      </v-list-item-content>
                    </v-list-item>
                </v-col>
                <v-col
                  cols="12"
                  md="6"

                >
                  <v-list-item two-line class="text-center" >
                    <v-list-item-content >
                      <v-list-item-title >Ho ten</v-list-item-title>
                      <v-list-item-subtitle>{{cardInfo.fullName}}</v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>
                </v-col>
                <v-col
                  cols="12"
                  md="6"
                >
                  <v-list-item two-line class="text-center">
                    <v-list-item-content >
                      <v-list-item-title>Ngay sinh</v-list-item-title>
                      <br>
                      <v-list-item-subtitle>{{cardInfo.dateOfBirth}}</v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>
                </v-col>
                <v-col
                  cols="12"
                  md="6"
                >
                  <v-list-item two-line class="text-center">
                    <v-list-item-content>
                      <v-list-item-title>Gioi tinh</v-list-item-title>
                      <v-list-item-subtitle>{{cardInfo.gender}}</v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>
                </v-col>
                <v-col
                  cols="12"
                  md="6"
                >
                  <v-list-item two-line class="text-center">
                    <v-list-item-content>
                      <v-list-item-title>Nguyen quan</v-list-item-title>
                      <v-list-item-subtitle>{{cardInfo.hometown}}</v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>
                </v-col>
                <v-col
                  cols="12"
                  md="6"
                >
                  <v-list-item two-line class="text-center">
                    <v-list-item-content>
                      <v-list-item-title>Dia chi thuong tru</v-list-item-title>
                      <v-list-item-subtitle>{{cardInfo.address}}</v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>
                </v-col>
                <v-col
                  cols="12"
                  md="6"
                >
                  <v-list-item two-line class="text-center">
                    <v-list-item-content>
                      <v-list-item-title>Trang Thai</v-list-item-title>
                      <br>
                      <v-list-item-subtitle>{{cardInfo.registrationState }}</v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>
                </v-col>
                <v-col
                  cols="12"
                  md="6"
                  v-if='cardInfo.fingerprints'
                >
                  <v-list-item two-line class="text-center">
                    <v-list-item-content>
                      <v-list-item-title>Dau van tay</v-list-item-title>
                      <br>
                      <v-list-item-subtitle><img :src='fingerprintLink' alt='' width='200px'></v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>
                </v-col>
                <v-col
                  cols="12"
                  md="6"
                  v-if='cardInfo.picture'
                >
                  <v-list-item two-line class="text-center">
                    <v-list-item-content>
                      <v-list-item-title>Anh 3x4</v-list-item-title>
                      <br>
                      <v-list-item-subtitle><img :src='pictureLink' alt='' width='200px'></v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>
                </v-col>

              </v-row>
              <v-divider></v-divider>
              <v-card-actions class="justify-end">
                <v-btn
                  text
                  @click.prevent="RejectRegistration"
                  color='#FF5252'
                >Tu choi</v-btn>
                <v-btn
                  text
                  @click="ApproveRegistration"
                  color='success'
                >Duyet</v-btn>
                <v-btn
                  text
                  @click="dialog.value = false"
                  color='#E1BEE7'
                >Close</v-btn>
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
import {  policeConfig } from '@/main'
export default {
  props:{
    CardID:{
    }
  },
  data(){
    return{
      cardInfo:{},
      fingerprintLink:'',
      pictureLink: '',
      curr: 1,
      lastStep: 4,
      steps: [
        {name: "Start", rules: [v => !!v || "Required."], valid: true},
        {name: "Step 2", rules: [v=> !!v || "Required."], valid: true},
        {name: "Step 3", rules: [v => (v && v.length >= 4) || "Enter at least 4 characters."], valid: true},
        {name: "Complete"},
      ],
      valid: false,
      stepForm: []
    }
  },
  methods:{
    RejectRegistration(){
      let loader = this.$loading.show({
        // Optional parameters
        container: null,
        color: 'blue',
        backgroundColor: 'white',
        loader: 'bars',
        canCancel: false,
        onCancel: this.onCancel,
      });
      axios.put('http://localhost:3000/cards/rejectRegistration/'+ this.cardInfo.id, {},policeConfig)
      .then(res =>{
        loader.hide()
        Swal.fire({
          title: 'Thanh cong!',
          icon: 'success',
        })
        this.$emit('refresh')
      })
      .catch(err=>{
        loader.hide()
        Swal.fire({
          title: 'Cap nhat that bai!',
          icon: 'error',
        })
        console.log(err)
      })
    },
    ApproveRegistration(){
      let loader = this.$loading.show({
        // Optional parameters
        container: null,
        color: 'blue',
        backgroundColor: 'white',
        loader: 'bars',
        canCancel: false,
        onCancel: this.onCancel,
      });
      axios.put('http://localhost:3000/cards/approveRegistration/'+ this.cardInfo.id, {},policeConfig)
        .then(res =>{
          loader.hide()
          this.$emit('refresh')
        })
        .catch(err=>{
          loader.hide()
          console.log(err)
        })
    }

  },
  created() {
    axios.get('http://localhost:3000/cards/'+this.CardID)
    .then(res=>{
      this.cardInfo = res.data
      this.pictureLink = 'http://localhost:3000/upload/picture/'+ this.cardInfo.picture
      this.fingerprintLink = 'http://localhost:3000/upload/fingerprint/'+ this.cardInfo.fingerprints
      if(res.data.registrationState === 'pending') this.cardInfo.registrationState = 'Dang xu ly'
      else{
        if(res.data.registrationState === 'registered') this.cardInfo.registrationState = 'Duoc chap nhan'
        else  {
          if(res.data.registrationState === 'approved') {
            this.cardInfo.registrationState = 'Da duyet'
            this.approveCheck = true
          }
          else this.cardInfo.registrationState = 'Bi loai bo'
        }
      }
      // if(res.data.registrationState === 'pending') this.cardInfo.registrationState = 'Dang xu ly'
      // else{
      //   if(res.data.registrationState === 'registered') this.cardInfo.registrationState = 'Duoc chap nhan'
      //   else this.cardInfo.registrationState = 'Bi loai bo'
      // }
    })
    .catch(err =>{
      console.log(err)
    })
  }
}
</script>
<style>
.v-toolbar__content, .v-toolbar__extension {
  justify-content: center;
}
</style>
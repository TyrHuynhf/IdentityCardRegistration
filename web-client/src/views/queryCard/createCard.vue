<template>
  <v-row v-if='cardInfo.registrationState=="approved" && cardInfo.picture && cardInfo.fingerprints'>
    <v-col cols="auto">
      <v-btn
        outlined
        @click='addCard'
        x-small
      ><v-icon small>{{ mdiCogOutline }}</v-icon>Tạo thẻ</v-btn>

    </v-col>
  </v-row>

</template>
<script>
import axios from 'axios'
import Swal from 'sweetalert2'
import {mdiCogOutline} from "@mdi/js"
import { adminConfig, config } from '@/main'
export default {
  props:{
    cardInfo:{
    }
  },
  data(){
    return{
      mdiCogOutline,
      approveCheck: false,
      picture: null,
    }
  },
  methods:{
    async addCard() {
      let loader = this.$loading.show({
        // Optional parameters
        container: null,
        color: 'blue',
        backgroundColor: 'white',
        loader: 'bars',
        canCancel: false,
        onCancel: this.onCancel,
      });

      if (this.cardInfo.fingerprints && this.cardInfo.picture) {
        await axios.put("http://localhost:3000/cards/acceptRegistration/"+this.cardInfo.id, {}, {
            headers:{
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${localStorage.getItem('policeToken')}`,
            }
          })
          .then(response => {
            loader.hide()
            Swal.fire({
              title: 'Thành công!',
              icon: 'success',
            }).then(this.$emit('refresh'))

          })
          .catch(error => {
            loader.hide()
            Swal.fire({
              title: 'Cập nhật thất bại!',
              icon: 'error',
            })
            console.log(error)
          });
      }
    },

  },
  created() {
    // axios.get('http://localhost:3000/cards/'+this.CardID)
    // .then(res=>{
    //   this.cardInfo = res.data
    //   this.pictureLink = 'http://localhost:3000/upload/picture/'+ this.cardInfo.picture
    //   this.fingerprintLink = 'http://localhost:3000/upload/fingerprint/'+ this.cardInfo.fingerprints
    //   if(res.data.registrationState === 'pending') this.cardInfo.registrationState = 'Dang xu ly'
    //   else{
    //     if(res.data.registrationState === 'registered') this.cardInfo.registrationState = 'Duoc chap nhan'
    //     else  {
    //       if(res.data.registrationState === 'approved') {
    //         this.cardInfo.registrationState = 'Da duyet'
    //         this.approveCheck = true
    //       }
    //       else this.cardInfo.registrationState = 'Bi loai bo'
    //     }
    //   }
    // })
    // .catch(err =>{
    //   console.log(err)
    // })
  }
}
</script>
<style>
.v-toolbar__content, .v-toolbar__extension {
  justify-content: center;
}
</style>
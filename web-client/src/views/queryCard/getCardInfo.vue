<template>
      <v-dialog
        transition="dialog-bottom-transition"
        max-width="1000px"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            v-bind="attrs"
            v-on="on"
            style='padding: 5px'
            x-small
            title='Chi Tiet'
          ><v-icon>{{mdiCardAccountDetails}}</v-icon></v-btn>
        </template>
        <template v-slot:default="dialog">
            <v-card class='justify-content: center' >
              <v-toolbar
                color="#95a5a6"
                dark
                style='justify-items: center; color: black'

              ><h3 >THÔNG TIN THẺ</h3></v-toolbar>
              <br>
              <v-row style='padding: 25px'>
                <v-col cols='12'><v-card-title>Thông tin cá nhân</v-card-title>
                  <v-divider></v-divider>
                </v-col>
                <v-col
                  cols="12"
                  md="6"
                >
                  1. Họ và tên: {{cardInfo.fullName}}
                </v-col>

                <v-col
                  cols="12"
                  md="6"
                >
                  2.Ngày, tháng, năm sinh: {{cardInfo.dateOfBirth}}
                </v-col>
                <v-col
                  cols="12"
                  md="6"
                >
                  3.Giới tính: {{cardInfo.gender}}
                </v-col>

                <v-col
                  cols="12"
                  md="6"
                >
                  4. Số CMND/ Số CCCD: {{cardInfo.oldIdentityNumber}}
                </v-col>
                <v-col
                  cols="12"
                  md="6"
                >
                  5. Dân tộc: {{cardInfo.ethnic}}
                </v-col>
                <v-col
                  cols="12"
                  md="6"
                >
                  6. Tôn giáo: {{cardInfo.religion}}
                </v-col>
                <v-col
                  cols="12"
                  md="6"
                >
                  7. Quốc tịch: {{cardInfo.nation}}
                </v-col>
                <v-col
                  cols="12"
                >
                  8. Tình trạng hôn nhân: {{cardInfo.matrimony}}
                </v-col>
                <v-col
                  cols="12"
                >
                  9. Nhóm máu: {{cardInfo.bloodType}}
                </v-col>
                <v-col
                  cols="12"
                >
                  10. Nơi đăng ký khai sinh: {{cardInfo.birthProvince}}
                </v-col>

                <v-col
                  cols="12"
                >
                  11. Quê quán: {{cardInfo.hometown}}
                </v-col>
                <v-col
                  cols="12"
                >
                  12. Nơi thường trú: {{cardInfo.address}}
                </v-col>
                <v-col
                  cols="12"
                >
                  13. Nơi ở hiện tại: {{cardInfo.currentAddress}}
                </v-col>
                <v-col cols='12'><v-card-title>Thông tin thân nhân</v-card-title>
                  <v-divider></v-divider>
                </v-col>
                <v-col
                  cols="12"
                >
                  14. Họ, chữ đệm và tên của cha: {{cardInfo.dadName}}
                </v-col>
                <v-col
                  cols="12"
                >
                  15. Họ, chữ đệm và tên của mẹ: {{cardInfo.momName}}
                </v-col>
                <v-col
                  cols="12"
                >
                  16. Họ, chữ đệm và tên của vợ(chồng): {{cardInfo.partnerName}}
                </v-col>
                <v-col
                  cols="12"
                >
                  17. Họ, chữ đệm và tên của chủ hộ: {{cardInfo.householder}}
                </v-col>
                <v-col
                  cols="12"
                >
                  18. Quan hệ với chủ hộ: {{cardInfo.householderRelationship}}
                </v-col>
                <v-col cols='12'><v-card-title>Nghề nghiệp</v-card-title>
                  <v-divider></v-divider>
                </v-col>
                <v-col
                  cols="12"
                  md="6"
                >
                  19. Nghề nghiệp: {{cardInfo.career}}
                </v-col>
                <v-col
                  cols="12"
                  md="6"
                >
                  20. Trình độ học vấn: {{cardInfo.educationLevel}}
                </v-col>
                <v-col cols='12'><v-card-title>Thông tin đăng ký</v-card-title>
                  <v-divider></v-divider>
                </v-col>
                <v-col
                  cols="12"
                >
                  Tỉnh/Thành phố đăng ký làm căn cước công dân: {{cardInfo.registrationCity}}
                </v-col>
                <v-col
                  cols="12"
                  md="6"
                >
                  Loại đăng ký: {{cardInfo.registrationType}}
                </v-col>
                <v-col
                  cols="12"
                  md="6"
                >
                  Email: {{cardInfo.mail}}
                </v-col>

              <v-row>
                <v-col cols='12'><v-card-title>Thông tin xử lý</v-card-title>
                  <v-divider></v-divider>
                </v-col>
                <v-col cols='12' md='6'>
                  <v-list-item two-line >
                    <v-list-item-content>
                      <v-list-item-title>Số CCCD</v-list-item-title>
                      <br>
                      <v-list-item-subtitle>{{cardInfo.cardNumber}}</v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>
                </v-col>
                <v-col
                  cols="12"
                  md='6'
                >
                  <v-list-item two-line >
                    <v-list-item-content>
                      <v-list-item-title>Trạng thái</v-list-item-title>
                      <br>
                      <v-list-item-subtitle>{{cardInfo.regState }}</v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>
                </v-col>
                <v-col
                  cols="12"
                  md='6'
                  v-if='cardInfo.fingerprints'
                >
                  <v-list-item two-line >
                    <v-list-item-content>
                      <v-list-item-title>Dấu vân tay</v-list-item-title>
                      <br>
                      <v-list-item-subtitle><img :src='fingerprintLink' alt='' width='200px'></v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>
                </v-col>
                <v-col
                  cols="12"
                  md='6'
                  v-if='cardInfo.picture'
                >
                  <v-list-item two-line >
                    <v-list-item-content>
                      <v-list-item-title>Ảnh chân dung</v-list-item-title>
                      <br>
                      <v-list-item-subtitle><img :src='pictureLink' alt='' width='200px'></v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>
                </v-col>
                </v-row>
              </v-row>
              <br>
              <v-divider></v-divider>
              <v-card-actions class="justify-end">
<!--                <v-btn-->
<!--                  text-->
<!--                  @click.prevent="RejectRegistration"-->
<!--                  color='#FF5252'-->
<!--                >Từ chối</v-btn>-->
                <reject-reason :card-information='cardInfo' @refresh='rerender'></reject-reason>
<!--                <v-btn-->
<!--                  text-->
<!--                  @click="ApproveRegistration"-->
<!--                  color='success'-->
<!--                >Duyet</v-btn>-->
                <invitation :cardInformation='cardInfo' @refresh='rerender'></invitation>
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
import invitation from './invitation'
import rejectReason from './rejectReason'
import Swal from 'sweetalert2'
import {  policeConfig } from '@/main'
import { mdiCardAccountDetails} from '@mdi/js'
export default {
  props:{
    cardInfo:{
    }
  },
  components:{
    invitation,
    rejectReason
  },
  data(){
    return{
      mdiCardAccountDetails,
      fingerprintLink:'',
      pictureLink: '',
      payload:{
        invitationDate:'',
        inviteTime: ''
      },
      // cardInfo:{},
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
    rerender(){
      this.$emit('refresh')
    },
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
          title: 'Thành công!',
          icon: 'success',
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
        .then(async res =>{
          loader.hide()
          axios.post('http://localhost:3000/upload/send-mail', this.payload )
          .then(response =>{
            Swal.fire({
              title: "Đã duyệt và gửi mail thành công",
              icon: 'success'
            })
            this.$emit('refresh')
          })
          this.$emit('refresh')
        })
        .catch(err=>{
          loader.hide()
          console.log(err)
        })
    }

  },
  created() {
    if (this.cardInfo.registrationState === 'pending') this.cardInfo.regState = 'Đang xử lý'
    else {
      if (this.cardInfo.registrationState === 'registered') this.cardInfo.regState = 'Thành công'
      else {
        if (this.cardInfo.registrationState === 'approved') {
          this.cardInforegState = 'Đã duyệt'
          this.approveCheck = true
        } else this.cardInfo.regState = 'Bị loại bỏ'
      }
    }
    this.pictureLink = 'http://localhost:3000/upload/picture/' + this.cardInfo.picture
    this.fingerprintLink = 'http://localhost:3000/upload/fingerprint/' + this.cardInfo.fingerprints
  }
}
</script>
<style>
.v-toolbar__content, .v-toolbar__extension {
  justify-content: center;
}
</style>
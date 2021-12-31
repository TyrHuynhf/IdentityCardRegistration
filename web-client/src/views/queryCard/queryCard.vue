<template>
  <v-row class="match-height">

    <!-- Multiple Column -->
    <v-col cols="12">
      <v-card>
        <v-card-title class='justify-center font-weight-black' >Tra cứu đăng ký</v-card-title>
        <template>
          <v-simple-table dense>
            <template v-slot:default>
              <thead>
              <tr>
                <th class="text-uppercase text-center">
                  Đăng ký
                </th>
                <th class="text-center text-uppercase">
                  Trạng thái
                </th>
                <th class="text-center text-uppercase">
                  Chi tiết
                </th>
                <th class="text-center text-uppercase">
                  Ảnh chân dung
                </th>
                <th class="text-center text-uppercase">
                  Dấu vân tay
                </th>
                <th class="text-center text-uppercase">
                  Hoàn thành
                </th>
              </tr>
              </thead>
              <tbody>
              <tr
                v-for="item in test"
              >
                <td class="text-center">{{ item.fullName }}</td>
                <td class="text-center">
                  <v-chip
                    small
                    :color='statusColor[item.registrationState]'
                    class="font-weight-medium"
                  >
                    {{ item.registrationState == 'pending'? 'Đang xử lý' : (item.registrationState == 'approved'? 'Đã được duyệt':(item.registrationState == 'registered'? 'Thành công': 'Bị hủy bỏ')) }}
                  </v-chip>
<!--                  {{ item.registrationState == 'pending'? 'Dang xu ly' : (item.registrationState == 'approved'? 'Da duoc duyet':(item.registrationState == 'registered'? 'Thanh cong': 'Bi huy bo')) }}-->
                </td>
                <td class="text-center">
                  <get-card-info  :cardID='item.id' @refresh='rerender'></get-card-info>
                </td>
                <td class="text-center">
                  <push-picture  :CardID='item.id' @refresh='rerender' ></push-picture>
                </td>
                <td class="text-center">
                  <push-fingerprint  :CardID='item.id' @refresh='rerender' ></push-fingerprint>
                </td>
                <td class="text-center">
                  <creat-card  :CardID='item.id' @refresh='rerender' ></creat-card>
                </td>
              </tr>
              </tbody>
            </template>
          </v-simple-table>
        </template>

      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import AppBarUserMenu from './AppBarUserMenu'
import getCardInfo from './getCardInfo'
import pushFingerprint from './pushFingerprint'
import pushPicture from './pushPicture'
import creatCard from './createCard'
import axios from 'axios'
import { config } from '@/main'
export default {
  data(){
    return{
      test:[],
      ty:[],
      statusColor : {
        registered: 'success',
        rejected: 'error',
        pending: 'warning',
        approved: 'info',
      },
      status: {
        1: 'Current',
        2: 'Professional',
        3: 'Rejected',
        4: 'Resigned',
        5: 'Applied',
      },
    }
  },
  methods:{
    rerender(){
      this.$emit('refresh')
    }
  },
  components: {
    AppBarUserMenu,
    getCardInfo,
    pushFingerprint,
    pushPicture,
    creatCard
  },
  setup() {

    return {

    }
  },
  created() {
    axios.get('http://localhost:3000/cards/allCards/access/test')
    .then(res=>{
      const data = JSON.parse(JSON.stringify(res.data))
      this.test = data
    })
    .catch(err=>{
      console.log(err)
    })
  }
}
</script>

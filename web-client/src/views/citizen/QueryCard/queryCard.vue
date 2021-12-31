<template>
  <v-row class="match-height">

    <!-- Multiple Column -->
    <v-col cols="12">
      <v-card>
        <v-card-title class='justify-center font-weight-black' >Thông tin đăng ký </v-card-title>
        <template>

          <v-simple-table dense>
            <template v-slot:default>
              <thead>
              <tr>
                <th >
                  Đăng ký
                </th>
                <th >
                  Trạng thái
                </th>
                <th>
                  Ngày đăng ký
                </th>
                <th >
                  Chi tiết
                </th>

              </tr>
              </thead>
              <tbody>
              <tr
                v-for="item in test"
              >
                <td >{{ item.fullName }}</td>
                <td >
                  <v-chip
                    small
                    :color='statusColor[item.registrationState]'
                    class="font-weight-medium"
                  >
                    {{ item.registrationState == 'pending'? 'Đang xử lý' : (item.registrationState == 'approved'? 'Đã được duyệt':(item.registrationState == 'registered'? 'Thành công': 'Bị hủy bỏ')) }}
                  </v-chip>
<!--                  {{ item.registrationState == 'pending'? 'Dang xu ly' : (item.registrationState == 'approved'? 'Da duoc duyet':(item.registrationState == 'registered'? 'Thanh cong': 'Bi huy bo')) }}-->
                </td>
                <td>
                  {{formatDate(item.registrationTime)}}
                </td>
                <td >
                  <get-card-info  :cardInfo='item' @refresh='rerender'></get-card-info>
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

// import getCardInfo from './getCardInfo'
import axios from 'axios'
import { config } from '@/main'
import {mdiPencil, mdiDelete} from '@mdi/js'
import getCardInfo from './getCardInfo'
export default {
  data(){
    return{
      mdiPencil, mdiDelete,
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
    },
    formatDate(date) {
      var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();
      let hour, minute
      hour = d.getHours();
      minute =d.getMinutes()
      if (month.length < 2)
        month = '0' + month;
      if (day.length < 2)
        day = '0' + day;
      return [day, month, year].join('/') + ' '+ [hour, minute].join(':')
    },
  },
  components: {
    getCardInfo,
  },
  setup() {

    return {

    }
  },
  created() {
    axios.get('http://localhost:3000/cards/try/getCards', config)
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

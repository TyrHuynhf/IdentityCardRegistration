<template>
  <v-form class="multi-col-validation" ref='form'>
    <v-col cols='12' >
        <v-row>
              <v-col cols='12'><v-card-title>Thông tin cá nhân</v-card-title>
                <v-divider></v-divider>
              </v-col>
              <v-col
                cols="12"
                md="6"
              >
                <v-text-field
                  v-model="payload.fullName"
                  label="Họ và tên"
                  outlined
                  class='required'
                  :rules='nameRules'
                  dense
                  placeholder="Huỳnh Văn A"
                ></v-text-field>
              </v-col>

              <v-col
                cols="12"
                md="3"
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
                      v-model="payload.dateOfBirth"
                      label="Ngày sinh"
                      outlined
                      class='required'
                      :rules='nameRules'
                      hint="DD/MM/YYYY format"
                      persistent-hint
                      v-bind="attrs"
                      dense
                      @blur="date = parseDate(payload.dateOfBirth)"
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
                md="3"
              >
                <v-select
                  v-model='payload.gender'
                  :items='genderList'
                  dense
                  outlined
                  :rules='nameRules'
                  class='required'
                  label='Giới tính'
                >

                </v-select>
              </v-col>

              <v-col
                cols="12"
                md="6"
              >
                <v-text-field
                  v-model="payload.address"
                  label="Nơi thường trú"
                  class='required'
                  outlined
                  dense
                  :rules='nameRules'
                ></v-text-field>
              </v-col>
              <v-col
                cols="12"
                md="6"
              >
                <v-text-field
                  v-model="payload.hometown"
                  label="Quê quán"
                  class='required'
                  outlined
                  dense
                  :rules='nameRules'
                ></v-text-field>
              </v-col>
              <v-col
                cols="12"
                md="4"
              >
                <v-select
                  v-model='payload.nation'
                  :items='nationList'
                  dense
                  outlined
                  :rules='nameRules'
                  class='required'
                  label='Quốc tịch'
                >
                </v-select>
              </v-col>
              <v-col
                cols="12"
                md="4"
              >
                <v-text-field
                  v-model="payload.religion"
                  label="Tôn giáo"
                  class='required'
                  outlined
                  dense
                  :rules='nameRules'
                ></v-text-field>
              </v-col>
              <v-col
                cols="12"
                md="4"
              >
                <v-text-field
                  v-model="payload.ethnic"
                  label="Dân tộc"
                  class='required'
                  outlined
                  dense
                  :rules='nameRules'
                ></v-text-field>
              </v-col>
              <v-col
                cols="12"
                md="4"
              >
                <v-select
                  v-model='payload.matrimony'
                  :items='matrimonyList'
                  dense
                  outlined
                  :rules='nameRules'
                  class='required'
                  label='Tình trạng hôn nhân'
                >
                </v-select>
              </v-col>
              <v-col
                cols="12"
                md="4"
              >
                <v-text-field
                  v-model="payload.bloodType"
                  label="Nhóm máu (nếu có)"
                  outlined
                  dense
                ></v-text-field>
              </v-col>

              <v-col
                cols="12"
                md="4"

              >
                <v-combobox
                  v-model='payload.birthProvince'
                  :items='cities'
                  solo
                  dense
                  outlined
                  :rules='nameRules'
                  class='required'
                  label='Nơi đăng ký khai sinh'
                >
                </v-combobox>
              </v-col>
              <v-col
                cols="12"
                md="6"
              >
                <v-text-field
                  v-model="payload.currentAddress"
                  label="Nơi ở hiện tại"
                  class='required'
                  outlined
                  dense
                  :rules='nameRules'
                ></v-text-field>
              </v-col>
          <v-col
            cols="12"
            md="6"
          >
            <v-text-field
              v-model="payload.oldIdentityNumber"
              label="Số thẻ CCCD/CMND cũ"
              class='required'
              outlined
              dense
              :disabled='regType.id=="dkm" '
            ></v-text-field>
          </v-col>
          <v-col cols='12'><v-card-title>Thông tin thân nhân</v-card-title>
            <v-divider></v-divider>
          </v-col>
          <v-col
            cols="12"
            md="6"
          >
            <v-text-field
              v-model="payload.dadName"
              label="Họ tên cha"
              class='required'
              outlined
              dense
              :rules='nameRules'
            ></v-text-field>
          </v-col>
          <v-col
            cols="12"
            md="6"
          >
            <v-text-field
              v-model="payload.momName"
              label="Họ tên mẹ"
              class='required'
              outlined
              dense
              :rules='nameRules'
            ></v-text-field>
          </v-col>
          <v-col
            cols="12"
            md="6"
          >
            <v-text-field
              v-model="payload.partnerName"
              label="Họ tên vợ/chồng"
              class='required'
              outlined
              dense
              :disabled='payload.matrimony=="Chưa kết hôn"'
            ></v-text-field>
          </v-col>
          <v-col
            cols="12"
            md="6"
          >
            <v-text-field
              v-model="payload.householder"
              label="Họ tên chủ hộ"
              class='required'
              outlined
              dense
              :rules='nameRules'
            ></v-text-field>
          </v-col>
          <v-col
            cols="12"
            md="6"
          >
            <v-text-field
              v-model="payload.householderRelationship"
              label="Quan hệ chủ hộ"
              class='required'
              outlined
              dense
              :rules='nameRules'
            ></v-text-field>
          </v-col>
          <v-col cols='12'><v-card-title>Nghề nghiệp</v-card-title>
            <v-divider></v-divider>
          </v-col>
          <v-col
            cols="12"
            md="6"
          >
            <v-text-field
              v-model="payload.career"
              label="Nghề nghiệp"
              class='required'
              outlined
              dense
              :rules='nameRules'
            ></v-text-field>
          </v-col>
          <v-col
            cols="12"
            md="6"
          >
            <v-text-field
              v-model="payload.educationLevel"
              label="Trình độ học vấn"
              class='required'
              outlined
              dense
              :rules='nameRules'
            ></v-text-field>
          </v-col>
          <v-col cols='12'><v-card-title>Thông tin đăng ký</v-card-title>
            <v-divider></v-divider>
          </v-col>
              <v-col
                cols="12"
                md="6"
              >
                <v-combobox
                  v-model='payload.registrationCity'
                  :items='cities'
                  solo
                  dense
                  outlined
                  :rules='nameRules'
                  class='required'
                  label='Tỉnh/Thành phố đăng ký làm căn cước công dân'
                >
                </v-combobox>
              </v-col>
              <v-col
                cols="12"
                md="6"
              >
                <v-text-field
                  v-model='payload.registrationType'
                  label="Loại đăng ký"
                  class='required'
                  outlined
                  dense
                  disabled
                ></v-text-field>
              </v-col>
              <v-col
                cols="12"
                md="6"
              >
                <v-text-field
                  v-model="payload.mail"
                  label="Email"
                  class='required'
                  outlined
                  dense
                  :rules='nameRules'
                ></v-text-field>
              </v-col>
              <!--      <v-col cols="12">-->
              <!--        <v-checkbox-->
              <!--          v-model="checkbox"-->
              <!--          label="Remember me"-->
              <!--          class="mt-0"-->
              <!--          hide-details-->
              <!--        ></v-checkbox>-->
              <!--      </v-col>-->

              <v-col cols="12">
                <v-btn color="primary" @click.prevent='registryCard'>
                  Đăng ký
                </v-btn>

              </v-col>
      </v-row>
    </v-col>

  </v-form>
</template>

<script>
import { ref } from '@vue/composition-api'
import axios from 'axios'
import { policeConfig } from '@/main'
import Swal from 'sweetalert2'
export default {
  name:'dkm',
  props:{
    regType:{
    }
  },
  data:vm =>({
      payload:{
        fullName:'',
        dateOfBirth: vm.formatDate((new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10)),
        gender:'',
        address:'',
        currentAddress:'',
        religion:'',
        ethnic:'',
        matrimony:'',
        bloodType:'',
        birthProvince:'',
        oldIdentityNumber:'',
        dadName:'',
        momName:'',
        partnerName:'',
        householder:'',
        householderRelationship:'',
        educationLevel:'',
        career:'',
        registrationType:'',
        hometown:'',
        nation:'',
        registrationCity:'',
        mail:''
      },
      date: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
      menu1: false,
      cities:[],
      selectedCity: '',
      genderList:['Nam','Nữ'],
      nationList:['Việt Nam'],
      matrimonyList:['Chưa kết hôn', 'Đã kết hôn'],
      nameRules: [
        v => !!v || 'Bắt buộc',
      ],
      fullPage: false,


  }),
  methods:{
    formatDate(date) {
      if (!date) return null
      const [year, month, day] = date.split('-')
      return `${day}/${month}/${year}`
    },
    parseDate(date) {
      if (!date) return null
      const [ day,month, year] = date.split('/')
      return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
    },
    onCancel() {
      console.log('User cancelled the loader.')
    },
    registryCard(){
      if(this.$refs.form.validate()){
        let loader = this.$loading.show({
          // Optional parameters
          container:  null ,
          color: 'blue',
          backgroundColor: 'white',
          loader: 'bars',
          canCancel: false,
          onCancel: this.onCancel,
        });
        axios.post('http://localhost:3000/cards/addCards',this.payload, policeConfig)
          .then(res=>{
            loader.hide()
            Swal.fire({
              title: 'Đăng ký thành công!',
              icon: 'success',
            })

          })
          .catch(err=>{
            loader.hide()
            console.log(err)
          })
      }
    },
    reset(){
      this.payload.value = ''
    }
  },
  created() {
    axios.get('http://localhost:3000/city/allCity/getCities')
    .then(res=>{

      const data= res.data
      for(let i= 0; i <= data.length; i++){
        this.cities.push(data[i].cityName)
      }
    })
    .catch(err=>{
      //console.log(err)
    })
    this.payload.registrationType = this.regType.name;
  },
  computed: {

    computedDateFormatted() {
      return this.formatDate(this.date)
    },
  },
  watch: {
    date() {
      this.payload.dateOfBirth = this.formatDate(this.date)
    },
  },
  setup() {
    const firstName = ref('')
    const lastName = ref('')
    const city = ref('')
    const country = ref('')
    const company = ref('')
    const email = ref('')
    const checkbox = ref(false)

    return {
      firstName,
      lastName,
      city,
      country,
      company,
      email,
      checkbox,
    }
  },
}
</script>
<style>
.required label:after {
  content:" (*)";
  color: red;
}

</style>
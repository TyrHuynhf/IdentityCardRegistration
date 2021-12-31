<template>
  <v-row class="match-height">
<!--    <v-select-->
<!--      v-model='selection'-->
<!--      :items="RegName"-->
<!--      dense-->
<!--      outlined-->
<!--      :rules='nameRules'-->
<!--      class='required'-->
<!--      label="Loai dang ky"-->
<!--    ></v-select>-->
    <v-col cols='12' >
      <v-combobox
        v-model='selection'
        :items='RegType'
        solo
        item-text='name'
        label="Chọn loại đăng ký"
      >
      </v-combobox>
    </v-col>

    <div v-if='selection.id =="dkm" || selection.id =="doi"  || selection.id =="clt" || selection.id =="9so" || selection.id =="12so"'>
      <v-col cols="12">
        <v-card width='100%'>
          <v-card-title class='justify-center font-weight-black' >BIỂU MẪU YÊU CẦU CẤP LẠI CĂN CƯỚC CÔNG DÂN</v-card-title>
          <br>
          <v-card-text>
            <demo-form-layout-multiple-column :regType='selection'><slot></slot></demo-form-layout-multiple-column>
          </v-card-text>
        </v-card>
      </v-col>
    </div>
    <!-- Multiple Column -->

  </v-row>
</template>

<script>

import DemoFormLayoutMultipleColumn from '@/views/RegistryCard/DemoFormLayoutMultipleColumn'

export default {
  components: {
    DemoFormLayoutMultipleColumn,
  },
  data(){
    return{
      selection:'',
      nameRules: [
        v => !!v || 'Bắt buộc',
      ],
      selectedRegType:'',
      RegType:[
        { name: 'Cấp mới CCCD', id :'dkm' },
        { name: 'Đổi CCCD', id :'doi' },
        { name: 'Cấp lại CCCD', id :'clt' },
        { name: 'Cấp mới từ CMND 9 số sang CCCD', id :'9so' },
        { name: 'Cấp mới từ CMND 12 số sang CCCD', id :'12so' },
      ],

    }
  }
}
</script>
<style>
.required label:after {
  content:" *";
  color: red;
}
</style>
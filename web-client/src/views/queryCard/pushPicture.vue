<template>
  <div >
    <v-row  v-if='cardInfo.registrationState=="approved" && !cardInfo.picture'>
      <v-col cols="auto">
        <v-dialog
          transition="dialog-bottom-transition"
          max-width="400"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              x-small
              v-bind="attrs"
              v-on="on"
            ><v-icon>{{ icons.mdiPlusCircle }}</v-icon></v-btn>
          </template>
          <template v-slot:default="dialog">
            <v-card class='justify-content: center' >
              <v-toolbar
                color="primary"
                dark
                style='justify-items: center; color: White'

              ><h3 >Thêm ảnh chân dung</h3></v-toolbar>
              <br>
              <v-row>
                <v-col
                  cols="12"

                >
                  <v-file-input
                    v-model='picture'
                    :rules='defaultRules'
                    ref='file'
                    accept="image/*"
                    label="Thêm ảnh chân dung"></v-file-input>

                </v-col>


              </v-row>
              <v-divider></v-divider>
              <v-card-actions class="justify-end">
                <v-btn
                  @click='submitFiles'
                  text
                  color='success'
                >Thêm ảnh</v-btn>
                <v-btn
                  text
                  @click="dialog.value = false"
                  color='#E1BEE7'
                >Đóng</v-btn>
              </v-card-actions>
            </v-card>

          </template>
        </v-dialog>

      </v-col>
    </v-row>
    <v-icon class="text-center"  v-if=' cardInfo.registrationState =="approved" && cardInfo.picture'>
      {{ icons.mdiCheckBoxOutline }}</v-icon>
  </div>

</template>

<script>
import axios from 'axios'
import Swal from 'sweetalert2'
import {mdiPlus,mdiPlusCircle,mdiCheckBoxOutline} from "@mdi/js"
export default {
  props:{
    cardInfo:{
      type: Object
    }
  },
  data(){
    return{
      pictureLink:'',
      icons:{
        mdiPlus,
        mdiPlusCircle,
        mdiCheckBoxOutline
      },
      approveCheck: false,
      picture: null,
      defaultRules:[
        v=> !!v || 'Required'
      ]
    }
  },
  methods:{
    async submitFiles() {

      if (this.$refs.file.validate()) {
        let loader = this.$loading.show({
          // Optional parameters
          container: null,
          color: 'blue',
          backgroundColor: 'white',
          loader: 'bars',
          canCancel: false,
          onCancel: this.onCancel,
        });
        let formData = new FormData();
        formData.append("", this.picture);
        await axios.put("http://localhost:3000/cards/picture/"+this.cardInfo.id, formData, {
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
            Swal.fire({
              title: 'Cập nhật thất bại!',
              icon: 'error',
            })
            console.log(error)
          });
      } else {
        console.log("there are no files.");
      }
    },



  },
  created() {
    this.pictureLink = 'http://localhost:3000/upload/picture/'+ this.cardInfo.picture
  }
}
</script>
<style>
.v-toolbar__content, .v-toolbar__extension {
  justify-content: center;
}
</style>
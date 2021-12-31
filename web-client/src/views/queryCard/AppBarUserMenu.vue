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
          >Click Edit</v-btn>
        </template>
        <template v-slot:default="dialog">
          <v-stepper v-model="curr" color="green">
            <v-stepper-header class="overflow-x-auto">
              <v-stepper-step
                v-for="(step,n) in steps"
                :key="n"
                :complete="stepComplete(n+1)"
                :step="n+1"
                :rules="[value => !!step.valid]"
                :color="stepStatus(n+1)">
                {{ step.name }}
              </v-stepper-step>
            </v-stepper-header>
            <v-stepper-content v-for="(step,n) in steps" :step="n+1" :key="n">
              {{ step.name }}
              <v-card color="grey lighten-1" class="mb-12" height="200px">
                <v-card-text>
                  <v-form :ref="'stepForm'" v-model="step.valid" lazy-validation>
                    <v-text-field label="Enter something..." :rules="step.rules"></v-text-field>
                  </v-form>
                </v-card-text>
              </v-card>
              <v-btn v-if="n+1 < lastStep" color="primary" @click="validate(n)" :disabled="!step.valid">Continue</v-btn>
              <v-btn v-else color="success" @click="done()">Done</v-btn>
              <v-btn text @click="curr = n">Back</v-btn>
            </v-stepper-content>
          </v-stepper>
<!--            <v-card class='justify-content: center' >-->
<!--              <v-toolbar-->
<!--                color="primary"-->
<!--                dark-->
<!--                style='justify-items: center; color: White'-->

<!--              ><h3 >THONG TIN DANG KY</h3></v-toolbar>-->
<!--              <br>-->
<!--              <v-row>-->
<!--                <v-col-->
<!--                  cols="12"-->
<!--                  md="6"-->

<!--                >-->
<!--                  <v-list-item two-line class="text-center" >-->
<!--                    <v-list-item-content outlined style='border: #131120; justify-content: center'>-->
<!--                      <v-list-item-title style='justify-content: center'>Ho ten</v-list-item-title>-->
<!--                      <v-list-item-subtitle>{{cardInfo.fullName}}</v-list-item-subtitle>-->
<!--                    </v-list-item-content>-->
<!--                  </v-list-item>-->
<!--                </v-col>-->
<!--                <v-col-->
<!--                  cols="12"-->
<!--                  md="6"-->
<!--                >-->
<!--                  <v-list-item two-line class="text-center">-->
<!--                    <v-list-item-content>-->
<!--                      <v-list-item-title>Ngay sinh</v-list-item-title>-->
<!--                      <br>-->
<!--                      <v-list-item-subtitle>{{cardInfo.dateOfBirth}}</v-list-item-subtitle>-->
<!--                    </v-list-item-content>-->
<!--                  </v-list-item>-->
<!--                </v-col>-->
<!--                <v-col-->
<!--                  cols="12"-->
<!--                  md="6"-->
<!--                >-->
<!--                  <v-list-item two-line class="text-center">-->
<!--                    <v-list-item-content>-->
<!--                      <v-list-item-title>Gioi tinh</v-list-item-title>-->
<!--                      <v-list-item-subtitle>{{cardInfo.gender}}</v-list-item-subtitle>-->
<!--                    </v-list-item-content>-->
<!--                  </v-list-item>-->
<!--                </v-col>-->
<!--                <v-col-->
<!--                  cols="12"-->
<!--                  md="6"-->
<!--                >-->
<!--                  <v-list-item two-line class="text-center">-->
<!--                    <v-list-item-content>-->
<!--                      <v-list-item-title>Nguyen quan</v-list-item-title>-->
<!--                      <v-list-item-subtitle>{{cardInfo.hometown}}</v-list-item-subtitle>-->
<!--                    </v-list-item-content>-->
<!--                  </v-list-item>-->
<!--                </v-col>-->
<!--                <v-col-->
<!--                  cols="12"-->
<!--                  md="6"-->
<!--                >-->
<!--                  <v-list-item two-line class="text-center">-->
<!--                    <v-list-item-content>-->
<!--                      <v-list-item-title>Dia chi thuong tru</v-list-item-title>-->
<!--                      <v-list-item-subtitle>{{cardInfo.address}}</v-list-item-subtitle>-->
<!--                    </v-list-item-content>-->
<!--                  </v-list-item>-->
<!--                </v-col>-->
<!--                <v-col-->
<!--                  cols="12"-->
<!--                  md="6"-->
<!--                >-->
<!--                  <v-list-item two-line class="text-center">-->
<!--                    <v-list-item-content>-->
<!--                      <v-list-item-title>Trang Thai</v-list-item-title>-->
<!--                      <br>-->
<!--                      <v-list-item-subtitle>{{cardInfo.registrationState }}</v-list-item-subtitle>-->
<!--                    </v-list-item-content>-->
<!--                  </v-list-item>-->
<!--                </v-col>-->
<!--                <v-col-->
<!--                  cols="12"-->
<!--                  md="6"-->
<!--                >-->
<!--                  <v-list-item two-line class="text-center">-->
<!--                    <v-list-item-content>-->
<!--                      <v-list-item-title>Dau van tay</v-list-item-title>-->
<!--                      <br>-->
<!--                      <v-list-item-subtitle><img :src='fingerprintLink' alt='' width='200px'></v-list-item-subtitle>-->
<!--                    </v-list-item-content>-->
<!--                  </v-list-item>-->
<!--                </v-col>-->
<!--                <v-col-->
<!--                  cols="12"-->
<!--                  md="6"-->
<!--                >-->
<!--                  <v-list-item two-line class="text-center">-->
<!--                    <v-list-item-content>-->
<!--                      <v-list-item-title>Anh 3x4</v-list-item-title>-->
<!--                      <br>-->
<!--                      <v-list-item-subtitle><img :src='pictureLink' alt='' width='200px'></v-list-item-subtitle>-->
<!--                    </v-list-item-content>-->
<!--                  </v-list-item>-->
<!--                </v-col>-->

<!--              </v-row>-->
<!--              <v-card-actions class="justify-end">-->
<!--                <v-btn-->
<!--                  text-->
<!--                  @click="dialog.value = false"-->
<!--                >Close</v-btn>-->
<!--              </v-card-actions>-->
<!--            </v-card>-->

        </template>
      </v-dialog>
    </v-col>
  </v-row>

</template>
<script>
import axios from 'axios'
import { config } from '@/main'
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
    stepComplete(step) {
      return this.curr > step
    },
    stepStatus(step) {
      return this.curr > step ? 'green' : 'blue'
    },
    validate(n) {
      this.steps[n].valid = false
      let v = this.$refs.stepForm[n].validate()
      if (v) {
        this.steps[n].valid = true
        // continue to next
        this.curr = n+2
      }
    },
    done() {
      this.curr = 5
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
        else this.cardInfo.registrationState = 'Bi loai bo'
      }
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
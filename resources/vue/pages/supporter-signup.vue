<template>
    <colored>
        <template slot="title">Sign Up</template>
        <template slot="head">
            <script
                src="https://maps.googleapis.com/maps/api/js?key=AIzaSyAErHT0mVxYKN8mvFBZgGzX_2eSdmvPMnw&libraries=places"
            ></script>
            <meta property="og:url" content="https://future.org.au/supporter-signup"/>
            <meta property="og:type" content="website"/>
            <meta property="og:title" content="Sign our petition to register our party"/>
            <meta property="og:description" content="Sign our petition in under one minute. SA's newest political party. Help us shape Australia's future"/>
            <meta property="og:image" content="https://future.org.au/images/supporter-signup.png"/>
        </template>
        <template slot="content">
            <div class="flex-center padding-top-desktop">
                <div style="width: 100%">
                    <div style="justify-content: center; font-size: 1.3em; padding-top: 10px; color: #fff; display: flex; font-weight: 800">
                        <div style="color: #5f5; padding-right: 5px">+ {{ signaturesPastWeek + 10 }}</div>
                        <div>this week</div>
                    </div>
                    <progressBar :current="800 + signatureCount >= 1000 ? 1000 : 800 + signatureCount" :max="1000"/>
                </div>

                <card class="medium padding-medium">
                    <div class="flex-column">
                        <div class="center">
                            <h1 class="light">Become a supporter</h1>
                            <p class="small-text">
                                <strong>What does this mean for you?</strong> Better infrastructure, cheaper rent, cheaper utilities, better schools, more jobs and better healthcare
                            </p>
                        </div>
                    </div>
                </card>
                <card class="medium padding-medium">
                    <div class="flex-column">
                        <div class="center">
                            <p class="small-text">We need
                                <strong>{{(200 - signatureCount) > 0 ? 200 - signatureCount : 0}} more signatures</strong> from enrolled voters to register our party.
                            </p>
                            <p class="small-text">Sign up and help us get there!</p>
                        </div>

                        <formInput
                            type="text"
                            name="name"
                            :vmodel.sync="form.name"
                            placeholder="Full Name"
                            undertext="Enter name as it appears on the electoral roll"
                            :v="$v.form.name"
                            :error="this.$v.form.name.$error ? 'You must enter your full name' : undefined"
                        />

                        <VueGoogleAutocomplete
                            name="address"
                            autocomplete="off"
                            placeholder="Full Address"
                            :vmodel.sync="form.address"
                            undertext="Enter your address as it appears on the electoral roll"
                            :v="$v.form.address"
                            :error="this.$v.form.address.$error ? 'You must enter your full address' : undefined"
                        />

                        <vueSignaturePad
                            undertext="Draw your signature"
                            height="120px"
                            width="200px"
                            ref="signaturePad"
                            :vmodel.sync="form.signature"
                            :v="$v.form.signature"
                            :error="this.$v.form.signature.$error ? 'You must enter your signature' : undefined"
                        />

                        <checkbox
                            class="center"
                            :checked.sync="form.registeredVoter"
                            placeholder="Are you an enrolled registered voter?"
                        ></checkbox>

                        <div v-if="!form.registeredVoter">
                            <p class="small-text">If you're not a registered voter, enrol first. <strong>It takes less than 3 minutes to enrol.</strong></p>
                            <p class="small-text">When you're finished come back and sign up. You don't need to be over 18 to enrol to vote</p>

                            <a href="https://www.aec.gov.au/enrol/" target="_blank" rel="noopener noreferrer">Click to enrol online now</a> 
                        </div>
                        <div v-if="form.registeredVoter">
                            <p class="small-text">If you haven't enrolled, it takes 3 minutes to enrol.</p>
                            <a href="https://www.aec.gov.au/enrol/" target="_blank" rel="noopener noreferrer">Enrol Online Now</a> 
                        </div>
                        <div class="margin-top-bottom align-center">
                            <buttonround :locked="submitted" @click.native="signUp">Sign Up</buttonround>
                        </div>
                    </div>
                </card>
            </div>
        </template>
    </colored>
</template>
<script>
import colored from "vue/layouts/colored.vue"
import card from "vue/components/card.vue"
import buttonround from "vue/controls/button-round.vue"
import formInput from "vue/controls/input.vue"
import vueSignaturePad from "vue/components/signaturePad.vue"
import checkbox from "vue/controls/checkbox.vue"
import VueGoogleAutocomplete from "vue/components/autoCompleteAddress.vue"
import grapher from "utils/grapher"
import progressBar from "vue/components/progressBar.vue"
import { validationMixin } from "vuelidate"
import { required } from "vuelidate/lib/validators"

export default {
    mixins: [validationMixin],
    data: () => ({
        form: {
            name: "",
            address: "",
            signature: undefined,
            registeredVoter: true
        },
        submitted: false,
    }),
    validations: {
        form: {
            name: {
                required
            },
            address: {
                required
            },
            signature: {
                required
            }
        }
    },
    methods: {
        clear() {
            this.$refs.signaturePad.clearSignature()
        },

        async signUp() {
            if (this.submitted === true) return

            this.$v.$touch()

            if(this.$v.$error) {
                this.submitted = false
                return
            }

            let form = this.form;
            let data = {
                name: form.name,
                address: form.address,
                signature: form.signature,
                registeredVoter: form.registeredVoter
            }

            this.submitted = true;

            let input = grapher.inputify(data)
            let response = await grapher.request(`
            mutation createSignature {
                createSignature(input: ${input}){
                    name
                    address
                }
            }
            `)

            window.location.href = '/thanks-for-signing-up'
        }
    },
    components: {
        colored,
        card,
        formInput,
        vueSignaturePad,
        buttonround,
        checkbox,
        VueGoogleAutocomplete,
        progressBar
    }
};
</script>
<style lang="stylus" scoped>
@import '~stylus/variables.styl'

.button {
    display: flex
    cursor: pointer
    font-weight: bold
    color: $theme1
    text-align: center
}

.top-input {
    padding: 8px
    font-size: 0.9em
    font-weight: bold
}

.padding-top-desktop {
    @media (min-width: $tablet) {
        padding-top: 50px
    }
}

.error {
    color: #a22
}

.error {
    font-size: 12px
    padding-left: 10px
    color: #d22
    padding-bottom: 5px
}
</style>
<template>
    <focused>
        <template slot="title">Login</template>
        <template slot="content">
            <hero class="padding-small focused">
                <div class="inner-hero">
                    <div class="flex-center-all">
                        <h1 class="large-text align-center thin margin-top-bottom-large">
                            <span class="inline-block">One Account.</span> <span class="inline-block">All of Arkovia</span>
                        </h1>

                        <card class="flex-center-all medium padding-none">
                            <div class="gradient-top">
                                <img class="logo" src="\images\arkovia.png" alt="Arkovia Logo">
                                <div class="logo-text">myArk</div>
                            </div>

                            <div class="inner-card flex-column max-350">

                                <h2 class="align-center">Sign Up</h2>
                                
                                <div v-if="errors" >
                                    <div class="error align-center" v-for="error in errors" :key="error.message">
                                        <p>{{ error.message }}</p>
                                    </div>
                                </div>
                                

                                <formInput
                                    :vmodel.sync="form.username"
                                    placeholder="Username"
                                    autocomplete="username"
                                    :v="$v.form.username"
                                    :error="this.$v.form.username.$error ? 'You must enter a username' : undefined"
                                />

                                <formInput
                                    :vmodel.sync="form.email"
                                    placeholder="Email"
                                    autocomplete="email"
                                    :v="$v.form.email"
                                    :error="this.$v.form.email.$error ? 'You must enter an email' : undefined"
                                />

                                <formInput
                                    :vmodel.sync="form.firstName"
                                    placeholder="First Name"
                                    autocomplete="given-name"
                                    :v="$v.form.firstName"
                                    :error="this.$v.form.firstName.$error ? 'You must enter a first name' : undefined"
                                />

                                <formInput
                                    :vmodel.sync="form.lastName"
                                    placeholder="Last Name"
                                    autocomplete="family-name"
                                    :v="$v.form.lastName"
                                    :error="this.$v.form.lastName.$error ? 'You must enter a last name' : undefined"
                                />

                                <formInput
                                    type="password"
                                    :vmodel.sync="form.password"
                                    placeholder="Password"
                                    autocomplete="password"
                                    :v="$v.form.password"
                                    :error="this.$v.form.password.$error ? 'You must enter your password' : undefined"
                                />

                                <div class="margin-top-bottom align-center">
                                    <button-round :locked="submitted" @click.native="signIn()" class="margin">Sign Up</button-round>
                                </div>

                                <p class="small-text align-center">
                                    Already have an account? <a href="/sign-in" class="bold">Sign In.</a>
                                </p>
                                
                            </div>
                        </card>
                    </div>
                </div>
            </hero>
        </template>
    </focused>
</template>
<script>
import focused from "vue/layouts/focused.vue"
import buttonspecial from "vue/controls/button-special.vue"
import buttonround from "vue/controls/button-round.vue"
import hero from "vue/layouts/hero.vue"
import card from "vue/components/card.vue"
import { validationMixin } from "vuelidate"
import { required } from "vuelidate/lib/validators"
import formInput from "vue/controls/input.vue"
import grapher from "utils/grapher"

function setCookie(name, value){
    document.cookie = `${name}=${value};path=/;`
}

export default {
    mixins: [validationMixin],
    data() {
        return {
            form: {
                firstName: '',
                lastName: '',
                username: '',
                email: '',
                password: ''
            },
            errors: undefined,
            submitted: false
        }
    },
    validations: {
        form: {
            firstName: {
                required
            },
            lastName: {
                required
            },
            username: {
                required
            },
            email: {
                required
            },
            password: {
                required
            }
        }
    },
    methods: {
        async signIn(){
            if(this.submitted === true) return
            this.submitted = true
            this.error = undefined

            this.$v.$touch()

            if(this.$v.$error) {
                this.submitted = false
                return
            }

            let input = grapher.inputify(this.form)

            let request = await grapher.request(`
            mutation {
                createUser(input: ${input})
            }
            `)

            if(request.errors){
                this.errors = request.errors
                console.log(request.errors)
            }else if(request.data){
                let token = request.data.createUser
                if(token){
                    setCookie('token', token)
                    window.location.href = '/app'
                    return
                }
            }

            this.submitted = false

            return
        }
    },
    components: {
        hero,
        focused,
        card,
        formInput,
        "button-round": buttonround,
        "button-special": buttonspecial,
    }
}
</script>
<style lang="stylus">

.focused {
    min-height 100%
    display flex
    align-items center
    justify-content center
}

</style>
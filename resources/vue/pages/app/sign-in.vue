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

                            <form class="inner-card flex-column max-350">

                                <h2 class="align-center">Sign In</h2>
                                <div v-if="errors" >
                                    <div class="error align-center" v-for="error in errors" :key="error.message">
                                        <p>{{ error.message }}</p>
                                    </div>
                                </div>

                                <formInput
                                    :vmodel.sync="form.user"
                                    placeholder="Username or Email"
                                    autocomplete="username"
                                    :v="$v.form.user"
                                    :error="this.$v.form.user.$error ? 'You must enter a username or email' : undefined"
                                    undertext="Enter username or email"
                                />

                                <formInput
                                    type="password"
                                    :vmodel.sync="form.password"
                                    placeholder="Password"
                                    autocomplete="password"
                                    undertext="Enter password"
                                    :v="$v.form.password"
                                    :error="this.$v.form.password.$error ? 'You must enter your password' : undefined"
                                />

                                <div class="margin-top-bottom align-center">
                                    <button-round :locked="submitted" @click.native="signIn()" class="margin">Sign In</button-round>
                                </div>

                                <p class="small-text align-center">
                                    <a href="#" class="bold">Forgot login details?</a>
                                </p>
                                <p class="small-text align-center">
                                    Don't have an account? <a href="/sign-up" class="bold">Sign up now.</a>
                                </p>
                            </form>
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
import { inputify, gqlreq, setCookie } from "utils/grapher"

export default {
    mixins: [validationMixin],
    async serverPrefetch(){
        this.domain = this.$ssrContext.ctx.state.domain
    },
    data() {
        return {
            form: {
                user: "",
                password: ""
            },
            errors: null,
            submitted: false,
            domain: null
        }
    },
    validations: {
        form: {
            user: {
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
            this.errors = null

            this.$v.$touch()

            if(this.$v.$error) {
                this.submitted = false
                return
            }

            let { errors, data } = await gqlreq(`
            mutation {
                loginUser(input: ${inputify(this.form)})
            }
            `, { domain: this.domain})

            if(errors){
                this.errors = errors
                console.log(errors)
            }else if(data){
                let token = data.loginUser
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
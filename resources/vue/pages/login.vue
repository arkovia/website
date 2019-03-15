<template>
    <parent>
        <template slot="title">Members</template>
        <template slot="description">Test</template>
        <template slot="content">
            <hero class="padding-small">
                <div class="flex-center">
                    <card class="flex-center medium">
                        <div class="flex-column">
                            <h1>Members Area Login</h1>

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
                                :error="this.$v.form.password.$error ? 'You must enter your full name' : undefined"
                            />

                            <div class="margin-top-bottom align-center">
                                <button-round :locked="submitted" @click.native="signIn()" class="margin">Sign In</button-round>
                            </div>
                            
                        </div>
                    </card>
                </div>
            </hero>
        </template>
    </parent>
</template>
<script>
import parent from "vue/layouts/parent.vue"
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
                user: "",
                password: ""
            },
            submitted: false
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

            this.$v.$touch()

            if(this.$v.$error) {
                this.submitted = false
                return
            }

            let input = grapher.inputify(this.form)

            let request = await grapher.request(`
            mutation {
                loginUser(input: ${input})
            }
            `)

            console.log(request.errors)

            if(request.errors){
                this.errors = request.errors
            }else if(request.data){
                let token = request.data.loginUser
                if(token){
                    setCookie('token', token)
                    window.location.href = '/members'
                    return
                }
            }

            this.submitted = false

            return
        }
    },
    components: {
        hero,
        parent,
        card,
        formInput,
        "button-round": buttonround,
        "button-special": buttonspecial,
    }
}
</script>
<style lang="stylus">
</style>
<template>
    <parent>
        <template slot="title">Members</template>
        <template slot="description">Test</template>
        <template slot="content">
            <hero class="padding-small">
                <div class="flex-center">
                    <card class="flex-center medium">
                        <h1>Members Area</h1>
                        <div>
                            <button-round href="/supporter-signup" class="margin trans-color">Sign In</button-round>
                            <button-round href="/supporter-signup" class="margin">Sign Up</button-round>
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

export default {
    data(){
        return {
            msg: "Slashed"
        }
    },
    components: {
        hero,
        parent,
        card,
        "button-round": buttonround,
        "button-special": buttonspecial,
    }
}
</script>
<style lang="stylus">

</style>
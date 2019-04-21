<template>
    <app>
        <template slot="title">myArk</template>
        <template slot="content">
            <hero>
                <div class="inner-hero dark">
                    <h1>Hello {{ me.firstName }} </h1>
                </div>
            </hero>
        </template>
    </app>
</template>
<script>
import app from "vue/layouts/app.vue"
import grapher from "utils/grapher"
import hero from "vue/layouts/hero.vue"

export default {
    computed: {
        me(){
            return this.$store.state.me
        }
    },
    components: {
        app,
        hero
    }
}
</script>

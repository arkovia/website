<template>
    <app>
        <template slot="title">myArk</template>
        <template slot="content">
            <div class="app-page-header">
                <h1>Hello {{ $state.me.firstName }} </h1>
            </div>
            <hero class="padding-tiny">
                <div class="inner-hero">
                    <h3 class="align-center"><strong>We're updating myArk, please be patient as updates are rolled out</strong></h3>
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
    components: {
        app,
        hero
    }
}
</script>
<style lang="stylus" scoped>

.app-page-header{
    padding: 25px
    display flex
    justify-content center
    align-items center
    background: #091122
    color white
}

</style>

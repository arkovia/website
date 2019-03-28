<template>
    <parent>
        <template slot="title">Shop</template>
        <template slot="description">The offical store of Arkovia</template>
        <template slot="content">
            <hero class="padding-small dark-background">
                <div class="inner-hero align-center">
                    <h1 class="large-title">Shop</h1>
                    <div class="sub-title">The Official Shop of the Government of Arkovia.</div>
                </div>
            </hero>
            <div>
                <h2 class="inner-hero">Arkovia Flag Pin – $10</h2>
                <h2 class="inner-hero">Arkovia Flag – $30</h2>
                <h2>1 Plot of Novia (30 metres by 30 metres) – $2,000</h2>
            </div>
        </template>
    </parent>
</template>

<script>
import parent from "vue/layouts/parent.vue"
import hero from "vue/layouts/hero.vue"
import boxcard from "vue/components/box-card.vue"

export default {
    components: {
        hero,
        parent,
        boxcard
    },
}
</script>

<style lang="stylus" scoped>

.large-title{
    font-size 4em
}

.sub-title{
    font-size 1.5em
}

.box-card-image {
    max-height: 55px
    max-width: 55px
    height 100%;
    margin-right: 15px
}

.margin-bottom{
    margin-bottom: 5px
}

.box-text{
    margin 10px 0
}

.dark-background {
    background #234
    color white
}

</style>
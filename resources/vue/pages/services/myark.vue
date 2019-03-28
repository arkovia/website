<template>
    <parent>
        <template slot="title">Business</template>
        <template slot="description">Interested in starting a business based in Arkovia? Learn more here</template>
        <template slot="content">
            <hero class="padding-medium myark-color">
                <div class="inner-hero align-center shadow">
                    <link href="https://fonts.googleapis.com/css?family=Ubuntu:400" rel="stylesheet">
                    <h1 class="large-title">myArk</h1>
                    <div class="sub-title">One Account. All of Arkovia.</div>
                    <br>
                    <roundButton href="/sign-up" class="trans-white">Sign Up</roundButton>
                </div>
            </hero>
            <hero>
                <div class="inner-hero page larger-text">
                    <h2 class="inner-hero align-center">What is myArk?</h2>
                    <p>
                        myArk is Arkovia's online digital platform where you can access government services. Anybody may register for a myArk account.
                    </p>
                    <p>
                        You'll need to set up your myArk account before becoming a citizen, opening a bank account, or setting up a business
                    </p>
                </div>
            </hero>
        </template>
    </parent>
</template>

<script>
import parent from "vue/layouts/parent.vue"
import hero from "vue/layouts/hero.vue"
import roundButton from "vue/controls/button-round.vue"

export default {
    components: {
        hero,
        parent,
        roundButton
    },
}
</script>

<style lang="stylus" scoped>
@import "~stylus/variables"

.large-title{
    font-size 4.5em
    font-family: 'Ubuntu', 'Lato'
}

.myark-color{
    color: white
    background: linear-gradient(90deg, #1b7d6c, #1b4a7b, #3f0e7b)
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
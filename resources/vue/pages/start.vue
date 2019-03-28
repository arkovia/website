<template>
    <parent>
        <template slot="title">Start Arkovia</template>
        <template slot="description">Interested in starting Arkovia? Learn more here</template>
        <template slot="content">
            <hero class="padding-small dark-background">
                <div class="inner-hero align-center">
                    <h1 class="large-title">Start Now</h1>
                    <div class="sub-title">Interested in starting your life in Arkovia?</div>
                </div>
                <div class="inner-hero padding-small">
                    <div class='flex flex-center wrap row'>
                        <boxcard href="/learn">
                            <div class="row margin-bottom">
                                <img class="box-card-image" src="/images/start/learn.png">
                                <h2 class="bold">Learn</h2>
                            </div>
                            <div class="box-text">
                                Learn about Arkovia, our vision, our government, and everything you need to know about our nation.
                            </div>
                        </boxcard>
                        <boxcard href="/services/myark">
                            <div class="row margin-bottom">
                                <img class="box-card-image" src="/images/start/myark.png">
                                <h2 class="bold">Register your myArk Account</h2>
                            </div>
                            <div class="box-text">
                                Register your myArk account, which can be used to apply for citizenship, open a bank account and much more.
                            </div>
                        </boxcard>
                        <boxcard href="/services/cinvir">
                            <div class="row margin-bottom">
                                <img class="box-card-image" src="/images/start/cinvir.png">
                                <h2 class="bold">Apply for citizenship</h2>
                            </div>
                            <div class="box-text">
                                Apply for citizenship in Arkovia, and get the full benefits of being a citizen. Simpler registration, limited time only.
                            </div>
                        </boxcard>
                        <boxcard href="/services/arkbank">
                            <div class="row margin-bottom">
                                <img class="box-card-image" src="/images/start/arkbank.png">
                                <h2 class="bold">Open your ArkBank account</h2>
                            </div>
                            <div class="box-text">
                                Register your bank account with ArkBank, transfer money between accounts, get loans or buy land.
                            </div>
                        </boxcard>
                        <boxcard href="/services/jobs">
                            <div class="row margin-bottom">
                                <img class="box-card-image" src="/images/start/jobs.png">
                                <h2 class="bold">Start your career</h2>
                            </div>
                            <div class="box-text">
                                As an advancing nation, we have hundreds of jobs available, including high-ranking positions.
                            </div>
                        </boxcard>
                        <boxcard href="/services/business">
                            <div class="row margin-bottom">
                                <img class="box-card-image" src="/images/start/business.png">
                                <h2 class="bold">Start your business</h2>
                            </div>
                            <div class="box-text">
                                Register your business, learn how to run a successful business in Arkovia and hire citizens.
                            </div>
                        </boxcard>
                    </div>
                </div>
            </hero>
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
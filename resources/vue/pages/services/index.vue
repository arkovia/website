<template>
    <parent>
        <template slot="title">Services</template>
        <template slot="description">Interested in starting Arkovia? Learn more here</template>
        <template slot="content">
            <hero class="padding-small dark-background">
                <div class="inner-hero align-center">
                    <h1 class="large-title">Government Services</h1>
                    <div class="sub-title">Services provided by the government of Arkovia.</div>
                </div>

                <div class="inner-hero padding-small">
                    <div class='flex flex-center wrap row'>
                        <boxcard href="/services/myark">
                            <div class="row margin-bottom">
                                <img class="box-card-image" style="stoke: blue; fill:red;" src="/images/services/myark.svg">
                                <h2 class="bold">myArk EGI</h2>
                            </div>
                            <div class="box-text">
                                Register your myArk account, which can be used to apply for citizenship, open a bank account and much more.
                            </div>
                        </boxcard>

                        <boxcard href="/services/arkbank">
                            <div class="row margin-bottom">
                                <img class="box-card-image" src="/images/services/arkbank.svg">
                                <h2 class="bold">ArkBank EGI</h2>
                            </div>
                            <div class="box-text">
                                Register your bank account with ArkBank, transfer money between accounts, get loans or buy land.
                            </div>
                        </boxcard>

                        <boxcard href="/services/cinvir">
                            <div class="row margin-bottom">
                                <img class="box-card-image" src="/images/services/cinvir.png">
                                <h2 class="bold">Cinvir EGI</h2>
                            </div>
                            <div class="box-text">
                                Arkovia's Citizenship, Immigration, Naturalisation, Visa, Integration and Refuge EGI
                            </div>
                        </boxcard>

                        <boxcard href="/services/business">
                            <div class="row margin-bottom">
                                <img class="box-card-image" src="/images/services/business.png">
                                <h2 class="bold">Business EGI</h2>
                            </div>
                            <div class="box-text">
                                Register your business, learn how to run a successful business in Arkovia and hire citizens.
                            </div>
                        </boxcard>

                        <boxcard href="/services/health">
                            <div class="row margin-bottom">
                                <img class="box-card-image" src="/images/services/health.png">
                                <h2 class="bold">Health EGI</h2>
                            </div>
                            <div class="box-text">
                                Arkovia's Health EGI, coming soon!
                            </div>
                        </boxcard>

                        <boxcard href="/services/jobs">
                            <div class="row margin-bottom">
                                <img class="box-card-image" src="/images/services/jobs.png">
                                <h2 class="bold">Jobs EGI</h2>
                            </div>
                            <div class="box-text">
                                As an advancing nation, we have hundreds of jobs available, including high-ranking positions.
                            </div>
                        </boxcard>

                        <boxcard href="/services/licensing">
                            <div class="row margin-bottom">
                                <img class="box-card-image" src="/images/services/licensing.png">
                                <h2 class="bold">Licensing EGI</h2>
                            </div>
                            <div class="box-text">
                                Register your business, learn how to run a successful business in Arkovia and hire citizens.
                            </div>
                        </boxcard>
                        <boxcard href="/services/education">
                            <div class="row margin-bottom">
                                <img class="box-card-image" src="/images/services/education.png">
                                <h2 class="bold">Education EGI</h2>
                            </div>
                            <div class="box-text">
                                See how Arkovia's education system is unlike any other nations
                            </div>
                        </boxcard>
                        <boxcard href="/services/tourism">
                            <div class="row margin-bottom">
                                <img class="box-card-image" src="/images/services/tourism.png">
                                <h2 class="bold">Tourism EGI</h2>
                            </div>
                            <div class="box-text">
                                Register your business, learn how to run a successful business in Arkovia and hire citizens.
                            </div>
                        </boxcard>
                        <boxcard href="/services/tax">
                            <div class="row margin-bottom">
                                <img class="box-card-image" src="/images/services/tax.png">
                                <h2 class="bold">Tax EGI</h2>
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
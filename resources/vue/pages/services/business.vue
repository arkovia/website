<template>
    <parent>
        <template slot="title">Business</template>
        <template slot="description">Interested in starting a business based in Arkovia? Learn more here</template>
        <template slot="content">
            <hero class="padding-small dark-background">
                <div class="inner-hero align-center">
                    <h1 class="large-title">Business EGI</h1>
                    <div class="sub-title">Interested in starting a business based in Arkovia?</div>
                </div>
            </hero>
            <hero>
                <div class="inner-hero page larger-text">
                    <h2 class="inner-hero align-center">BusinessPortal</h2>
                    <ul>
                        <li>Create a business based in Arkovia</li>
                        <li>Learn with free classes how to create a successful business</li>
                        <li>Read and watch guides on how to navigate the laws regarding Arkovian businesses</li>
                        <li>Use LawNavigate, a tool from the Information EGI to read all the laws, word for word, that apply to your business</li>
                        <li>Get legal advice to help you learn the business laws in your country to simplify the legal experience</li>
                        <li>Hire citizens in Arkovia and around the world</li>
                        <li>Sign legally binding contracts</li>
                        <li>Create business partnerships with other users of Business EGI BusinessPortal</li>
                        <li>Decrease the complexity of the <a href="cinvir">Arkovian immigration system</a>, and move to Arkovia faster</li>
                        <strong>All for free!</strong>
                    </ul>
                    <roundButton href="/sign-in">Sign In</roundButton>
                </div>
                <div class="inner-hero page larger-text">
                    <h2 class="inner-hero align-center">GrantHunt</h2>
                    <p>Search for Business grants offered by ArkBank, the Development EGI, and NGOs for free</p>
                    <roundButton href="/sign-in">Sign In</roundButton>
                </div>
                <div class="inner-hero page larger-text">
                    <h2 class="inner-hero align-center">Lookup</h2>
                    <p>Search for businesses incorporated in Arkovia and companies doing business in Arkovia.</p>
                    <roundButton href="about:blank">Lookup</roundButton>
                </div>
            </hero>
        </template>
    </parent>
</template>

<script>
import roundButton from "vue/controls/button-round.vue"
import parent from "vue/layouts/parent.vue"
import hero from "vue/layouts/hero.vue"
import boxcard from "vue/components/box-card.vue"

export default {
    components: {
        hero,
        parent,
        boxcard,
        roundButton
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
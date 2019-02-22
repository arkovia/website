<template>
    <parent>
        <template slot="title">Home</template>
        <template slot="description">Test</template>
        <template slot="content">
            <hero img="/images/home-cover.jpg" class="padding-large img">
                <div class="flex-center align-center">
                    <div class="huge-title shadow">
                        the viable alternative
                    </div>
                    <progressBar :current="800 + signatureCount" :max="1000"/>
                    <p>
                        We need <strong>{{(200 - signatureCount) > 0 ? 200 - signatureCount : 0}} more signatures</strong> from enrolled voters to register our party.
                    </p>
                    <div style="justify-content: center; font-size: 1.3em; padding-bottom: 10px; color: #fff; display: flex; font-weight: 800">
                        <div style="color: #5f5; padding-right: 5px">+ {{ signaturesPastWeek }}</div>
                        <div>this week</div>
                    </div>
                    <button-special href="/supporter-signup" class="margin">Sign Up</button-special>
                </div>
            </hero>
            <hero class="light padding-small">
                <div class="flex-center align-center">
                    <h2>Website coming soon</h2>
                    <div>Sign up in the meanwhile</div>
                </div>
            </hero>
        </template>
    </parent>
</template>
<script>
import parent from "vue/layouts/parent.vue"
import buttonspecial from "vue/controls/button-special.vue"
import hero from "vue/layouts/hero.vue"
import progressBar from "vue/components/progressBar.vue"

export default {
    data(){
        return {
            msg: "Slashed"
        }
    },
    components: {
        hero,
        parent,
        "button-special": buttonspecial,
        progressBar
    }
}
</script>
<style lang="stylus">

</style>
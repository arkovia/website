<template>
    <parent>
        <template slot="title">Help Build Arkovia</template>
        <template slot="description">A new project nation located on the continent of Australia</template>
        <template slot="content">
            <hero img="/images/home-cover.png" class="padding-medium img">
                <div class="inner-hero">
                    <div class="flex-center flex-mobile-row">
                        <div>
                            <div class="shadow">
                                <div class="huge-title">Start Arkovia</div>
                                <p>Welcome to Arkovia, a new project nation located on the continent of Australia.</p>
                                <p>Arkovia is in the process of establishing a new and autonomous government, city, community, country, society and nation.</p>
                                <p><strong>Our aspirations are to:</strong></p>
                                <ul>
                                    <li>Create a pragmatic government, led by citizens, for citizens.</li>
                                    <li>Allow citizens to pursue their life goals, aided by our government.</li>
                                    <li>Focus on innovation of infrastructure, to acheive truely high living standards.</li>
                                    <li>Modernize systems such as banking, education, governance and much more.</li>
                                    <li>Create a safe and free society, with full protection over free speech, and other rights.</li>
                                </ul>
                                <p>We are looking for risk-taking, intuitive, smart and passionate citizens who want to create a new life in Arkovia. Citizens can help the nation build through muscle, intellect, enterprise, finance or networking</p>
                            </div>
                            <div>
                                <buttonspecial href="/start" class="margin">Start Helping</buttonspecial>
                            </div>
                        </div>
                        <div class="flex-center-all">
                            <span class="shadow"><span class="huge-title">{{ citizenCount }}</span> citizens</span>
                            <progressBar :current="citizenCount" :max="1000"/>
                            <p class="shadow">
                                We need <strong>{{(1000 - citizenCount) > 0 ? 1000 - citizenCount : 0}} more citizens</strong> to hit our milestone.
                            </p>
                            <div style="justify-content: center; font-size: 1.3em; padding-bottom: 10px; color: #fff; display: flex; font-weight: 800">
                                <div style="color: #5f5; padding-right: 5px">+ {{ newCitizensPastWeek }}</div>
                                <div>this week</div>
                            </div>
                        </div>
                    </div>
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
import grapher from "utils/grapher"

export default {
    async asyncData() {
        return {
            citizenCount: 181,
            newCitizensPastWeek: 8
        }
        
        let { citizenCount, newCitizensPastWeek } = (await grapher.request(`{
            citizenCount
            newCitizensPastWeek
        }`)).data

        return {
            citzenCount,
            newCitizensPastWeek
        }
    },
    components: {
        hero,
        parent,
        buttonspecial,
        progressBar
    }
}
</script>
<style lang="stylus">
</style>
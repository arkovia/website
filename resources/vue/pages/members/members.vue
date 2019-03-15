<template>
    <members>
        <template slot="title">Members</template>
        <template slot="description">Signatures Area - SA's Newest political party</template>
        <template slot="content">
            <div v-for="signature in signatures" :key="signature">
                <img style="height: 50px" :src="`${signature.signature}`" alt="">
            </div>
        </template>
    </members>
</template>
<script>
import members from "vue/layouts/members.vue"

export default {
    components: {
        members
    }
}
</script>

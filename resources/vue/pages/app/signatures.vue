<template>
    <members>
        <template slot="title">Signatures</template>
        <template slot="description">Signatures Area - SA's Newest political party</template>
        <template slot="content">
            <div class="signatures">
                <div v-for="signature in signatures" :key="signature.signature" class="signup">
                    <div class="text">
                        <span class="name">{{ signature.name }}</span>
                        <span class="address">{{ signature.address }}</span>
                        <span class="registered" :class="{ yes: signature.registeredVoter }">{{ signature.registeredVoter ? 'Registered' : 'Not Registered' }}</span>
                    </div>
                    <div class="signature">
                        <img style="height: 50px" :src="`${signature.signature}`" alt="">
                    </div>
                </div>
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
<style lang="stylus" scoped>

.signatures{
    background: white;
    padding 20px
    margin: 20px
    max-width 600px
    border-radius 4px
    box-shadow 0 2px 8px 0 rgba(0,0,0,0.2)
    > .signup {
        border-bottom 1px solid #ddd
        &:last-child {
            border-bottom none
        }
    }
}

.signup{
    padding 15px
    display: flex;
    .signature{
        margin-left auto
    }
}
.text{
    display: flex
    flex-direction column
    .name{
        font-size 1.3em
    }
    .address {
        
    }
    .registered {
        color: #d22
        &.yes{
            color: #1c1
        }
    }
}

</style>


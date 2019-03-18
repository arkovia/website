<template>
    <header>
        <div class="top-header">
            <div class="inner-header">
                <a href="/" class="header-logo">
                    <img class="logo" src="\images\arkovia.png" alt="Arkovia Logo">
                    <div class="logo-text">Arkovia</div>
                </a>
                <div class="end margin-sides row flex-center">
                    <roundbutton href="/members" class="trans-white margin-sides">Sign In</roundbutton>
                    <roundbutton href="/support" class="white">Start</roundbutton>
                </div>
            </div>
        </div>
        <div class="bottom-header">
            <div class="inner-header flex-column-tablet">
                <div class="flex-row-tablet end">
                    <nav-link class="menu" @click.native="toggleMenu"><i class="material-icons">menu</i></nav-link>
                </div>
                <div class="menu-container">
                    <div :class="{ opened: menuToggle}" class="nav-items">
                        <nav-link href="/">Home</nav-link>
                        <nav-link href="/party">Information</nav-link>
                        <nav-link href="/plan">Our Plan</nav-link>
                        <nav-link href="/shop">Services</nav-link>
                        <nav-link href="/news">News</nav-link>
                        <nav-link href="/news">Shop</nav-link>
                    </div>
                </div>
            </div>
        </div>
    </header>
</template>
<script>
import navlink from "vue/layouts/includes/nav-link.vue";
import roundbutton from "vue/controls/button-round.vue"

export default {
    components: {
        "nav-link": navlink,
        roundbutton
    },
    data(){
        return {
            menuToggle: false
        }
    },
    methods:{
        toggleMenu(){
            this.menuToggle = !this.menuToggle
        }
    }
}
</script>

<style lang="stylus" scoped>
@import '~stylus/variables'

header {
    display: flex
    flex-direction column
    background: white
    box-shadow 0 0px 10px 2px rgba(0,0,0,0.2)
    position relative
}
.top-header {
    background: linear-gradient(90deg, #04899F, #1EB481)
}

.bottom-header {
    background: white
}

.margin-sides{
    > * {
        margin-left: 2px
        margin-right 2px;
        &:first-child{
            margin-left: 4px;
        }
        &:last-child {
            margin-right: 4px;
        }
    }
}

.flex-column-tablet{
    display flex
    @media(max-width $tablet){
        flex-direction column
    }
}

.flex-row-tablet{
    display flex
    flex-direction row
}

.menu-container{
    position relative
    z-index 20
}

.nav-items{
    display flex
    position relative
    @media(max-width $tablet){
        display none
        &.opened{
            display flex
            flex-direction column
            position absolute
            width: 100%
            background: white
            border-top: 1px solid #dedede
        }
    }
}

.inner-header{
    margin: auto 
    max-width $desktop
    display flex
}

.header-logo{
    display flex
    align-items: center
    justify-content center
    color white
    .logo-text{
        font-size 2em
        font-weight 700
        @media(max-width $smallphone){
            font-size: 1.3em
        }
    }
    .logo{
        width 44px
        padding: 5px 2px
    }
}

i.material-icons{
    font-size 1em
}

</style>


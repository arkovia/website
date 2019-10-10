<template>
    <footer>
        <div class="footer-container">
            <div class="mid-footer">
                <div class="motto">The Innovation Nation</div>
                <div class="social-links">
                    <a href="https://facebook.com/arkovia" class="social-link"><img src="/images/facebook.png" alt="Arkovia Facebook"></a>
                    <a href="https://twitter.com/arkovia" class="social-link"><img src="/images/twitter.png" alt="Arkovia Twitter"></a>
                    <a href="https://instagram.com/arkovia" class="social-link"><img src="/images/instagram.png" alt="Arkovia Instagram"></a>
                </div>
            </div>
            <div class="bottom-footer">
                <div class="inner-header flex column">
                    <a href="/" class="header-logo">
                        <img class="logo" src="/images/arkovia.png" alt="Arkovia Logo">
                    </a>
                    <div class="government-text">The Official Government of Arkovia</div>
                    <a class="link govenrment-text" href="https://promatia.com">This website will soon be merged into Promatia</a>
                </div>
            </div>
        </div>
    </footer>
</template>
<script>

export default {

}
</script>

<style lang="stylus" scoped>
@import '~stylus/variables'

footer {
    display block
    background: white
    position relative
    color #fff
}

.motto {
    font-size 1.3em
    font-weight 200
    font-style italic
}

.social-links{
    display flex
    justify-content center
    align-items center
}

.social-link {
    width 45px
    height 45px;
    display flex
    justify-content center
    align-items center
    margin 5px
    img{
        max-height 30px
    }
}

.footer-container {
    display flex
    flex-direction column
}

.mid-footer {
    text-align center
    background: #161A21
    padding 40px
}

.bottom-footer {
    background: #0E1014
    padding 20px
}

.header-logo{
    display flex
    align-items: center
    justify-content center
    color white
    .logo{
        width 44px
        padding: 5px 2px
    }
}

.government-text{
    font-size 13px
    font-style italic
    text-align center
}

i.material-icons{
    font-size 1em
}

.link
    padding 10px
    display block
    font-size 1.6em
    text-align center
</style>
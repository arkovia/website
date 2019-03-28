<template>
    <servue>
        <template slot="content">
            <slot name="content"/>
        </template>
        <template slot="head">
            <title>{{ title }}</title>
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <meta name="theme-color" content="#009CB5">
            <slot name="description"/>
            <link href="https://fonts.googleapis.com/css?family=Roboto:300,300i,400,400i,500,700" rel="stylesheet">
            <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
            <script>
                (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                })(window,document,'script','dataLayer','GTM-NNVCBCD');
            </script>
            <script>
                !function(f,b,e,v,n,t,s)
                {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
                n.callMethod.apply(n,arguments):n.queue.push(arguments)};
                if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
                n.queue=[];t=b.createElement(e);t.async=!0;
                t.src=v;s=b.getElementsByTagName(e)[0];
                s.parentNode.insertBefore(t,s)}(window, document,'script',
                'https://connect.facebook.net/en_US/fbevents.js');
                fbq('init', '304188100242367');
                fbq('track', 'PageView');
            </script>
            <link rel="apple-touch-icon-precomposed" sizes="57x57" href="/images/favicons/apple-touch-icon-57x57.png" />
            <link rel="apple-touch-icon-precomposed" sizes="114x114" href="/images/favicons/apple-touch-icon-114x114.png" />
            <link rel="apple-touch-icon-precomposed" sizes="72x72" href="/images/favicons/apple-touch-icon-72x72.png" />
            <link rel="apple-touch-icon-precomposed" sizes="144x144" href="/images/favicons/apple-touch-icon-144x144.png" />
            <link rel="apple-touch-icon-precomposed" sizes="60x60" href="/images/favicons/apple-touch-icon-60x60.png" />
            <link rel="apple-touch-icon-precomposed" sizes="120x120" href="/images/favicons/apple-touch-icon-120x120.png" />
            <link rel="apple-touch-icon-precomposed" sizes="76x76" href="/images/favicons/apple-touch-icon-76x76.png" />
            <link rel="apple-touch-icon-precomposed" sizes="152x152" href="/images/favicons/apple-touch-icon-152x152.png" />
            <link rel="icon" type="image/png" href="/images/favicons/favicon-196x196.png" sizes="196x196" />
            <link rel="icon" type="image/png" href="/images/favicons/favicon-96x96.png" sizes="96x96" />
            <link rel="icon" type="image/png" href="/images/favicons/favicon-32x32.png" sizes="32x32" />
            <link rel="icon" type="image/png" href="/images/favicons/favicon-16x16.png" sizes="16x16" />
            <link rel="icon" type="image/png" href="/images/favicons/favicon-128.png" sizes="128x128" />
            <meta name="application-name" content="Arkovia"/>
            <meta name="msapplication-TileColor" content="#FFFFFF" />
            <meta name="msapplication-TileImage" content="/images/favicons/mstile-144x144.png" />
            <meta name="msapplication-square70x70logo" content="/images/favicons/mstile-70x70.png" />
            <meta name="msapplication-square150x150logo" content="/images/favicons/mstile-150x150.png" />
            <meta name="msapplication-wide310x150logo" content="/images/favicons/mstile-310x150.png" />
            <meta name="msapplication-square310x310logo" content="/images/favicons/mstile-310x310.png" />
            <link rel="manifest" href="/manifest.json">
            <meta name="msapplication-TileColor" content="#ffffff">
            <meta name="msapplication-TileImage" content="/ms-icon-144x144.png">
            <meta name="theme-color" content="#ffffff">

            <slot name="head"/>
        </template>
    </servue>
</template>
<script>
import servue from "servue.vue";

export default {
    created(){
        if(this.$isServer){
            this.$ssrContext.htmlattr = 'lang="en"'
        }
    },
    components: {
        servue
    },
    computed: {
        title(){
            return this.$slots.title ? this.$slots.title[0].text + ' - Arkovia' : 'Arkovia' 
        }
    }
}
</script>
<style lang="stylus">
@import "../../stylus/app"
</style>
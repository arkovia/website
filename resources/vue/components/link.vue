<template>
    <a :href="href"></a>
</template>

<script>
export default {
    props: ['href']
}
</script>

<style scoped lang="stylus">
@import "~stylus/variables"

a {
    cursor pointer
    color $theme1
}

a[href^="//"]:after, 
a[href^="http://"]:after, 
a[href^="https://"]:after {
    content: url(/images/external.svg);
    margin: 0 0 0 5px;
}

</style>

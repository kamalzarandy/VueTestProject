<template>
    <v-overlay :value="visible || eventVisable">
        <v-progress-circular
                indeterminate
                size="64"
        ></v-progress-circular>
    </v-overlay>
</template>


<script>
    export default {
        name:'customOverlay',
        props: {
            visible: {
                type: Boolean,
                default: false
            },
        },
        data() {
            return {
            }
        },
        computed: {
            eventVisable () {
                return this.$store.getters.getLoadingStatus;
            },
        },
    };

</script>

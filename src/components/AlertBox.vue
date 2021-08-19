<template>
    <v-alert
            :type="errorType"
            v-if=visible
            :v-show=visible
            elevation="22"
            v-model="visible"
    >{{message}}</v-alert>
</template>

<script>
    //This component will generate a uniq alert box and it will used to show the warning, errors, and information to the users
    export default {
    name:'AlertBox',
        computed: {
            // @vuese
            // This function will return the message that will show to the user
            message () {
                return this.$store.getters.message;
            },
            // @vuese
            // This function will return the status of the visibility of the message
            visible () {
                return this.$store.getters.visible;
            },
            // @vuese
            // This function will return the message type it could be  error, info, success, warning
            errorType () {
                return this.$store.getters.errorType;
            },
            // @vuese
            // This function will return the status of the visibility of the message
            showAlert () {
                return this.$store.getters.showAlert;
            }
        },
        methods: {
        }
    };
</script>

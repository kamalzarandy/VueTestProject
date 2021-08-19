<template>
    <v-app id="inspire">
        <v-app-bar app>
            <div class="Header-title">
                {{PageTitle}}
            </div>
            <div class="Header-badge">
                <register-user-badge></register-user-badge>
            </div>
        </v-app-bar>

        <v-navigation-drawer
                color="#f2f2f2"
                permanent
                expand-on-hover
                app
        >
            <v-divider></v-divider>
            <v-list nav dense>
                <v-list-item link href="#">
                    <v-list-item-icon>
                        <v-icon color="white" medium>mdi-microsoft-xbox-controller-menu</v-icon>
                    </v-list-item-icon>
                    <v-list-item-title class="title">{{$parent.$t('global.home')}}</v-list-item-title>
                </v-list-item>
                <register-user-menu></register-user-menu>
            </v-list>
        </v-navigation-drawer>
        <v-main>
            <v-container>
                <alert-box></alert-box>
                <custom-overlay></custom-overlay>

                <router-view />
            </v-container>
        </v-main>
    </v-app>
</template>

<script lang="ts">


</script>

<style lang="scss" scoped>
    .Header-title {
        float: left;
        width: 100%;
    }
    .Header-badge {
        float: right;
    }
</style>

<script>
    import registerUserMenu from "../components/menu/registerUserMenu";
    import registerUserBadge from "../components/menu/registerUserBadge";

    export default {
        computed: {
            PageTitle: function () {
                return this.$route.name;
            }
        },
        components: {
            'register-user-menu' : registerUserMenu,
            'register-user-badge' : registerUserBadge,
        },
    };
</script>

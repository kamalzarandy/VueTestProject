<template right>
    <v-menu class="toolbar-menu-item" offset-y origin="center center" :nudge-bottom="10" transition="scale-transition">
        <template v-slot:activator="{ on }">

        <v-btn icon large  v-on="on"  :ripple="false">
            <v-avatar class="avatar" >
                <img src="https://cdn.vuetifyjs.com/images/lists/2.jpg"/>
            </v-avatar>
        </v-btn>
        </template>
        <v-list>
            <v-list-item
                    v-for="(item,index) in badgetMenuItems"
                    :key="index"
                    :to="!item.href ? { name: item.name } : null"
                    :href="item.href"
                    ripple="ripple"
                    :disabled="item.disabled"
                    :target="item.target"
                    @click="item.click">
                <v-list-item-action v-if="item.icon">
                    <v-icon>{{ item.icon }}</v-icon>
                </v-list-item-action>
                <v-list-item-content>
                    <v-list-item-title>{{ item.title }}</v-list-item-title>
                </v-list-item-content>
            </v-list-item>
        </v-list>
    </v-menu>
</template>

<script>

   import axios from "axios";

   //This component will generate Badge for the register user with it's menu under it
   export default {
        name:'registerUserBadge',
        data() {
            return {
                selectedItem: 1,
                items: [
                    {text: 'Search Currency', icon: 'mdi-clock', link: '/'},
                    {text: 'menue 1', icon: 'mdi-account', link: '/login'},
                    {text: 'menue 2', icon: 'mdi-flag', link: '/register'},
                ],
                badgetMenuItems: [
                    {
                        icon: 'mdi-account-circle',
                        href: '#',
                        title: this.getTitle('global.profile'),
                        click: () => {
                        }
                    },
                    {
                        icon: 'mdi-cog-outline',
                        href: '#',
                        title: this.getTitle('global.settings'),
                        click: () => {
                        }
                    },
                    {
                        icon: 'mdi-logout',
                        href: '#',
                        title: this.getTitle('global.logout'),
                        click: () => {
                            this.$store.dispatch('showDelayedLoading');
                            return this.logOut();
                        }
                    }
                ],
            }
        },
        methods: {
            // @vuese
            // This function will generate the menu title from localization
            // @arg The argument is the name of the localization
            getTitle: function (title) {
                return this.$t(title);
            },
            // @vuese
            // This function will transfer user to other pages when user will click on the menu link
            // @arg The argument is a url to transfer to a page
            transferPage: function (Link) {
                this.$router.push(Link);
            },
            // @vuese
            // This function will logout the user from system and transfer the user to the login page
            logOut: function () {
                axios.get("/logout")
                    .then(response => {
                        this.resposeResult = response;
                        if(this.resposeResult.status != 200 ) {
                            this.$store.dispatch('alertError', this.$t('global.error'));
                            this.$store.dispatch('hideLoading');
                            return false;
                        }
                        if(this.resposeResult.data.status != 200 ) {
                            this.$store.dispatch('alertError',this.resposeResult.data.message+" ("+this.resposeResult.data.status+")");
                            this.$store.dispatch('hideLoading');
                            return false;
                        }
                        this.$store.dispatch('hideLoading');
                        this.$store.dispatch('logoutUser');
                        this.$router.push('/login');

                    })
                    .catch(error => {
                        this.$store.dispatch('alertError', this.$t('global.error')+error.message);
                        this.$store.dispatch('hideLoading');
                        return false;
                    });
            }
        },
    };
</script>
<style>
    .toolbar-menu-item {
        padding-left: 5px;
    }
    .avatar{
        size :42px;
    }
</style>

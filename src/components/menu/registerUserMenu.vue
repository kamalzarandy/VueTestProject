<template>
    <v-list shaped>
        <v-list-item-group
                v-model="selectedItem"
                color="primary"
        >
            <v-list-item
                    v-for="(item, i) in items"
                    :key="i"
                    @click="transferPage(item.link)"
            >
                <v-list-item-icon>
                    <v-icon v-text="item.icon"></v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                    <v-list-item-title v-text="getMenuTitle(item.text)" ></v-list-item-title>
                </v-list-item-content>
            </v-list-item>
        </v-list-item-group>
    </v-list>
</template>

<script>
    //This component will generate our main menu for our registered user
    export default {
        name:'registerUserMenu',
        data() {
            return {
                // this will keep the selected item to show bolded
                selectedItem: 1,
                // This will be the name of the menu items and their link to the target page
                items: [
                    {text: 'global.menuCurrency', icon: 'mdi-clock', link: '/'},
                    {text: 'global.menu1', icon: 'mdi-account', link: '#'},
                    {text: 'global.menu2', icon: 'mdi-flag', link: '#'},
                ],
            }
        },
        computed: {
        },
        methods: {
            // @vuese
            // This function will generate the menu title from localization
            // @arg The argument is the name of the localization
            getMenuTitle: function (title) {
                return this.$t(title);
            },
            // @vuese
            // This function will transfer user to other pages when user will click on the menu link
            // @arg The argument is a url to transfer to a page
            transferPage: function (Link) {
                this.$router.push(Link);
            }
        }
    };
</script>

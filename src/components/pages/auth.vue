<template>
    <v-sheet color="transparent" height="100vh">
        <v-row align="center" class="fill-height" no-gutters>
            <v-col v-if="$vuetify.breakpoint.lgAndUp" cols="12" md="6">
                <v-sheet color="primary darken-2" dark height="100vh" width="100%">
                    <v-container class="justify-center" fill-height>
                        <div class="d-flex align-center flex-column text-center">
                            <h1 class="text-xl-h3 text-md-h4 mt-4">

                            </h1>
                            <h3 class="text-xl-h3 text-md-h4 mt-4">
                                {{this.$t('auth.welcome')}}
                            </h3>

                            <slot name="hero-action" />
                        </div>
                    </v-container>
                </v-sheet>
            </v-col>

            <v-col cols="12" lg="6">
                <v-container>
                    <v-row justify="center">
                        <v-col cols="12" lg="6" md="8" xl="4">

                            <div class="mt-4">
                                <slot name="form" />
                            </div>

                            <div class="my-8">
                                <div class="d-flex align-center">
                                    <v-sheet color="grey lighten-2" height=".5" width="100%" />

                                    <div class="mx-2">{{this.$t('global.or')}}</div>

                                    <v-sheet color="grey lighten-2" height=".5" width="100%" />
                                </div>
                            </div>

                            <div class="text-center">
                                <slot name="addOn" />
                            </div>
                        </v-col>
                    </v-row>
                </v-container>
            </v-col>
        </v-row>
    </v-sheet>
</template>

<script>

    export default {
        data: function () {
            return {
                title: ''
            }
        },
        components: {
        },
    };
</script>

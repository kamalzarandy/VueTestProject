<template>
    <p-auth>
        <template v-slot:form>
            <v-form  ref="form">
                <v-text-field
                        :label="$parent.$t('global.fullName')"
                        prepend-inner-icon="mdi-account-circle-outline"
                        v-model="userInfo.name"
                        required
                />

                <v-text-field
                        :label="$parent.$t('global.email')"
                        prepend-inner-icon="mdi-email-outline"
                        v-model="userInfo.email"
                        required
                        :rules="emailValidation"
                />

                <v-text-field
                        :label="$parent.$t('global.password')"
                        prepend-inner-icon="mdi-lock-outline"
                        v-model="userInfo.password"
                        :rules="passwordValidation"
                        required
                        type="password"
                />
                <v-text-field
                        :label="$parent.$t('global.confirmPassword')"
                        prepend-inner-icon="mdi-lock-outline"
                        v-model="userInfo.confirmedPassword"
                        :rules="passwordValidation"
                        required
                        type="password"
                />
                <br/>
                <br/>
                <v-btn
                        block
                        class="font-weight-bold"
                        color="primary darken-1"
                        large
                        v-on:click="createAccount(userInfo)"
                >
                    {{$parent.$t('auth.creatAccount')}}
                </v-btn>
            </v-form>
        </template>

        <template v-slot:addOn>
                <v-btn class="text-capitalize" depressed large
                       v-on:click="loginForm()"
                >
                    {{$parent.$t('auth.LoginOnthePlatform')}}
                </v-btn>
        </template>
    </p-auth>
</template>

<script>
    import axios from "axios";

    export default {
        data: () => ({
            resposeResult : null,
            valid: true,
            userInfo:{
                email: '',
                password: '',
                confirmedPassword: '',
                name: '',
            },
        }),
        methods: {
            loginForm: function () {
                this.$router.push('/login');
            },
            createAccount: function (userInfo) {
                this.$store.dispatch('showDelayedLoading');
                if(    this.$refs.form.validate() == false ){
                    this.$store.dispatch('alertError', this.$t('global.formValidationError'));
                    this.$store.dispatch('hideLoading');
                    return false;
                }
                if(    userInfo.password != userInfo.confirmedPassword ){
                    this.$store.dispatch('alertError', this.$t('auth.validationPasswordError'));
                    this.$store.dispatch('hideLoading');
                    return false;
                }
                axios.post("/register",  { name: userInfo.name, email: userInfo.email, password : userInfo.password , password_confirmation : userInfo.password })
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
                        this.$store.dispatch('loginUser', { token :this.resposeResult.data.data.token});
                        this.$router.push('/');

                    })
                    .catch(error => {
                        this.$store.dispatch('alertError', this.$t('global.error')+error.message);
                        this.$store.dispatch('hideLoading');
                        return false;
                    });
            },
        },
        components: {
            "p-auth": () => import("@/components/pages/auth")
        },
        computed :{
            emailValidation: function () {
                return [
                    v => !!v || this.$t('auth.validationEmailRequired'),
                    v => /^(([^<>()[\]\\.,;:\s@']+(\.[^<>()\\[\]\\.,;:\s@']+)*)|('.+'))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(v) || this.$t('auth.validationEmailValidEmail'),
                ];
            },
            passwordValidation: function () {
                return [
                    v => !!v || this.$t('auth.validationPasswordRequired'),
                    v => /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/.test(v) || this.$t('auth.validationPasswordValidEmail'),
                ];
            },
        }
    };
</script>

<template>
    <p-auth alert-message="alertMessage">
        <template v-slot:form>
            <v-form ref="form">
                <v-text-field
                        v-model="userInfo.email"
                        :rules="emailValidation"
                        :label="$parent.$t('global.email')"
                        required
                ></v-text-field>

                <v-text-field
                              :label="$parent.$t('global.password')"
                              prepend-inner-icon="mdi-lock-outline"
                              :rules="passwordValidation"
                              required
                              v-model="userInfo.password"
                              type="password"
                />
                <br/>
                <br/>
                <div class="d-flex justify-space-between align-center">
                    <v-btn class="font-weight-bold" color="primary darken-1" large
                           v-on:click="LoginToSystem(userInfo)"
                    >
                        {{$parent.$t('global.login')}}
                    </v-btn>
                </div>
            </v-form>
        </template>

        <template v-slot:addOn>
            <v-btn class="text-capitalize" depressed large
                   v-on:click="register()"
            >
                {{$parent.$t('global.register')}}
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
            },
        }),
        methods: {
            getConst: function (val) {
                return this.$t(val);
            },
            register: function () {
                this.$router.push('/register');
            },
            LoginToSystem: function (userInfo) {
                this.$store.dispatch('showDelayedLoading');
                if(    this.$refs.form.validate() == false ){
                    this.$store.dispatch('alertError', this.$t('global.formValidationError'));
                    this.$store.dispatch('hideLoading');
                    return false;
                }
                axios.post("/login",  { email: userInfo.email, password : userInfo.password })
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

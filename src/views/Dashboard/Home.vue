<template>
    <v-container
            id="user-profile"
            fluid
            tag="section"
    >
        <v-row justify="center">
            <v-col cols="12"  md="8" >
                        <v-toolbar-title class="text-h6 mr-6 hidden-sm-and-down">
                            {{$parent.$t('currencyInfo.choseCurrency')}}
                        </v-toolbar-title>
                        <v-autocomplete
                                v-model="model"
                                :items="items"
                                :loading="isLoading"
                                :search-input.sync="search"
                                chips
                                clearable
                                hide-details
                                hide-selected
                                item-text="value"
                                item-value="name"
                                :label="$parent.$t('currencyInfo.searchForCoin')"
                                solo
                                @change="showItems(model)"
                        >
                            <template v-slot:no-data>
                                <v-list-item>
                                    <v-list-item-title>
                                        {{$parent.$t('currencyInfo.searchForCurrency')}}
                                        <strong> {{$parent.$t('currencyInfo.searchForCurrencyMin3Char')}}</strong>
                                    </v-list-item-title>
                                </v-list-item>
                            </template>
                            <template v-slot:selection="{ attr, on, item, selected }">
                                <v-chip
                                        v-bind="attr"
                                        :input-value="selected"
                                        color="blue-grey"
                                        class="white--text"
                                        v-on="on"
                                >
                                    <v-icon left>
                                        mdi-bitcoin
                                    </v-icon>
                                    <span v-text="item.value"></span>
                                </v-chip>
                            </template>
                            <template v-slot:item="{ item }">
                                <v-list-item-avatar
                                        color="indigo"
                                        class="text-h5 font-weight-light white--text"
                                >
                                    {{ item.value.charAt(0) }}
                                </v-list-item-avatar>
                                <v-list-item-content>
                                    <v-list-item-title v-text="item.value"></v-list-item-title>
                                    <v-list-item-subtitle v-text="item.name"></v-list-item-subtitle>
                                </v-list-item-content>
                                <v-list-item-action>
                                    <v-icon>mdi-bitcoin</v-icon>
                                </v-list-item-action>
                            </template>
                        </v-autocomplete>
            </v-col>
        </v-row>
        <v-row justify="center" class="card-spec" v-if="showCardInfo">
            <v-col cols="12" md="5" >
                <material-card
                        class="v-card-profile"
                        :avatar="currencyInfo.logo_url"
                >
                    <v-card-text class="text-center">
                        <h6 class="display-1 mb-1 grey--text">
                            {{currencyInfo.symbol}}
                        </h6>

                        <h4 class="display-2 font-weight-light mb-4 black--text">
                            {{currencyInfo.name}}
                        </h4>

                        <p class="font-weight-light grey--text">
                            Price : {{currencyInfo.price}}
                        </p>
                        <p class="font-weight-light grey--text">
                            Price Date : {{currencyInfo.price_date}}
                        </p>
                        <p class="font-weight-light grey--text">
                            Status : {{currencyInfo.status}}
                        </p>
                    </v-card-text>
                </material-card>
            </v-col>
        </v-row>
        <v-row justify="center" v-if="showCardInfo">
            <v-col cols="12" md="5" >
                <material-card class="card-spec"  :text="$parent.$t('currencyInfo.market1Day')">
                    <v-card-text class="text-center" v-if="currencyInfo.d1 !=  null">
                        <p class="font-weight-light grey--text">
                            Price change : {{currencyInfo.d1.price_change}}
                        </p>
                        <p class="font-weight-light grey--text">
                            Price change pct : {{currencyInfo.d1.price_change_pct}}
                        </p>
                        <p class="font-weight-light grey--text">
                            Volume : {{currencyInfo.d1.volume}}
                        </p>
                        <p class="font-weight-light grey--text">
                            Volume change : {{currencyInfo.d1.volume_change}}
                        </p>
                        <p class="font-weight-light grey--text">
                            Volume change pct : {{currencyInfo.d1.volume_change_pct}}
                        </p>
                    </v-card-text>
                </material-card>
            </v-col>
            <v-col cols="12" md="5" >
                <material-card class="card-spec"   :text="$parent.$t('currencyInfo.market30Day')">
                    <v-card-text class="text-center" v-if="currencyInfo.d30 !=  null">
                        <p class="font-weight-light grey--text">
                            Price change : {{currencyInfo.d30.price_change}}
                        </p>
                        <p class="font-weight-light grey--text">
                            Price change pct : {{currencyInfo.d30.price_change_pct}}
                        </p>
                        <p class="font-weight-light grey--text">
                            Volume : {{currencyInfo.d30.volume}}
                        </p>
                        <p class="font-weight-light grey--text">
                            Volume change : {{currencyInfo.d30.volume_change}}
                        </p>
                        <p class="font-weight-light grey--text">
                            Volume change pct : {{currencyInfo.d30.volume_change_pct}}
                        </p>

                    </v-card-text>
                </material-card>
            </v-col>
        </v-row>
    </v-container>
</template>
<script lang="ts">
    import axios from "axios";
    export default {
        data: () => ({
            isLoading: false,
            items: [],
            currencyInfo: { logo_url: null,
                            symbol: null,
                            name :  null,
                            price: null,
                            price_date : null,
                            status: null,
                            d1 :
                                {price_change:null, price_change_pct:null, volume: null,volume_change:null,volume_change_pct:null},
                            d30:
                                {price_change:null, price_change_pct:null, volume: null,volume_change:null,volume_change_pct:null},
                                '1d' :
                                    {price_change:null, price_change_pct:null, volume: null,volume_change:null,volume_change_pct:null},
                                '30d' :
                                    {price_change:null, price_change_pct:null, volume: null,volume_change:null,volume_change_pct:null},
            },
            model: null,
            search: null,
            oldSearchValue: null,
            showCardInfo : false,
        }),

        watch: {
            model(/*val*/) {
            },
            search(val) {
                if( val.length == 3 && this.oldSearchValue == val )
                    return;
                else  if( val.length == 3) {
                    this.$store.dispatch('showDelayedLoading');
                    this.getCurrencyList(val);
                    this.oldSearchValue = val;
                }
                return;
            },
        },
        methods: {
            showItems: function (model) {
                if(model == null || model.length <=0)
                    return;
                this.$store.dispatch('showDelayedLoading');
                this.getCurrencyData(model);
            },
            getCurrencyList: function (val) {
                axios.get("/GetRates?currency="+val)
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
                        this.items = this.resposeResult.data.data;
                        this.$store.dispatch('hideLoading');

                    })
                    .catch(error => {
                        this.$store.dispatch('alertError', this.$t('global.error')+error.message);
                        this.$store.dispatch('hideLoading');
                        return false;
                    });
            },
            getCurrencyData: function (symbol) {
                axios.get("/GetCurrencyInformation?currency="+symbol)
                    .then(response => {
                        this.resposeResult = response;
                        if(this.resposeResult.status != 200 ) {
                            this.$store.dispatch('alertError',this.$t('global.error'));
                            this.$store.dispatch('hideLoading');
                            return false;
                        }
                        if(this.resposeResult.data.status != 200 ) {
                            this.$store.dispatch('alertError',this.resposeResult.data.message+" ("+this.resposeResult.data.status+")");
                            this.$store.dispatch('hideLoading');
                            return false;
                        }
                        this.resposeResult.data.data.d1 = this.resposeResult.data.data["1d"];
                        this.resposeResult.data.data.d30 = this.resposeResult.data.data["30d"];
                        this.currencyInfo = this.resposeResult.data.data;
                        this.showCardInfo = true;
                        this.$store.dispatch('hideLoading');

                    })
                    .catch(error => {
                        this.$store.dispatch('alertError', this.$t('global.error')+error.message);
                        this.$store.dispatch('hideLoading');
                        return false;
                    });
            }
        },
    }
</script>
<style>
    .card-spec {
        margin-top: 50px !important;
    }
</style>

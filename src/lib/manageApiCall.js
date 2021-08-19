const manageApiCall = {}
manageApiCall.install = function (Vue, options) {

    Vue.PostInformation = function () {
        alert('fffffffffm')
    }

    Vue.prototype.$logout2 = function () {
        alert('fffffffff')
    }
    Vue.mixin({
        methods: {
            myFirstMethod() {
                alert('MY FIRST PLUGIN! 👌')
            }
        }
    });

}

export { manageApiCall as default };

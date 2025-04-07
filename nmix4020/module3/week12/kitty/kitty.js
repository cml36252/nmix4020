new Vue({
    el: '#app',
    data: {
        catArray: []
    },
    created() {
        this.loadNextImage();
    },
    methods: {
        async loadNextImage() {
            try {
                axios.defaults.headers.common['x-api-key'] = "5707ff43-c0b5-456f-864a-78a03c24ea46"
                let response = await axios.get('https://api.thecatapi.com/v1/breeds')
                this.catArray = response.data
            } catch (err) {
                console.log(err)
            }

        }
    }
})

var computed = new Vue({
el: '#compute',
data: {
firstName: "Curt",
lastName: "Leonard"
}, computed: {
    fullName() {
        return this.firstName + ' ' + this.lastName
    }
}
})
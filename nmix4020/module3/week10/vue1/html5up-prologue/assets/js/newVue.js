var header = new Vue({
    el: '#header',
    data: {
        
        yourName: 'Curt Leonard',
        description: 'CS Student at UGA',
        linkOne: "Introduction",
        link2: "Portfolio",
        link3: "About",
        link4: "Contact",
        link5: "My list",
        link6: "Conditional",
        link7: "Function",
        avatar: "images/me.jpg"
        

    }
})

var portfolio = new Vue({
    el: '#portfolio',
    data: {
        portfolioTitle: "Portfolio",
        image1: "images/vuepix/one.jpg",
        image2: "images/vuepix/two.jpg",
        image3: "images/vuepix/three.jpg",
        image4: "images/vuepix/four.jpg",
        image5: "images/vuepix/five.jpg",
        image6: "images/vuepix/six.jpg",
        image7: "images/vuepix/seven.jpg",
        image8: "images/vuepix/eight.jpg",
        image9: "images/vuepix/nine.jpg",
        caption: "This is a picture from the nmi server"
    }
})

var intro = new Vue({
    el: '#top',
    data: {
        name: "Curt Leonard",
        title: "Computer Science Student at UGA",
        description: "This is the site from the intro to vue lesson",
        linkTitle: "My Portfolio"
    }
})

var about = new Vue({
    el: '#about',
    data: {
        aboutTitle: "About Me",
        aboutText: "I am a computer science student at the University of Georgia. I am currently learning Vue.js and this is my first project using it. I am excited to learn more about this framework and how to use it to build dynamic web applications.",
        aboutImage: "images/vuepix/seven.jpg"
    }

})

var contact = new Vue({
    el: '#contact',
    data: {
        contactTitle: "Contact Me",
        contactText: "If you would like to contact me, please fill out the form below and I will get back to you as soon as possible.",
        contactImage: "images/vuepix/eight.jpg",
        name: "",
        email: "",
        message: "",
        submitted: false
    }

})

var list = new Vue({
    el: '#list',
    data : {
        favorites: ['Paloma Park', 'Trappeze', 'Taqueria Juaritos', 'Cali and Titos']
    }

})

var conditional = new Vue ({
    el: '#conditional',
    data: {
        teacherName: ""
    }

})

var functionVue = new Vue ({
    el:'#function',
    data: {
       bgColor: '',
       colors: ['red', 'blue', 'green', 'yellow', 'purple'],
       divWidth: '300px',
       divWidths: ['100px', '200px', '300px']
    },

    methods: {
        changeColor(color) {
            this.bgColor = color;
        },

        changeWidth(width) {
            this.divWidth = width;
        }
    }
})
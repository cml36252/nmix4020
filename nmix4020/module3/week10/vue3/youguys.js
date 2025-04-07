var studentdata = new Vue({
    el: '#us',
    data: {
        image: "https://bit.ly/2U2OCs0",
        stuname: "",
        counter: 0,
        oswald: "nothing yet",
        dompart1: "http://",
        dompart2: "/images/me.jpg",
        divStructure: {
            backgroundColor: "#f5cac3",
            width: "400px",
        },
        divText : {
            fontFamily: "Courier New",
            fontStyle: 'bold',
            color: 'black'
        },
        yall: 
        [

            {"stu_name":"Xylan","last_name":"Moon","domain":"www.xylanmoon.com\/nmc\/4020","fact":"My favorite food is macademia nut cookies!","section":"150","counter":"315"},
            {"stu_name":"hiviounny","last_name":"hiviounnyRP","domain":"http:\/\/cials.buzz","fact":"We thank Anita Hufnagel for her help with cell culture experiments <a href=http:\/\/cials.buzz>buying cialis online reviews<\/a>","section":"150","counter":"316"},
            {"stu_name":"Kevin","last_name":"Do","domain":"https:\/\/kevintrdo.github.io\/nmc\/4020\/","fact":"I love traveling!      ","section":"150","counter":"310"},
            {"stu_name":"Shweta","last_name":"Sainathan","domain":"shwetanmix.com\/nmc\/4020","fact":"I have one dog and I enjoy hiking!","section":"150","counter":"308"},
            {"stu_name":"Reese","last_name":"Waller","domain":"reesewaller.com\/em\/6020","fact":"I am related to the guy who invented the circus!","section":"150","counter":"307"},
            {"stu_name":"Jason","last_name":"Ouyang","domain":"jasouyang.com\/nmc\/4020","fact":"I've ran half a marathon.          ","section":"150","counter":"306"},
            {"stu_name":"Jamie","last_name":"Martin","domain":"thejamiemartin.com\/em\/6020","fact":"          I have a pet pig named Bella!","section":"150","counter":"305"},
            {"stu_name":"Hannah","last_name":"Hardeman","domain":"hannahhardeman.com\/em\/6020","fact":"          I love floral design! ","section":"150","counter":"304"},
            {"stu_name":"Emily","last_name":"Daly","domain":"https:\/\/emidaly.com\/em\/6020\/","fact":"I love animals and have 5 pets!","section":"150","counter":"302"},
            {"stu_name":"Christian","last_name":"Kirby II","domain":"http:\/\/christiankirbyii.com\/em\/6020\/","fact":"         I have never traveled to anywhere outside of the United States","section":"150","counter":"303"},
            {"stu_name":"Grace","last_name":"Chandler","domain":"gracechandlerportfolio.com\/em\/6020","fact":"          I love playing pickleball!","section":"150","counter":"301"},
            {"stu_name":"Kathy ","last_name":"Do","domain":"kathynmix.com\/nmc\/4020\/","fact":"  I love spicy food! ","section":"150","counter":"300"},
            {"stu_name":"Alex","last_name":"Lee-Boulton","domain":"alexleeboulton.com\/em\/6020","fact":"        I am a ballroom dancer","section":"150","counter":"299"},
            {"stu_name":"Emuel","last_name":"Aldridge","domain":"emuel.com","fact":"I'm the teacher","section":"150","counter":"216"},
            {"stu_name":"Hailey","last_name":"Hubbard","domain":"haileyhub.com\/nmc\/4020","fact":"          I studied abroad in England, Italy, and Spain last spring!","section":"150","counter":"298"},
            {"stu_name":"Isabella","last_name":"Martinez","domain":"https:\/\/isamartinezc.com\/em\/6020\/","fact":"I once did a 500 mile thru-hike! ","section":"150","counter":"296"},
            {"stu_name":"Sydney","last_name":"Barrilleaux","domain":"elizadraws.com\/nmc\/4020","fact":"I have a twin brother who graduated from UGA this past December.","section":"150","counter":"297"},
            {"stu_name":"Ashley","last_name":"Mensah Robbins","domain":"ashleymero.com\/nmc\/4020","fact":"I lived in Lome, Togo in West Africa my junior year of high school (for family reasons)! ","section":"150","counter":"295"},
            {"stu_name":"Torin","last_name":"Smith","domain":"torinsmithmedia.com\/em\/6020","fact":"I have a page on my website where I rate pizzas.","section":"150","counter":"293"},
            {"stu_name":"Peyton","last_name":"Inman","domain":"peytoninman.com\/em\/6020","fact":"          I am from North Carolina. ","section":"150","counter":"294"}
            ]
        
        
        
    },
    methods: {
        showpic() {
            this.stuname = this.yall[this.counter].stu_name + " " + this.yall[this.counter].last_name;
            this.counter++;
        }
    },
    computed: {
        title() {
            let x = Math.floor(Math.random() * this.yall.length)
            return this.yall[x].stu_name + ' ' + this.yall[x].last_name
        }
    }
})
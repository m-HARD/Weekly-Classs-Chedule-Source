export default{
    data() {
        return {
            subInDay:['الأولى','التانية','التالتة','الرابعة','الخامسة','السادسة','السابعة','التامنة','الناسعة'],
            dayOfWeek:[
                {id:1,name:'السبت'},
                {id:2,name:'الأحد'},
                {id:3,name:'الأثنين'},
                {id:4,name:'الثلاثاء'},
                {id:5,name:'الأربعاء'},
                {id:6,name:'الخميس'},
            ],
            classes:[
                {id:1,name:'الأول',subInDay:6},
                {id:2,name:'الثاني',subInDay:6},
                {id:3,name:'الثالث',subInDay:6},
                {id:4,name:'الرابع',subInDay:7},
                {id:5,name:'الخامس',subInDay:7},
                {id:6,name:'السادس',subInDay:7},
                {id:7,name:'السابع',subInDay:7},
                {id:8,name:'الثامن',subInDay:8},
            ],
            subjects:[
                {id:1,name:'قران'},
                {id:2,name:'عربي'},
                {id:3,name:'رياضيات'},
                {id:4,name:'فقه'},
                {id:5,name:'احياء'},
                {id:6,name:'كيمياء'},
                {id:7,name:'حاسوب'},
                {id:8,name:'مسككننا'},
                {id:9,name:'ملبسنا'},
                {id:10,name:'العلم في حياتنا'},
                {id:11,name:'مهارات'},
                {id:12,name:'تاريخ'},
                {id:13,name:'جغرافيا'},
                {id:14,name:'نشاط'},
                {id:15,name:'علوم'},
                {id:16,name:'انجليزي'},
                {id:17,name:'قصة'},
                {id:18,name:'فنون'},
                {id:19,name:'اسلامي'},
                {id:20,name:'معاصر'},
                {id:21,name:'تقنية'},
                {id:22,name:'سلامتنا'}
            ],
            teachers:[
                {id:1,name:'مصعب'},
                {id:2,name:'محمد'},
                {id:3,name:'ابو القاسم'},
                {id:4,name:'حسن'},
                {id:5,name:'احمد'},
                {id:6,name:'دعاء'},
                {id:7,name:'نون'},
                {id:8,name:'عمر'},
                {id:9,name:'حمادة'},
                {id:10,name:'فاروق'},
                {id:11,name:'روان'},
                {id:12,name:'صفاء'},
                {id:13,name:'ريان'},
                {id:14,name:'ماريا'},
                {id:15,name:'فاطمة صالح'},
                {id:16,name:'فاطمة اسحق'},
                {id:17,name:'انتصار'},
                {id:18,name:'الهام'},
                {id:19,name:'فاطمة آدم'},
                {id:20,name:'زينب ابراهيم'},
                {id:21,name:'تسابيح'},
                {id:22,name:'سحر'},
                {id:23,name:'بلابل'},
                {id:24,name:'خديجة'},
                {id:25,name:'منى'},
                {id:26,name:'ماجدة'},
                {id:27,name:'حياة'},
                {id:28,name:'هدى'},
                {id:29,name:'سهام'},
                {id:30,name:'وصال'},
                {id:31,name:'صدام'},
                {id:32,name:'زينب حسن'},
                {id:33,name:'1'},
                {id:34,name:'2'},
                {id:35,name:'3'},
                {id:36,name:'4'},
                {id:37,name:'5'},
                {id:38,name:'6'},
                {id:39,name:'7'},
                {id:40,name:'8'}
            ],
            colors:["#B46EC75c","#6FC76E5c","#6EC6C75c","#6E98C75c","#6E6EC75c","#C76E6E5c","#C6C76E5c","#8EC76E5c","#C7A46E5c","#C79B6E5c","#896EC75c","#A76EC75c","#C76EA15c","#C76E8A5c","#C76E7A5c",
                    "#6E96C75c","#C76EB35c","#C7AD6E5c","#C6C76E5c","#98C76E5c","#6EC77A5c","#6EC7AB5c","#6EB3C75c","#6E91C75c","#C7C76E5c","#6EC77E5c","#6EC7B55c","#C7B06E5c","#FBBB035c","#BFFB035c"]
        }
    },
    methods: {
        userDataBy(by,id){
            if (by == "class") {
              return this.data.userConfig.filter((data)=>{
                return data.theClass.id == id
              })
            }else if (by == "teacher") {
              return this.data.userConfig.filter((data)=>{
                return data.teacher.id == id
              })
            }else if (by == "subject") {
              return this.data.userConfig.filter((data)=>{
                return data.subject.id == id
              })
            }
      
            return []
          },

          svg(){
              return `
                <div class='pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700'>
                    <svg class='fill-current h-4 w-4' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20'>
                        <path d='M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z'/>
                    </svg>
                </div>
              `;
          }
    }
}
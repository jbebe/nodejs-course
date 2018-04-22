const mongoose = require('mongoose');

const NEPTUN_CODE = 'cgq956';
const DB_URL = `mongodb://localhost/${NEPTUN_CODE}`;

// create course
const CourseSchema = mongoose.Schema({
  _id: String,
  info: String,
  tasks: [{
    type: Number,
    ref: 'tasks'
  }]
});
const Course = module.exports.Course = mongoose.model('courses', CourseSchema);

// create task
const TaskSchema = mongoose.Schema({
  _id: Number,
  name: String,
  deadline: Date,
  description: String,
  submissions: [{
    type: mongoose.Schema.ObjectId,
    ref: 'submissions'
  }],
  course: {
    type: String,
    ref: 'courses'
  }
});
// So apparently we can't hook on document remove
/*TaskSchema.pre('remove', function(next){
  // remove all submissions before deleting parent task
  console.log('Deleting submissions...');
  this.model('submissions').remove({ task: this._id }, (err, result) => {
    if (err){
      console.log('Error, while deleting tasks: ' + JSON.stringify(err));
    }
    next.apply(null, arguments);
  });
});*/
const Task = module.exports.Task = mongoose.model('tasks', TaskSchema);

// create submission
const SubmissionSchema = mongoose.Schema({
  path: String,
  neptun: String,
  late: Boolean,
  rating: String,
  comment: String,
  task: {
    type: Number,
    ref: 'tasks'
  }
});
const Submission = module.exports.Submission = mongoose.model('submissions', SubmissionSchema);

module.exports.initDb = (withTestData = false) => {
  mongoose.connect(DB_URL)
    .catch(console.log)
    .then((self) => {
      console.log(`Connected to ${DB_URL}`);

      if (withTestData){
        // test instances
        const courseId = 'vitmav42';
        const taskIdList = [];
        for (let i = 1; i < 7; i++){
          const submissionIdList = [];
          for (let j = 1; j < 74; j++){
            const submissionObj = new Submission({
              path: '/',
              neptun: [...Array(6)].map(x => (~~(Math.random()*36)).toString(36).toUpperCase()).join(''),
              late: !!((j+i+~~(Math.random()*3))%3),
              rating: ['Ok', 'Bad', 'Great'][(Math.random()*3)|0],
              comment: 'Meh..' + i + ', ' + j,
              task: i
            });
            submissionObj.save().catch(console.log);
            submissionIdList.push(submissionObj._id);
          }
          const taskObj = new Task({
            _id: i,
            name: 'Alapok ' + i,
            deadline: new Date(),
            description: 'This is the description' + i,
            submissions: submissionIdList,
            course: courseId
          });
          taskObj.save().catch(console.log);
          taskIdList.push(taskObj._id);
        }
        const courseObj = new Course({
          _id: courseId,
          info: 'Szerver oldali JavaScript\n' +
          '=========================\n' +
          '\n' +
          '**Előadások és gyakorlat:**\n' +
          '\n' +
          'Paróczi Zsombor [paroczi@tmit.bme.hu](mailto:paroczi@tmit.bme.hu)\n' +
          '\n' +
          'Tárgyfelelős: Dr. Kovács Gábor\n' +
          '\n' +
          '### Bemutatott mintapéldák és mintafeladat\n' +
          '\n' +
          '[https://github.com/VITMAV42/](https://github.com/VITMAV42/)\n' +
          '\n' +
          '### Órák\n' +
          '\n' +
          '| Időpont | Előadás/Gyakorlat | Tartalom | Kapcsolódó anyagok | \n' +
          '|---|---|---|---|\n' +
          '| február 8 | előadás | Bevezetés | slides pdf yt | \n' +
          '| február 15 | gyakorlat | Fejlesztőkörnyezet összerakása | yt | \n' +
          '| február 22 | előadás | Javascript nyelvi elemek | slides pdf yt | \n' +
          '| március 1 | gyakorlat | Javascript nyelvi elemek gyakorlat | yt | \n' +
          '| március 8 | előadás | Express keretrendszer | slides pdf yt | \n' +
          '| március 15 | - | - | yt | \n' +
          '| március 22 | előadás | promise, async, error first callback, gulp | slides pdf yt | \n' +
          '| március 29 | gyakorlat | Express templating , Gulp deployment | slides pdf yt | \n' +
          '| április 12 | előadás | MongoDB, séma tervezés, performancia kérdések | slides pdf yt | \n' +
          '| április 19 | gyakorlat | MongoDB és Express, kliens és szerver oldali kód hordozás | yt | \n' +
          '| április 26 | előadás | core modulok: http, https, os, fs, events | slides pdf yt | \n' +
          '| május 3 | gyakorlat | core modulok a gyakorlatban | yt | \n' +
          '| május 10 | előadás | Unit és integrációs tesztek, mocha, assert struktúrák, TDD / DBB | slides pdf yt | \n' +
          '| május 17 | gyakorlat | Tesztelés gyakorlat | yt | \n' +
          '\n' +
          '\n' +
          '### Alapadatok\n' +
          '\n' +
          '[Tárgyi adatlap](https://portal.vik.bme.hu/kepzes/targyak/vitmav42)\n' +
          '\n' +
          'Óra: **csütörtök 12:15 - 14:00**\n' +
          '\n' +
          '*   Páratlan héten előadás\n' +
          '*   Páros héten gyakorlat\n' +
          '\n' +
          '### Követelmények\n' +
          '\n' +
          'Hét fejlesztési gyakorlat megoldása\n' +
          '\n' +
          '*   Félévközi jegy a teljesített feladatok alapján\n' +
          '*   Leadási határidő a [weboldalon](/vitmav42/Feladatok.md)\n' +
          '*   **Hét feladat megoldása kötelező**\n' +
          '*   **Két feladat pótolható** vagy javítható a pótlási hét végéig\n' +
          '\n' +
          '### Feladat beadás\n' +
          '\n' +
          '[https://malna.tmit.bme.hu/vitmav42/submit/](https://malna.tmit.bme.hu/vitmav42/submit/)\n' +
          '\n' +
          '### Eredmények és információk\n' +
          '\n' +
          'Eredmények a weboldalon, módosítási kérések is ott lesznek felsorolva!\n' +
          '\n' +
          'Módosítás után újra be kell adni a házi feladatot, az eredeti leadási határidővel számoljuk a késést.',
          tasks: taskIdList
        });
        courseObj.save().catch(console.log);
      }
    });
};


let r, g, b;
let database;
let authPromise;
let allData={
  entries:[]
}

let colorByLable={
  'red':[],
  'blue':[],
  'green':[],
  'yellow':[],
  'pink':[]


}
function pickColor() {
  r = floor(random(256));
  g = floor(random(256));
  b = floor(random(256));
  background(r, g, b);

  //$('body').css('background-color',rgb(r,g,b));
  // updateBodyBG();
}
function setup() {
  console.log("new setup");
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyCOxp4IOJF5Z006mSfw2lxSk3b9u-DTK9s",
    authDomain: "color-collection-9316b.firebaseapp.com",
    databaseURL: "https://color-collection-9316b.firebaseio.com",
    projectId: "color-collection-9316b",
    storageBucket: "",
    messagingSenderId: "241908691270"
  };
  firebase.initializeApp(config);
  database = firebase.database();
  // authPromise = firebase.auth().signInAnonymously();
  console.log('connected');

console.log('procissing data');
  let ref = database.ref('colors');
  ref.once('value',gotData);
  //authPromise = firebase.auth().signInAnonymously();


  // console.log(firebase);
  createCanvas(400,400)
pickColor()

var button = []

button.push(createButton('red'))
button.push(createButton('green'))
button.push(createButton('blue'))
button.push(createButton('yellow'))
button.push(createButton('pink'))


for (var i = 0; i < button.length; i++) {
  button[i].mousePressed(sendData)
}



}

function gotData(results) {
  // console.log(results.val());
//   var arr = $.map(results.val(), function(value, index) {
//     return [value];
// });
// for (var i = 0; i < arr.length; i++) {
//
//   console.log(i+']' +'label = ' + arr[i].label);
// }
// \

  let data = results.val()
  let keys = Object.keys(data);
  console.log(keys.length);

  console.log(keys);
//
  for (let key of keys) {
  let record = data[key]
  // console.log('record********************************');
//  console.log(key);
  allData.entries.push(record)
//  console.log(record);
  var col = color(record.r,record.g,record.b)
  colorByLable[record.label].push(col);



}
//*******************p5 function**********************
// console.log(allData);

saveJSON(allData,'col')
//  console.log(colorByLable);
  console.log('***');
let col_name =Object.keys(colorByLable)
let yy = 500;
for (var cl of col_name) {

  let coll = colorByLable[cl];

  let x = 0;
  let y = 0;




  var sketch = function(p) {
    p.setup = function(){
      p.createCanvas(100, 100).position(0,yy);
      p.noStroke()
    //  p.background(floor(random(256)))


      for (let i = 0; i< coll.length;i++ ) {
  //      console.log(coll + i);
        p.fill(coll[i])

         p.rect(x,y,10,10)
        x+=10;
        if(x>=p.width)
        {
          x=0;
          y=10
        }
        };




}

}
new p5(sketch, 'first()');



yy+=100

}




}

async function sendData() {
  let colorDatabase = database.ref("colors");


    //let { user } = await authPromise;


  // Make an object with data in it
  var data = {
    r: r,
    g: g,
    b: b,
    label: this.html()
  };
  console.log("saving data");
//  console.log(data);

  let color = colorDatabase.push(data, finished);
  console.log("Firebase generated key: " + color.key);



  // Reload the data for the page
  function finished(err) {
    if (err) {
      console.error("ooops, something went wrong.");
      console.error(err);
    } else {
      console.log('Data saved successfully');
      pickColor()

    }
  }

}






//
// function ten() {
// console.log("staring");
//   const shape = [2,3]; // 2 rows, 3 columns
// const a = tf.tensor([1.0, 2.0, 3.0,4.0,5.0,6.0], shape);
// a.print();
// const initialValues = tf.zeros([2,3]);
// initialValues.print();
// console.log('variable');
// const bia = tf.variable(initialValues);
// bia.print();
// console.log('update');
// bia.assign(a);
// bia.print();
//
// const f = a.add(bia.square());
// f.print()
//
// tf.eye(3,3).print()
//
// const values = [];
// for (let i = 0; i < 10; i++) {
//   values[i] = Math.floor((Math.random() * 10));
// }
//
// const sh = [5,2];
//
//
// const k = tf.buffer(sh);
// k.set(4,0,0)
// k.set(41,0,1)
// k.set(1,2,0)
// k.set(99,1,1)
// k.toTensor().print();
// console.log(k.get(0));
//
//
//
// console.log('layer API');
//
//
// const model = tf.sequential();
//
//
// const layer1 = tf.layers.dense({
//   units:5,
//   activation:'sigmoid',
//   inputShape : [2]
// });
//
// const layer2 = tf.layers.dense({
//   units:1,
//   activation:'sigmoid',
// })
// model.add(layer1)
// model.add(layer2)
//
//
//
//
// model.compile({
//   optimizer : tf.train.sgd(1.5),
//   loss : tf.losses.meanSquaredError
//
// });
//
//
//
//
// const x = tf.tensor2d([[0,0],[1,1],[.5,.6]])
//
//
//
//
//
// const y = tf.tensor2d([[1.2],
//   [1],[1]])
//
// tain().then(function() {
//   console.log("rak you rock");
//
//   const out = model.predict(x)
//
//   out.print()
//
// });
// async function tain() {
//
// for (var i = 0; i < 100; i++) {
//   const response = await model.fit(x,y,{
//     shuffle : true,
//     epochs : 10
//   });
//  console.log(response.history.loss[0])
// }
//
// }
//
//
// console.log('number of bytes is '+tf.memory().numTensors);
//
// }
//




function tensers() {



    const model  = tf.sequential();


    const layer1 = tf.layers.dense({
      units:4,
      inputShape:[4],
      activation:'sigmoid'
    })

    const layer2 = tf.layers.dense({
      units:2,
      activation:'sigmoid'
    })


    model.add(layer1)
    model.add(layer2)

    model.compile({
      optimizer : tf.train.sgd(.5),
      loss : 'categoricalCrossentropy'
    })

    const x = tf.tensor2d([[Math.random(),Math.random(),Math.random(),Math.random()]])
    const x1 = tf.tensor2d([[Math.random(),Math.random(),Math.random(),Math.random()]])
    const  x2 = tf.tensor2d([[Math.random(),Math.random(),Math.random(),Math.random()]])
    const x3 = tf.tensor2d([[Math.random(),Math.random(),Math.random(),Math.random()]])




    const y = tf.tensor2d([[1.2,2.3]])

    tain().then(()=> {
      console.log("complete training");

      const out = model.predict(x,x1,x2,x3)

      out.print()

    });
    async function tain() {

    for (var i = 0; i < 1000; i++) {
      const response = await model.fit(x,y,{
        shuffle : true,
        epochs : 10
      });
     console.log(response.history.loss[0])
    }

  }


}






















function rak() {


function predict(input) {
  // y = a * x ^ 2 + b * x + c
  // More on tf.tidy in the next section
  return tf.tidy(() => {
    const x = tf.scalar(input);

    const ax2 = a.mul(x.square());
    const bx = b.mul(x);
    const y = ax2.add(bx).add(c);

    return y;
  });
}

// Define constants: y = 2x^2 + 4x + 8
const a = tf.scalar(2);
const b = tf.scalar(4);
const c = tf.scalar(8);

const h = parseInt(document.getElementById('num').value);
const result = predict(h);
result.print() // Output: 24

}

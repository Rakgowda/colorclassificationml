let loaded_data;
let xs
let ys
let model;
let labelP;
let rslider,gslider,sslider;
let labelList = [
  "red",
  "green",
  "blue",
  "green",
  "pink"
]

function preload() {
//   $.getJSON( "", function( data ) {jQuery.parseJSON( '{ "name": "John" }' );
// loaded_data =  jQuery.parseJSON(data);
//
// console.log('loding dadata' + data);
// });


loaded_data = loadJSON('col.json')

}

function setup() {
  createCanvas(400,400)
  rslider = createSlider(0,255,255)
  gslider = createSlider(0,255,255)
  bslider = createSlider(0,255,0)
  console.log('*******************************************');
  //console.log(loaded_data.entries);

  let color = []
  let label = []

  for (let record of loaded_data.entries) {
      let col = [record.r/255,record.g/255,record.b/255]
    

  color.push(col)
  label.push(labelList.indexOf(record.label))


  }
     xs  =   tf.tensor2d(color)

    // xs.print()
    console.log('this is data ys')

      let labelTensor = tf.tensor1d(label,'int32')
      // labelTensor.print()


      ys = tf.oneHot(labelTensor,5)
     // ys.print()

      console.log(xs.shape);
     console.log(ys.shape);


     model = tf.sequential();

     const layer1 = tf.layers.dense({
       units:5,
       activation:'sigmoid',
       inputShape : [3]
     });

     const layer2 = tf.layers.dense({
       units:5,
       activation:'softmax',
     })
     model.add(layer1)
     model.add(layer2)
    // console.log(label);


    const lr = 0.1;
    const opti = tf.train.sgd(lr)
    model.compile({
      optimizer:opti,
      loss : 'categoricalCrossentropy'
    })
train().then((result)=>{
      console.log(result.history.loss);
    })


}
function draw()
{
  let r = rslider.value()
  let g = gslider.value()
  let b = bslider.value()
  background(r,g,b)
  const xs  = tf.tensor2d([[
    r/255,g/255,b/255
  ]])

  let result = model.predict(xs)
  let index = result.argMax(1).dataSync()[0]
  // console.log(index);
//  result.print()
let label = labelList[index]
console.log(label);

 $("p").html('<br>' + label );
}
async function train() {
  const option ={
    epochs:1,
    validationSplit : 0.1,
    shuffle:true,
    callbacks:{
      onTrainBegin:()=>{console.log('traing begin');},
       onTrainEnd:()=>{console.log('traing end');},
       onBatchEnd : tf.nextFrame,
       onEpochEnd : (num,logs)=>{

        // $("p"). append('<br>' + logs.val_loss );
        // console.log("num = "  + num);
         //console.log("loss = "  + logs.val_loss);
       }


    }


  }
  return  await model.fit(xs,ys,option)
}

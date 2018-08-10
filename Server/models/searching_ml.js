const brain = require('brain.js');
const mongoose = require('mongoose');

const userHistorySchema = mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    categories: {
        type: [String]
    }
});

const UserHistory = mongoose.model("UserHistory", userHistorySchema);

var net = new brain.NeuralNetwork();

module.exports.GetCatagory = (username, errorAction, callbackAction) => {
    UserHistory.findOne({'username': username},  (err, userHistory) =>{
        if (err ) {
           errorAction(err);
           return;
        }
        if(!userHistory){
           errorAction({error: "cant find user history"});            
            return;
        }
        run(userHistory, callbackAction);
    });    
}

module.exports.AddToHistory = (username, categoryName) => {
    UserHistory.findOne({'username': username},  (err, userHistory) =>{
        if(err) {// there is no history for that user
            console.log("cant search user history");
        }
        if(userHistory) {
            if (userHistory.categories.length == 3) {
                trainByuserHistory(userHistory, categoryName);
                userHistory.categories.shift(); // remove the first item
            }
            userHistory.categories.push(categoryName);                
            saveUserHistory(userHistory);
        }
        else {
            addNewUserHistorySearch(username, categoryName);
        }
    });
}

function run(userHistory, callbackAction){
    var input = {};
    userHistory.categories.forEach(category => {
        input[category] = 1;
    });
    console.log("the machine learning is running now");
    var output = net.run(input);            
    var maxKey ="Min";
    output[maxKey] = 0;
    Object.keys(output).forEach(function(k){
        if(output[k] > output[maxKey]){
            maxKey = k;
        } 
    });
    callbackAction(maxKey);
}

function addNewUserHistorySearch(name, categoryName) {
    newUser = new UserHistory ({
        username: name,
        categories: [categoryName]
    });
    saveUserHistory(newUser);
}

function saveUserHistory(userHistory){
    userHistory.save().then(callback => console.log(`user history saved`))
    .catch(err=> console.log(`error at saving user history.error : ${err}`));
}

function trainByuserHistory(userHistory, output) {
    console.log("training..");    
    var input ={};
    var output = {};
    userHistory.categories.forEach(categoryName => {
        input[categoryName] = 1;
    });
    output[output] = 1;
    net.train([{input, output}]);
}

net.train([{input: { GameConsoles: 1, Communications: 1, Clothing: 1 }, output: { Hygiene: 1 }},
           {input: { Electronics: 1, Clothing: 1, Gadgets: 1 }, output: { Lights: 1 }},
           {input: { Hygiene: 1, Lights: 1, Communications: 1 }, output: { Electronics: 1 }},
           {input: { Clothing: 1, Communications: 1, Hygiene: 1 }, output: { Gadgets: 1 }},
           {input: { Gadgets: 1, Electronics: 1, Communications: 1 }, output: { GameConsoles: 1 }},
           {input: { Gadgets: 1, Communications: 1, Communications: 1 }, output: { Communications: 1 }}]);
net.train([{input: { Electronics: 1, Communications: 1, Clothing: 1 }, output:{Gadgets: 1}}])
var output = net.run({ GameConsoles: 1, Communications: 1, Electronics: 1 });  // { white: 0.99, black: 0.002 }
console.log("done training");



// let trainedNet;

// function encode(arg) {
//     var encodedChars = arg.split('').map(x => (x.charCodeAt(0) / 255));
//     var sum = encodedChars.reduce((a, b) => a + b);
//     var avverage = sum / encodedChars.length;
//    return avverage;
// }

// function processTrainingData(data) {
//     console.log('processTrainingData...');
    
//    return data.map(d => {
//        console.log(`input: ${d.input}`);
//        var categories = d.input.split(" ");
//        var input = {};
//        for (let index = 0; index < categories.length; index++) {
//            var element = categories[index];
//            var encodedElement = encode(element);
//            input[`part${index}`] = encodedElement;
//        }
//        var result = {input, output: d.output};
//         console.log(result);
//     //    var e = encode(d.input);
//     //    console.log(`encode: ${e}`);
//        return {
//            input,
//            output: d.output
//        }
//    })
// }

// function train(data) {
//     console.log('trainning...');
//    let net = new brain.NeuralNetwork();
//    net.train(processTrainingData(data));
//    trainedNet = net.toFunction();
//    console.log('Finished training...');
// };

// function execute(input) {
//    let results = trainedNet(encode(input));
//    let output;
// //    results.trump > results.kardashian ? output = 'Trump' : output = 'Kardashian';
//    console.log(results);
// //    return output;
// } 

// const trainingData = [
//     {
//         input: "Electronics Hygiene",
//         output: { Young: 1 }
//     },{
//         input: "Electronics Clothing Gadgets Lights",
//         output: { Young: 1 }
//     },{
//         input: "Hygiene Lights Communications Electronics",
//         output: { Young: 1 }
//     },{
//         input: "Drill Hammer Cars Work",
//         output: { Adult: 1 }
//     },{
//         input: "Work Table financial Drill",
//         output: { Adult: 1 }
//     },{
//         input: "financial Work Hammer Cars",
//         output: { Adult: 1 }
//     }
//  ]
 

// // const trainingData = [
// //     {
// //         input: "Game Consoles and Communications and Clothing and Hygiene and Lights",
// //         output: { Young: 1 }
// //     },{
// //         input: "Electronics and Clothing and Gadgets and Lights",
// //         output: { Young: 1 }
// //     },{
// //         input: "Hygiene and Lights and Communications and Electronics",
// //         output: { Young: 1 }
// //     },{
// //         input: "Drill and Hammer and Cars and Work",
// //         output: { Adult: 1 }
// //     },{
// //         input: "Work and Table and financial and Drill",
// //         output: { Adult: 1 }
// //     },{
// //         input: "financial and Work and Hammer and Cars",
// //         output: { Adult: 1 }
// //     }
// //  ]
 
// train(trainingData);
// console.log(execute("Clothing, Gadgets, Lights"));

// var net = new brain.recurrent.LSTM();
// console.log("start training...");
// net.train([
//     'Game Consoles, Communications, Clothing, Hygiene, Lights',
//   'Electronics, Clothing, Gadgets, Lights',
//   'Hygiene, Lights, Communications, Electronics',
//   'Drill, Hammer, Cars, Work',
//   'Work, Table, financial, Drill',
//   'financial, Work, Hammer, Cars'
// ]);
// var output = net.run('Clothing, Gadgets, Lights');  // ', a deer, a female deer'
// console.log(output);



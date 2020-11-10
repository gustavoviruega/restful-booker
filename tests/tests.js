const newman = require('newman');

let collections = ['./postman/collections/BookingPractice1.postman_collection.json','./postman/collections/BookingPractice2.postman_collection.json', './postman/collections/BookingPractice3.postman_collection.json', './postman/collections/BookingPractice4.postman_collection.json', './postman/collections/BookingPractice6.postman_collection.json'];

//toma el segundo parametro que se pasa cuando se llama a la clase test.js desde el script nodetests.
const env = require(process.argv[2]);

(function runCollection(i = 0) {
    newman.run({
        collection: collections[i],
        environment: env,
        reporters: ['cli', 'junit'],
        reporter: { junit : { export : '../reports'+collections[i]+'_results.xml' } },
        iterationCount: 1,
    }, function (err) {
        if(err){ throw err; }
        i++;
        if(i < collections.length){
            runCollection(i);
        }
        else{
            console.log("All Collections Run Complete!")
        }
    });
})();

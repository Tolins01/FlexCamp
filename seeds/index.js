const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];


const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 300; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            //YOUR USER ID
            author: '62d9d6f474c736209c34175c',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam dolores vero perferendis laudantium, consequuntur voluptatibus nulla architecto, sit soluta esse iure sed labore ipsam a cum nihil atque molestiae deserunt!',
            price,
            geometry: {
                type: "Point",
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude,
                ]
            },
            images: [
                {
                    url: 'https://res.cloudinary.com/dbgowpxtw/image/upload/v1658446949/YelpCamp/x0qgmg73pswojhpt5dfm.jpg',
                    filename: 'YelpCamp/x0qgmg73pswojhpt5dfm'
                  },
                  {
                    url: 'https://res.cloudinary.com/dbgowpxtw/image/upload/v1658446949/YelpCamp/q2nllx9donlio4knvbon.jpg',
                    filename: 'YelpCamp/q2nllx9donlio4knvbon'
                  },
                  {
                    url: 'https://res.cloudinary.com/dbgowpxtw/image/upload/v1658446949/YelpCamp/bip8leyrtbudc0hqpxtg.jpg',
                    filename: 'YelpCamp/bip8leyrtbudc0hqpxtg'
                  },
                  {
                    url: 'https://res.cloudinary.com/dbgowpxtw/image/upload/v1658446949/YelpCamp/urbuuyq8ha0yq17skkpp.jpg',
                    filename: 'YelpCamp/urbuuyq8ha0yq17skkpp'
                  }
            ]
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})
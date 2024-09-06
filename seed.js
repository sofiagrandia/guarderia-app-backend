const mongoose = require("mongoose");
const User = require("./models/user.model");
const Class = require("./models/class.model");
const Facility = require("./models/facility.model");
const Booking = require("./models/booking.model");
const dotenv = require("dotenv");

dotenv.config();

const MONGO_URI = process.env.MONGO_URI;

mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected for seeding"))
  .catch((err) => console.error("MongoDB connection error:", err));

const users = [
  {
    _id: new mongoose.Types.ObjectId(),
    name: "Admin User",
    email: "admin@example.com",
    password: "admin123",
    role: "admin",
  },
  {
    _id: new mongoose.Types.ObjectId(),
    name: "Regular User",
    email: "user@example.com",
    password: "user123",
    role: "user",
  },
];

const facilities = [
  {
    _id: new mongoose.Types.ObjectId(),
    name: "Gym Hall 1",
    description: "A fully equipped gym with all modern amenities.",
    image: "gym-hall-1.jpg",
    equipment: ["Treadmill", "Dumbbells", "Bench Press"],
    floor: 1,
    size: 500,
  },
  {
    _id: new mongoose.Types.ObjectId(),
    name: "Yoga Room",
    description: "A peaceful space for yoga and meditation.",
    image: "yoga-room.jpg",
    equipment: ["Yoga Mats", "Blocks", "Straps"],
    floor: 2,
    size: 200,
  },
];

const classes = [
  {
    _id: new mongoose.Types.ObjectId(),
    name: "Morning Yoga",
    facility: facilities[1]._id, // Yoga Room
    description: "A beginner-friendly morning yoga class.",
    image: "morning-yoga.jpg",
    availableSpaces: 10,
    difficulty: 2,
    time: "08:00 AM",
    duration: 60, // 60 minutes
  },
  {_id: new mongoose.Types.ObjectId(),
    name: "Advanced Cardio",
    facility: facilities[0]._id, // Gym Hall 1
    description: "An advanced cardio class for fitness enthusiasts.",
    image: "advanced-cardio.jpg",
    availableSpaces: 15,
    difficulty: 4,
    time: "10:00 AM",
    duration: 45, // 45 minutes
  },
];

const bookings = [
    {
      user: users[1]._id, // Regular User
      class: classes[0]._id, // Morning Yoga
      date: new Date(),
      price: 20,
      extras: false,
      discount: 0,
    },
    {
      user: users[1]._id, // Regular User
      class: classes[1]._id, // Advanced Cardio
      date: new Date(),
      price: 30,
      extras: true,
      discount: 5, // Apply discount
    },
  ];

const seedDB = async () => {
  await User.deleteMany({});
  await Class.deleteMany({});
  await Facility.deleteMany({});
  await Booking.deleteMany({});

  for (const user of users) {
    const newUser = new User(user);
    await newUser.save();
  }
  for (const facility of facilities) {
    const newFacility= new Facility(facility);
    await newFacility.save();
  }

 for (const myClass of classes) {
    const newClass= new Class(myClass);
    await newClass.save();
  }


  for (const booking of bookings) {
    const newBooking = new Booking(booking);
    await newBooking.save();
  }
};



seedDB().then(() => {
  console.log(`Seeds creadas correctamente!`);
  mongoose.connection.close();
});

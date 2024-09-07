const mongoose = require('mongoose');
const User = require('./models/user.model');
const Mascota = require('./models/mascota.model');
const Servicio = require('./models/servicio.model');
const Centro = require('./models/centro.model');
const Booking = require('./models/booking.model');
const dotenv = require("dotenv");

dotenv.config();
console.log("Mongo URI: ", process.env.MONGO_URI);
const MONGO_URI = process.env.MONGO_URI;


mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected for seeding'))
  .catch(err => console.error('MongoDB connection error:', err));

  const mascotas = [
    {
      _id: new mongoose.Types.ObjectId(),
      name: 'Fido',
      type: 'Dog',
      raza: 'Golden Retriever',
      fechaNacimient: new Date(2020, 5, 15),
    },
    {
      _id: new mongoose.Types.ObjectId(),
      name: 'Whiskers',
      type: 'Cat',
      raza: 'Siamese',
      fechaNacimient: new Date(2018, 10, 25),
    },
  ];

const users = [
  {
    _id: new mongoose.Types.ObjectId(),
    name: 'Alice',
    email: 'alice@example.com',
    mascotas: [mascotas[0]],
    password: 'password123',
  },
  {
    _id: new mongoose.Types.ObjectId(),
    name: 'Bob',
    email: 'bob@example.com',
    mascotas: [mascotas[1]],
    password: 'password123',
  },
];

const servicios = [
  {
    _id: new mongoose.Types.ObjectId(),
    titulo: 'Spa for Pets',
    description: 'Relaxing spa services for your pets',
    image: 'spa.jpg',
    available: true,
    precio: 50,
  },
  {
    _id: new mongoose.Types.ObjectId(),
    titulo: 'Pet Training',
      description: 'Obedience and behavior training for dogs',
      image: 'training.jpg',
      available: true,
      precio: 100,
  },
];

const centros = [
  {
    _id: new mongoose.Types.ObjectId(),
    direccion: '123 Pet Street',
    image: ['center1.jpg'],
    telefono: '123-456-7890',
    plazasDisponibles: 5,
    servicios: [servicios[0]._id, servicios[1]._id],
  },
  {_id: new mongoose.Types.ObjectId(),
    direccion: '456 Animal Avenue',
    image: ['center2.jpg'],
    telefono: '987-654-3210',
    plazasDisponibles: 8,
    servicios: [servicios[1]._id],
  },
];

const bookings = [
    {
      user: users[0]._id,
      centro: centros[0]._id,
      servicio: servicios[0]._id,
      dateIn: new Date(2024, 9, 10),
      dateOut: new Date(2024, 9, 15),
      price: 200,
      discount: 20,
    },
    {
      user: users[1]._id,
      centro: centros[1]._id,
      servicio: servicios[1]._id,
      dateIn: new Date(2024, 9, 5),
      dateOut: new Date(2024, 9, 7),
      price: 100,
      discount: 10,
    },
  ];

const seedDB = async () => {
  await User.deleteMany({});
  await Centro.deleteMany({});
  await Servicio.deleteMany({});
  await Booking.deleteMany({});

  for (const user of users) {
    const newUser = new User(user);
    await newUser.save();
  }
  for (const servicio of servicios) {
    const newServicio= new Servicio(servicio);
    await newServicio.save();
  }

 for (const centro of centros) {
    const newCentro= new Centro(centro);
    await newCentro.save();
  }


  for (const booking of bookings) {
    const newBooking = new Booking(booking);
    await newBooking.save();
  }

  for (const mascota of mascotas) {
    const newMascota = new Mascota(mascota);
    await newMascota.save();
  }
};

seedDB().then(() => {
  console.log(`Seeds creadas correctamente!`);
  mongoose.connection.close();
});

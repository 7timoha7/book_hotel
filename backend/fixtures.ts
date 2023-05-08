import mongoose from 'mongoose';
import * as crypto from 'crypto';
import config from './config';
import User from './models/User';
import RoomType from './models/RoomType';
import Hotel from './models/Hotel';
import Apartment from './models/Apartment';
import Order from './models/Order';

const run = async () => {
  mongoose.set('strictQuery', false);
  await mongoose.connect(config.db);
  const db = mongoose.connection;

  try {
    await db.dropCollection('users');
    await db.dropCollection('roomtypes');
    await db.dropCollection('hotels');
    await db.dropCollection('apartments');
    await db.dropCollection('orders');
  } catch (e) {
    console.log('Collections were not present, skipping drop...');
  }

  const [admin, admin2, user, hotel, director, user2] = await User.create(
    {
      email: 'admin@gmail.com',
      firstName: 'Admin',
      lastName: 'Adminich',
      password: '123',
      token: crypto.randomUUID(),
      role: 'admin',
      phoneNumber: '0555 777777',
      status: 'super',
      cashback: '0',
    },
    {
      email: 'admin2@gmail.com',
      firstName: 'Admin2',
      lastName: 'Adminich2',
      password: '123',
      token: crypto.randomUUID(),
      role: 'admin',
      phoneNumber: '0555 777777',
      status: 'super',
      cashback: '0',
    },
    {
      email: 'user@gmail.com',
      firstName: 'User',
      lastName: 'Userovich',
      password: '123',
      token: crypto.randomUUID(),
      role: 'user',
      phoneNumber: '0555 9999999',
      status: 'super',
      cashback: '0',
    },
    {
      email: 'hotel@gmail.com',
      firstName: 'Hotel',
      lastName: 'Hotelovich',
      password: '123',
      token: crypto.randomUUID(),
      role: 'hotel',
      phoneNumber: '0555 444444',
      status: 'super',
      cashback: '0',
    },
    {
      email: 'director@gmail.com',
      firstName: 'Director',
      lastName: 'Directorovich',
      password: '123',
      token: crypto.randomUUID(),
      role: 'director',
      phoneNumber: '0555 888888',
      status: 'super',
      cashback: '0',
    },
    {
      email: 'user2@gmail.com',
      firstName: 'User2',
      lastName: 'Userovich',
      password: '123',
      token: crypto.randomUUID(),
      role: 'user',
      phoneNumber: '0555 9999998',
      status: 'super',
      cashback: '0',
    },
    {
      email: 'hotel2@gmail.com',
      firstName: 'Hotel2',
      lastName: 'Hotelovich',
      password: '123',
      token: crypto.randomUUID(),
      role: 'hotel',
      phoneNumber: '0555 888888',
      status: 'super',
      cashback: '0',
    },
  );

  const [singleRoom, doubleRoom, tripleRoom] = await RoomType.create(
    {
      name: 'single room',
    },
    {
      name: 'double room',
    },
    {
      name: 'triple room',
    },
  );

  const [plaza, hyatt, lulu] = await Hotel.create(
    {
      userId: hotel._id,
      name: 'Hotel Resident Bishkek',
      address: 'Yunusaliev Avenue Юнусалиева 102/4 Джантошева, 720005 Бишкек, Киргизия',
      location: {
        latitude: 300,
        longitude: 800,
      },
      star: 5,
      isPublished: true,
      image: 'fixtures/hyatt.jpg',
      nonSmokingRooms: false,
      parking: true,
      swimmingPool: true,
      petFriendly: false,
      city: 'bishkek',
      founding: 2000,
      lowestPrice: {
        som: 5000,
        dollar: 15,
      },
      status: 'business',
    },
    {
      userId: hotel._id,
      name: 'Central Park Resident',
      address: ' Chokmorov Street 105 , 720040 Бишкек, Киргизия',
      location: {
        latitude: 200,
        longitude: 500,
      },
      star: 5,
      isPublished: true,
      image: 'fixtures/plaza.jpg',
      nonSmokingRooms: false,
      parking: true,
      swimmingPool: true,
      petFriendly: false,
      city: 'bishkek',
      founding: 2000,
      lowestPrice: {
        som: 1000,
        dollar: 12,
      },
      status: 'premium',
    },
    {
      userId: hotel._id,
      name: 'Plaza Hotel Bishkek',
      address: 'Улица Тоголок Молдо 52, 720044 Бишкек, Кыргызстан',
      location: {
        latitude: 100,
        longitude: 100,
      },
      star: 5,
      isPublished: false,
      image: 'fixtures/plaza.jpg',
      nonSmokingRooms: false,
      parking: true,
      swimmingPool: true,
      petFriendly: false,
      city: 'bishkek',
      founding: 2000,
      lowestPrice: {
        som: 1000,
        dollar: 12,
      },
      status: 'premium',
    },
    {
      userId: hotel._id,
      name: 'Hyatt Regency',
      address: 'Abdrahmanov Street 191, 720011 Бишкек, Киргизия',
      location: {
        latitude: 50,
        longitude: 50,
      },
      star: 4,
      isPublished: false,
      image: 'fixtures/hyatt.jpg',
      nonSmokingRooms: true,
      parking: true,
      swimmingPool: false,
      petFriendly: false,
      city: 'issykKul',
      founding: 2001,
      lowestPrice: {
        som: 1100,
        dollar: 13,
      },
      status: 'premium',
    },
    {
      userId: hotel._id,
      name: 'Hotel Lulu',
      address: 'Baytik Baatyr str, 70 , 720005 Бишкек, Киргизия',
      location: {
        latitude: 150,
        longitude: 150,
      },
      star: 3,
      isPublished: false,
      image: 'fixtures/lulu.jpg',
      nonSmokingRooms: true,
      parking: true,
      swimmingPool: true,
      petFriendly: true,
      city: 'osh',
      founding: 2003,
      lowestPrice: {
        som: 1200,
        dollar: 14,
      },
      status: 'business',
    },
    {
      userId: hotel._id,
      name: 'Dostuk',
      address: 'Tynystanova 135',
      location: {
        latitude: 150,
        longitude: 150,
      },
      star: 2,
      isPublished: true,
      image: 'fixtures/lulu.jpg',
      nonSmokingRooms: true,
      parking: true,
      swimmingPool: false,
      petFriendly: true,
      city: 'bishkek',
      founding: 2005,
      lowestPrice: {
        som: 1400,
        dollar: 15,
      },
      status: 'business',
    },
    {
      userId: hotel._id,
      name: 'Jannat Regency',
      address: 'Tokombaeva, 21/2',
      location: {
        latitude: 150,
        longitude: 150,
      },
      star: 2,
      isPublished: true,
      image: 'fixtures/lulu.jpg',
      nonSmokingRooms: false,
      parking: true,
      swimmingPool: true,
      petFriendly: false,
      city: 'bishkek',
      founding: 2008,
      lowestPrice: {
        som: 1700,
        dollar: 16,
      },
      status: 'standard',
    },
  );

  await Apartment.create(
    {
      hotelId: plaza._id,
      roomTypeId: doubleRoom._id,
      price: {
        from: 100,
        till: 150,
      },
      images: ['fixtures/plaza11.jpg', 'fixtures/plaza12.jpg'],
      description: 'Awesome Plaza apartments 1',
      aircon: true,
      balcony: false,
      bath: true,
      family: false,
      food: true,
      place: 47,
      tv: false,
      towel: true,
      wifi: false,
    },
    {
      hotelId: plaza._id,
      roomTypeId: tripleRoom._id,
      price: {
        from: 150,
        till: 200,
      },
      images: ['fixtures/plaza21.jpg', 'fixtures/plaza22.jpg'],
      description: 'Awesome Plaza apartments 2',
      aircon: true,
      balcony: false,
      bath: true,
      family: false,
      food: true,
      place: 47,
      tv: false,
      towel: true,
      wifi: false,
    },
    {
      hotelId: hyatt._id,
      roomTypeId: singleRoom._id,
      price: {
        from: 200,
        till: 250,
      },
      images: ['fixtures/hyatt11.jpg', 'fixtures/hyatt12.jpg'],
      description: 'Awesome Hyatt apartments 1',
      aircon: false,
      balcony: true,
      bath: true,
      family: false,
      food: true,
      place: 47,
      tv: true,
      towel: true,
      wifi: false,
    },
    {
      hotelId: hyatt._id,
      roomTypeId: tripleRoom._id,
      price: {
        from: 250,
        till: 300,
      },
      images: ['fixtures/hyatt21.jpg', 'fixtures/hyatt22.jpg'],
      description: 'Awesome Hyatt apartments 2',
      aircon: false,
      balcony: false,
      bath: true,
      family: false,
      food: false,
      place: 47,
      tv: true,
      towel: false,
      wifi: false,
    },
    {
      hotelId: lulu._id,
      roomTypeId: doubleRoom._id,
      price: {
        from: 250,
        till: 300,
      },
      images: ['fixtures/lulu11.jpg', 'fixtures/lulu12.jpg'],
      description: 'Awesome Lulu apartments 1',
      aircon: true,
      balcony: false,
      bath: true,
      family: true,
      food: false,
      place: 47,
      tv: false,
      towel: true,
      wifi: true,
    },
    {
      hotelId: lulu._id,
      roomTypeId: tripleRoom._id,
      price: {
        from: 250,
        till: 300,
      },
      images: ['fixtures/lulu11.jpg', 'fixtures/lulu12.jpg'],
      description: 'Awesome Lulu apartments 2',
      aircon: true,
      balcony: false,
      bath: true,
      family: true,
      food: true,
      place: 47,
      tv: false,
      towel: false,
      wifi: false,
    },
  );

  const apart = await Apartment.create({
    hotelId: lulu,
    roomTypeId: tripleRoom,
    price: { from: 200, till: 300 },
    aircon: true,
    balcony: true,
    bath: true,
    family: true,
    food: true,
    place: 10,
    tv: true,
    towel: true,
    wifi: true,
  });

  await Order.create(
    {
      userId: user._id,
      adminId: admin._id,
      status: 'closed',
      apartmentId: apart._id,
      createdAt: Date.now(),
      dateArrival: '28.04.2023',
      dateDeparture: '29.04.2023',
    },
    {
      userId: user._id,
      adminId: admin._id,
      status: 'closed',
      apartmentId: apart._id,
      createdAt: Date.now(),
      dateArrival: '28.04.2023',
      dateDeparture: '29.04.2023',
    },
    {
      userId: user._id,
      adminId: admin2._id,
      status: 'closed',
      apartmentId: apart._id,
      createdAt: Date.now(),
      dateArrival: '28.04.2023',
      dateDeparture: '30.04.2023',
    },
    {
      userId: user._id,
      apartmentId: apart._id,
      createdAt: Date.now(),
      dateArrival: '30.04.2023',
      dateDeparture: '02.05.2023',
    },
    {
      userId: user2._id,
      apartmentId: apart._id,
      createdAt: Date.now(),
      dateArrival: '30.04.2023',
      dateDeparture: '01.05.2023',
    },
    {
      userId: user2._id,
      apartmentId: apart._id,
      createdAt: Date.now(),
      dateArrival: '01.05.2023',
      dateDeparture: '02.05.2023',
    },
    {
      userId: user2._id,
      apartmentId: apart._id,
      createdAt: Date.now(),
      dateArrival: '01.05.2023',
      dateDeparture: '04.05.2023',
    },
  );

  await db.close();
};

run().catch(console.error);

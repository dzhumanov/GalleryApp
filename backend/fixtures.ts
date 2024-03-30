import mongoose from 'mongoose';
import config from './config';
import User from './models/User';
import Photo from './models/Photo';

const dropCollection = async (
  db: mongoose.Connection,
  collectionName: string,
) => {
  try {
    await db.dropCollection(collectionName);
  } catch (e) {
    console.log(`Collection ${collectionName} was missing, skipping drop...`);
  }
};

const run = async () => {
  await mongoose.connect(config.mongoose.db);
  const db = mongoose.connection;

  const collections = ['users', 'photos'];

  for (const collectionName of collections) {
    await dropCollection(db, collectionName);
  }

  const [admin, user] = await User.create(
    {
      email: 'admin@local.com',
      password: '123321',
      role: 'admin',
      token: crypto.randomUUID(),
      displayName: 'Administrator',
    },
    {
      email: 'user@local.com',
      password: '123321',
      role: 'user',
      token: crypto.randomUUID(),
      displayName: 'Default user',
    },
  );

  await Photo.create(
    {
      user: admin,
      title: 'The Witcher 3',
      image: 'fixtures/witcher.jpg',
    },
    {
      user: admin,
      title: 'Valorant',
      image: 'fixtures/valorant.webp',
    },
    {
      user: admin,
      title: 'Star Wars',
      image: 'fixtures/sw.jpg',
    },
    {
      user: admin,
      title: 'Red Dead Redemption',
      image: 'fixtures/rdr.jpg',
    },
    {
      user: user,
      title: 'Minecraft',
      image: 'fixtures/minecraft.jpg',
    },
    {
      user: user,
      title: 'Mafia II',
      image: 'fixtures/mafia.jpg',
    },
    {
      user: user,
      title: 'It Takes Two',
      image: 'fixtures/itt.jpg',
    },
    {
      user: user,
      title: 'Hogwarts Legacy',
      image: 'fixtures/hogwarts.jpg',
    },
    {
      user: admin,
      title: 'God of War',
      image: 'fixtures/gow.jpg',
    },
    {
      user: admin,
      title: 'Dota 2',
      image: 'fixtures/dota.jpg',
    },
  );

  await db.close();
};

void run();

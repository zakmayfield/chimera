import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { catBreeds, dogBreeds, horseBreeds } from "./seedData";

const prisma = new PrismaClient();

enum Species {
  DOG = "DOG",
  CAT = "CAT",
  HORSE = "HORSE",
}

async function createBreed(breed: string, species: Species) {
  await prisma.breed.create({
    data: {
      breed: breed.toLowerCase(),
      species,
    },
  });
}

async function breedCreator() {
  let dog = dogBreeds.map(async (breed) => {
    await createBreed(breed, Species.DOG);
  });

  let cat = catBreeds.map(async (breed) => {
    await createBreed(breed, Species.CAT);
  });

  let horse = horseBreeds.map(async (breed) => {
    await createBreed(breed, Species.HORSE);
  });

  return {
    dog,
    cat,
    horse,
  };
}

async function seed() {
  await breedCreator()

  const userData = {
    name: "Saaratha Searingheart",
    username: "searingheart",
    email: "email-1@email.com",
    password: "123",
  };
  const { name, username, email, password } = userData;

  

  // cleanup the existing database
  await prisma.user.delete({ where: { email } }).catch(() => {
    // no worries if it doesn't exist yet
  });

  const hashedPassword = await bcrypt.hash(password, 10);

  await prisma.user.create({
    data: {
      name,
      email,
      username,
      password: {
        create: {
          hash: hashedPassword,
        },
      },
      pets: {
        create: [
          {
            name: "Gloopus",
            species: "DOG",
          },
          {
            name: "Ham",
            species: "CAT",
          },
          {
            name: "Rusty",
            species: "HORSE",
          },
        ],
      },
    },
  });

  console.log(`Database has been seeded. 🌱`);
}

seed()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

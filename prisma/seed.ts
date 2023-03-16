import { AccountType, PrismaClient } from "@prisma/client";
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
  await breedCreator();

  const userData = {
    name: "Saaratha Searingheart",
    username: "searingheart",
    email: "email-1@email.com",
    password: "123",
    type: AccountType.AGENCY,
  };
  const { name, username, email, password, type } = userData;

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
      type,
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
            bio: "Gloopus is a fantastic dog who likes to run fast and go far. Always reaching for the horizon.",
            description: "Gloopus the fantastic dog.",
            age: "YOUNG",
            sex: "MALE",
            size: "LG",
            coat: "SHORT",
            status: "ADOPTABLE",

            colors: {
              create: {
                primary: "white",
              },
            },
            attributes: {
              create: {
                isHouseTrained: true,
                hasCurrentShots: true,
              },
            },
            environment: {
              create: {
                cats: true,
                dogs: true,
                children: true,
              },
            },
          },
          {
            name: "Ham",
            species: "CAT",
            bio: "Ham is a fantastic cat who likes to chase lasers and perch up high.",
            description: "Ham the energetic cat.",
            age: "ADULT",
            sex: "FEMALE",
            size: "SM",
            coat: "MEDIUM",
            status: "ADOPTABLE",

            colors: {
              create: {
                primary: "orange",
                secondary: "white",
              },
            },
            attributes: {
              create: {
                isHouseTrained: true,
                hasCurrentShots: true,
              },
            },
            environment: {
              create: {
                dogs: true,
              },
            },
          },
          {
            name: "Rusty",
            species: "HORSE",
            bio: "Rusty is a fantastic horse who likes to chase lasers and perch up high.",
            description: "Rusty the energetic horse.",
            age: "YOUNG",
            sex: "MALE",
            status: "ADOPTABLE",

            colors: {
              create: {
                primary: "brown",
                secondary: "black",
                tertiary: "white",
              },
            },
            attributes: {
              create: {
                hasCurrentShots: true,
              },
            },
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

import { AccountType, PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { catBreeds, dogBreeds, horseBreeds, tagList } from "./seedData";

const prisma = new PrismaClient();

async function createTag(content: string) {
  await prisma.tag.create({
    data: {
      content,
    },
  });
}

async function tagCreator() {
  let tags = tagList.map(async (tag: string) => {
    await createTag(tag);
  });

  return {
    tags,
  };
}

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
  await tagCreator();

  const userData = {
    name: "Saaratha Searingheart",
    username: "searingheart",
    email: "email-1@email.com",
    password: "123",
    type: AccountType.ORGANIZATION,
    bio: "Organization dedicated to pet rehoming",
  };
  const { name, username, email, password, type, bio } = userData;

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
      bio,
      password: {
        create: {
          hash: hashedPassword,
        },
      },
      organization: {
        create: {
          name: "Dragons Den",
          email: "email-1-org@email.com",
          username: "dragonsden",
          bio: "Dragons Den is a family owned organization.",
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
                bio: "Ham is a great cat who likes to chase lasers and perch up high.",
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
                bio: "Rusty is an awesome horse who likes to eat hay.",
                description: "Rusty the lovely horse.",
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
      },
      contact: {
        create: {
          phones: {
            create: [
              {
                number: "513-123-4567",
              },
              {
                number: "877-785-9885",
              },
            ],
          },
        },
      },
      address: {
        create: {
          address: "123 main st",
          city: "Golden Gale",
          country: "Sillion",
          state: "Provis",
          zip: "21224",
        },
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

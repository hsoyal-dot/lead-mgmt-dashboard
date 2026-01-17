import mongoose from "mongoose";
import faker from "faker";
import dotenv from "dotenv";
import Lead from "../models/Lead.js";

dotenv.config();

mongoose.connect(process.env.MONGO_URI);

const seed = async () => {
  await Lead.deleteMany();

  const leads = Array.from({ length: 500 }).map(() => ({
    name: faker.name.findName(),
    email: faker.internet.email(),
    company: faker.company.companyName(),
    status: faker.random.arrayElement(["New", "Contacted", "Converted"])
  }));

  await Lead.insertMany(leads);
  console.log("Leads seeded");
  process.exit();
};

seed();
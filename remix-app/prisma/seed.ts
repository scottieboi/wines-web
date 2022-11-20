import fs from "fs";
import path from "path";
import { PrismaClient } from "@prisma/client";

const db = new PrismaClient();

const seed = async () => {
  try {
    await Promise.all(
      getWineRegions().map((region) => {
        return db.region.create({ data: { region } });
      })
    );
    console.log("Added wine regions");
  } catch (e) {
    console.log("Error with adding wine regions");
  }
};

const getWineRegions = () => {
  const data = fs.readFileSync(
    path.join(__dirname, "./data/wine-regions.csv"),
    { encoding: "utf8" }
  );
  return data.split("\n");
};

seed();

import "dotenv/config";
import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import * as schema from "../db/schema";

const sql = neon(process.env.DATABASE_URL!);

const db = drizzle(sql, { schema });

const main = async () => {
  try {
    console.log("Seeding database");
    await db.delete(schema.courses);
    await db.delete(schema.userProgress);
    await db.delete(schema.units);
    await db.delete(schema.lessons);
    await db.delete(schema.challenges);
    await db.delete(schema.challengeOptions);
    await db.delete(schema.challengeProgress);

    await db.insert(schema.courses).values([
      {
        id: 1,
        title: "Key Signatures",
        imageSrc: "/keysig.png",
      },
      {
        id: 2,
        title: "Time Signatures",
        imageSrc: "/timesig.png",
      },
      {
        id: 3,
        title: "Intervals",
        imageSrc: "/intervals.png",
      },
      {
        id: 4,
        title: "Instruments",
        imageSrc: "/violin.jpg",
      }
    ]);

    await db.insert(schema.units).values([
      {
        id: 1,
        courseId: 1,
        title: "Unit 1",
        description: "Grade 1 Key Signatures",
        order: 1,
      }
    ]);

    await db.insert(schema.lessons).values([
      {
        id: 1,
        unitId: 1,
        order: 1,
        title: "c Major",
      },
      {
        id: 2,
        unitId: 1,
        order: 2,
        title: "G Major",
      },
      {
        id: 3,
        unitId: 1,
        order: 3,
        title: "F Major",
      },
      {
        id: 4,
        unitId: 1,
        order: 4,
        title: "D Major",
      },
    ]);

    await db.insert(schema.challenges).values([
      {
        id: 1,
        lessonId: 1,
        type: "SELECT",
        order: 1,
        question: "How many accidentals are there in C Major?",
      },
    ]);

    await db.insert(schema.challengeOptions).values([
      {
        id: 1,
        challengeId: 1,
        imageSrc: "/cmaj.svg",
        correct: true,
        text: "Zero",
        audioSrc: "/cmaj.mp3",
      },
      {
        id: 2,
        challengeId: 1,
        imageSrc: "/gmaj.svg",
        correct: false,
        text: "One sharp",
        audioSrc: "/gmaj.mp3",
      },
    ]);

    console.log("Seeding finished");
  } catch (error) {
    console.error(error);
    throw new Error("Failed to seed the database");
  }
};

main();
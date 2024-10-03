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
    await db.delete(schema.userSubscription);

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
        title: "c, G, D, and F Major",
      },
      {
        id: 2,
        unitId: 1,
        order: 2,
        title: "A, Bb, and Eb Major; A, E, and D minor",
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
      {
        id: 2,
        lessonId: 1,
        type: "ASSIST",
        order: 2,
        question: "Select the accidentals belonging to F Major.",
      },
      {
        id: 3,
        lessonId: 1,
        type: "SELECT",
        order: 3,
        question: "How many accidentals are there in G Major?",
      },
      {
        id: 4,
        lessonId: 1,
        type: "ASSIST",
        order: 4,
        question: "Select the accidentals belonging to D Major.",
      },
    ]);

    await db.insert(schema.challenges).values([
      {
        id: 5,
        lessonId: 2,
        type: "SELECT",
        order: 5,
        question: "How many accidentals are there in A Major?",
      },
      {
        id: 6,
        lessonId: 2,
        type: "ASSIST",
        order: 6,
        question: "Select the accidentals belonging to Bb Major.",
      },
      {
        id: 7,
        lessonId: 2,
        type: "SELECT",
        order: 7,
        question: "How many accidentals are there in Eb Major?",
      },
    ]);

    await db.insert(schema.challengeOptions).values([
      {
        id: 1,
        challengeId: 1,
        imageSrc: "/cmaj.png",
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
      {
        id: 3,
        challengeId: 1,
        imageSrc: "/fmaj.png",
        correct: false,
        text: "One flat",
        audioSrc: "/fmaj.mp3",
      },
    ]);

    await db.insert(schema.challengeOptions).values([
      {
        id: 4,
        challengeId: 2,
        correct: false,
        text: "None",
        audioSrc: "/cmaj.mp3",
      },
      {
        id: 5,
        challengeId: 2,
        correct: false,
        text: "Bb, Eb",
        audioSrc: "/gmaj.mp3",
      },
      {
        id: 6,
        challengeId: 2,
        correct: true,
        text: "Bb",
        audioSrc: "/fmaj.mp3",
      },
    ]);

    await db.insert(schema.challengeOptions).values([
      {
        id: 7,
        challengeId: 3,
        correct: false,
        text: "Zero",
        audioSrc: "/cmaj.mp3",
      },
      {
        id: 8,
        challengeId: 3,
        correct: true,
        text: "One sharp",
        audioSrc: "/gmaj.mp3",
      },
      {
        id: 9,
        challengeId: 3,
        correct: false,
        text: "One flat",
        audioSrc: "/fmaj.mp3",
      },
    ]);

    await db.insert(schema.challengeOptions).values([
      {
        id: 10,
        challengeId: 4,
        correct: false,
        text: "One sharp",
        audioSrc: "/cmaj.mp3",
      },
      {
        id: 11,
        challengeId: 4,
        correct: true,
        text: "Two sharps",
        audioSrc: "/gmaj.mp3",
      },
      {
        id: 12,
        challengeId: 4,
        correct: false,
        text: "One flat",
        audioSrc: "/fmaj.mp3",
      },
    ]);

    await db.insert(schema.challengeOptions).values([
      {
        id: 13,
        challengeId: 5,
        correct: false,
        text: "One sharp",
        audioSrc: "/cmaj.mp3",
      },
      {
        id: 14,
        challengeId: 5,
        correct: true,
        text: "Three sharps",
        audioSrc: "/gmaj.mp3",
      },
      {
        id: 15,
        challengeId: 5,
        correct: false,
        text: "Two flats",
        audioSrc: "/fmaj.mp3",
      },
    ]);

    console.log("Seeding finished");
  } catch (error) {
    console.error(error);
    throw new Error("Failed to seed the database");
  }
};

main();
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
        courseId: 1, // Key Signatures
        title: "Unit 1",
        description: "Grade 1 Key Signatures",
        order: 1,
      },
      {
        id: 2,
        courseId: 1, // Key Signatures
        title: "Unit 2",
        description: "Grade 2 Key Signatures",
        order: 2,
      },
      {
        id: 3,
        courseId: 1, // Key Signatures
        title: "Unit 3",
        description: "Grade 3 Key Signatures",
        order: 3,
      },
      {
        id: 4,
        courseId: 1, // Key Signatures
        title: "Unit 4",
        description: "Grade 4 Key Signatures",
        order: 4,
      },
      {
        id: 5,
        courseId: 1, // Key Signatures
        title: "Unit 5",
        description: "Grade 5 Key Signatures",
        order: 5,
      },
    ]);

    await db.insert(schema.lessons).values([
      {
        id: 1,
        unitId: 1, // Grade 1 Key Signatures
        order: 1,
        title: "c and F Major",
      },
      {
        id: 2,
        unitId: 1, // Grade 1 Key Signatures
        order: 2,
        title: "G and D Major",
      },
      {
        id: 3,
        unitId: 1, // Grade 1 Key Signatures
        order: 3,
        title: "c, F, G, and D Major",
      },
    ]);

    await db.insert(schema.challenges).values([
      {
        id: 1,
        lessonId: 1, // C and F Major
        type: "SELECT",
        order: 1,
        question: "How many accidentals are there in C Major?",
      },
      {
        id: 2,
        lessonId: 1, // C and F Major
        type: "ASSIST",
        order: 2,
        question: "Select the accidentals belonging to F Major.",
      },
      {
        id: 3,
        lessonId: 1, // C and F Major
        type: "ASSIST",
        order: 3,
        question: "Select the accidentals belonging to C Major.",
      },
      {
        id: 4,
        lessonId: 1, // C and F Major
        type: "SELECT",
        order: 4,
        question: "How many accidentals are there in F Major?",
      }
    ]);

    await db.insert(schema.challenges).values([
      {
        id: 5,
        lessonId: 2, // G and D Major
        type: "SELECT",
        order: 5,
        question: "How many accidentals are there in G Major?",
      },
      {
        id: 6,
        lessonId: 2, // G and D Major
        type: "ASSIST",
        order: 6,
        question: "Select the accidentals belonging to D Major.",
      },
      {
        id: 7,
        lessonId: 2, // G and D Major
        type: "SELECT",
        order: 7,
        question: "How many accidentals are there in D Major?",
      },
      {
        id: 8,
        lessonId: 2,
        type: "ASSIST", // G and D Major
        order: 8,
        question: "Select the accidentals belonging to D Major.",
      },
    ]);

    await db.insert(schema.challengeOptions).values([
      // How many accidentals are there in C Major?
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
      // Select the accidentals belonging to F Major.
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
      // Select the accidentals belonging to C Major.
      {
        id: 7,
        challengeId: 3,
        correct: true,
        text: "Zero",
        audioSrc: "/cmaj.mp3",
      },
      {
        id: 8,
        challengeId: 3,
        correct: false,
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
      // How many accidentals are there in F Major?
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
        correct: false,
        text: "Two sharps",
        audioSrc: "/gmaj.mp3",
      },
      {
        id: 12,
        challengeId: 4,
        correct: true,
        text: "One flat",
        audioSrc: "/fmaj.mp3",
      },
    ]);

    await db.insert(schema.challengeOptions).values([
      // How many accidentals are there in G Major?
      {
        id: 13,
        challengeId: 5,
        correct: true,
        text: "One sharp",
        audioSrc: "/cmaj.mp3",
      },
      {
        id: 14,
        challengeId: 5,
        correct: false,
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
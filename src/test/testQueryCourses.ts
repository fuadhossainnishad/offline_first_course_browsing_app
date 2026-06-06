import { queryCourses } from "@/database/courseDao";

const test = await queryCourses({});
console.log("LOCAL SQLITE AFTER SYNC:", test.length);
import { updateEnrollment } from "@/database/courseDao";

export const enrollCourse = async (
    courseId: string,
    enrolled: boolean
) => {
    await updateEnrollment(courseId, enrolled);
};
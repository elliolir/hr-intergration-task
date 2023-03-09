interface Person {
  id: string;
  name: string;
}

interface CourseBase {
  id: string;
  title: string;
  date: string;
}

interface CoursePreview extends CourseBase {
  trainerId: string;
  learners: string[];
}

interface CourseFull extends CourseBase {
  trainer: Person;
  learners: Person[];
}

export { Person, CourseBase, CoursePreview, CourseFull };

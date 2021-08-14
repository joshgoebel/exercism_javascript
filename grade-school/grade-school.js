class Student {
  constructor(name, grade) {
    this.name = name
    this.grade = grade
  }
}

export class GradeSchool {
  #students
  #students_by_name
  #grades

  constructor() {
    this.#students_by_name = {}
    // this.#students = []
    this.#grades = new Set()
  }
  roster () {
    return this.gradeList.reduce((acc, el) => {
      acc[el] = this.grade(el);
      return acc
    },{})
  }
  get gradeList() {
    return [...this.#grades]
  }
  add(name, grade) {
    this.#grades.add(grade)
    let student = this.#students_by_name[name]
    if (student) {
      // moving existing student to new grade
      student.grade = grade
    } else {
      const student = new Student(name, grade)
      this.#students_by_name[name] = student
      // this.#students.push(student)
    }
  }
  grade(grade) {
    return Object.values(this.#students_by_name)
      .filter (s => s.grade === grade )
      .map(x => x.name).sort()
  }
}
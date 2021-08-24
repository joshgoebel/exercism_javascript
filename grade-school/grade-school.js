export class GradeSchool {
  #students_by_name
  #grades

  constructor() {
    this.#students_by_name = {}
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
    this.#students_by_name[name] = grade
  }
  grade(grade) {
    return Object.entries(this.#students_by_name)
      .filter (([_,studentGrade]) => studentGrade === grade )
      .map(([name,_]) => name).sort()
  }
}
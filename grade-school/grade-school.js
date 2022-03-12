// pretty, likely not fast
const clone = (x) => JSON.parse(JSON.stringify(x))

export class GradeSchool {
  #grades = {}

  roster () {
    return clone(this.#grades)
  }

  get gradeList() {
    return Object.keys(this.#grades)
  }

  removeFromAllGrades(student) {
    for (let [grade, students] of Object.entries(this.#grades)) {
      this.#grades[grade] = students.filter(name => name !== student)
    }
  }

  add(student, grade) {
    // a student may only be enrolled in a single grade
    this.removeFromAllGrades(student)
    this.#grades[grade] = this
      .grade(grade)
      .concat(student)
      .sort()
  }

  grade(grade) {
    return [ ...(this.#grades[grade] || []) ]
  }
}
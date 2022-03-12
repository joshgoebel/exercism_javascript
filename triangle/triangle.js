export class Triangle {
  constructor(a, b, c) {
    this.sides = [a,b,c]
  }

  get matchingSides() {
    let [a,b,c] = this.sides;

    if (a==b && b==c) {
      return 3
    } else if (a==b || b==c || a==c) {
      return 2
    } else {
      return 0 // no matches
    }
  }

  passesTriangleInequality() {
    let [a,b,c] = this.sides.sort()

    return a + b >= c
  }

  hasValidSides() {
    return this.sides.every(length => length > 0 );
  }

  valid() {
    return this.hasValidSides() &&
      this.passesTriangleInequality()
  }

  isEquilateral(){
    return this.valid() && this.matchingSides === 3;
  }
  isIsosceles(){
    return this.valid() && this.matchingSides >= 2;
  }
  isScalene = () =>
    return this.valid() && this.matchingSides === 0;
  }

}

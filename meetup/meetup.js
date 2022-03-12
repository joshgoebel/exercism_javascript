const WEEKDAYS = [ "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday" ]

function *daysInMonth(year, month) {
    let date = new Date(year, month, 1);

    while (date.getMonth() == month) {
        yield(new Date(date))
        date.setDate(date.getDate() + 1);
    }
}

Object.prototype.toEnum = function() {
    return new Enumerable(this)
}

class Enumerable {
    constructor(list) {
        this.list = list
    }
    [Symbol.iterator]() {
        return this.list[Symbol.iterator]()
    }
    filter(fn) {
        let el
        let iterator ={
            next: () => {
                while (!(el=this.list.next()).done) {
                    if (fn(el.value)) return el;
                }
                return el
            },
            [Symbol.iterator]: function() { return iterator; }
        }
        return new Enumerable(iterator);
    }
    find(fn) {
        for (let el of this) {
            if (fn(el)) return el;
        }
        return null
    }
    toArray(){
        return [...this.list]
    }
}

const nameOfDay = (date) => WEEKDAYS[date.getDay()]
const nextMonth = (date) => new Date(date.getYear(), date.getMonth() + 1)
const lastWeekOfMonthStarts = (d) => rewindWeek(nextMonth(d))
const rewindWeek = (date) => {
    let d = new Date(date)
    d.setDate(-6);
    return d
}

const QUALIFIER_FNS = {
    "1st": (_) => true,
    "2nd": (d) => d.getDate() >= 8,
    "teenth": (d) => d.getDate() >= 13,
    "3rd": (d) => d.getDate() >= 15,
    "4th": (d) => d.getDate() >= 22,
    "5th": (d) => d.getDate() >= 29,
    "last": (d) => d.getDate() >= lastWeekOfMonthStarts(d).getDate()
}

export const meetupDay = (year, month, dayOfWeek, qualifier) => {
    let day = daysInMonth(year,month)
        .toEnum()
        .filter(day =>
            nameOfDay(day) == dayOfWeek)
        .find(day =>
            ({
                "1st": (_) => true,
                "2nd": (d) => d.getDate() >= 8,
                "teenth": (d) => d.getDate() >= 13,
                "3rd": (d) => d.getDate() >= 15,
                "4th": (d) => d.getDate() >= 22,
                "5th": (d) => d.getDate() >= 29,
                "last": (d) => d.getDate() >= lastWeekOfMonthStarts(d).getDate()
            }[qualifier](day))
        )

    if (!day) { throw "date not found" }

    return day
}
module.exports = {
    ifEquals: (a, b, options) => {return a === b ? options.fn(this) : options.inverse(this);},
    dateFormat: (date) => {return date.split("T")[0]}
};
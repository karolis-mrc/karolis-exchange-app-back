const calculate = (data, from, to, total) => {
    const target = data.filter(item => item.some(element => element.Ccy[0] === from));
}

module.exports = {calculate};

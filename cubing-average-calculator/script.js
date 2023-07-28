document.addEventListener('DOMContentLoaded', function() {
    function calculateBestPossibleAverage(values) {
        console.log(values);
        const sanitizedValues = values.map(value => value === '' ? 0 : value);
        const sortedValues = sanitizedValues.sort((a, b) => a - b);
        const middleValues = sortedValues.slice(1, -1);
        const sum = middleValues.reduce((total, value) => total + parseFloat(value), 0);
        return sum / middleValues.length;
    }
    function calculateWorstPossibleAverage(values) {
        console.log(values);
        const sanitizedValues = values.map(value => value === '' ? Infinity : value);
        const sortedValues = sanitizedValues.sort((a, b) => a - b);
        const middleValues = sortedValues.slice(1, -1);
        const sum = middleValues.reduce((total, value) => total + parseFloat(value), 0);
        return sum / middleValues.length;
    }
    function updateAverages() {
        const values = Array.from(inputBoxes).map(input => input.value);
        const bestAverage = calculateBestPossibleAverage(values);
        const worstAverage = calculateWorstPossibleAverage(values);
        bestAverageDisplay.innerHTML = (bestAverage.toFixed(2));
        worstAverageDisplay.innerHTML = (worstAverage.toFixed(2));
    }
    const inputBoxes = document.querySelectorAll('input[type="number"]');
    bestAverageDisplay = document.getElementById('best-average');
    worstAverageDisplay = document.getElementById('worst-average');
    updateAverages();
    inputBoxes.forEach(input => input.addEventListener('input', updateAverages));
});

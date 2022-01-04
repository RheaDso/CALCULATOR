const calculator = document.querySelector('.container')
const keys = calculator.querySelector('.btn')
const display = calculator.querySelector('.display')

keys.addEventListener('click', event=> {
    if (!event.target.closest('button')) return
    const key = event.target
    const keyValue = key.textContent
    const displayValue = display.textContent
    const type = key.dataset.type
    const { previousKeyType } = calculator.dataset
    if (type === 'number') {
        if (displayValue === '0' || previousKeyType === 'operator') {
            display.textContent = keyValue
        } else {
            display.textContent = displayValue + keyValue
        }
    }
    if (type === 'operator') {
        const operatorKey = keys.querySelectorAll('[data-type="operator"]')
        operatorKey.forEach(el => { el.dataset.state = ''})
        key.dataset.state = 'selected'

        calculator.dataset.firstNumber = displayValue
        calculator.dataset.operator = key.dataset.key
    }
    if (type === 'equal') {
    
        const firstNumber = calculator.dataset.firstNumber
        const operator = calculator.dataset.operator
        const secondNumber = displayValue
        
        display.textContent = calculate(firstNumber, operator, secondNumber)
    }
    if (type === 'clear') {
        display.textContent = 0
    }

    calculator.dataset.previousKeyType = type
})
function calculate(firstNumber, operator, secondNumber) {
    firstNumber = parseFloat(firstNumber)
    secondNumber = parseFloat(secondNumber)

    if (operator === 'plus') {
        return firstNumber + secondNumber
    }
    if (operator === 'minus') {
        return firstNumber - secondNumber
    }
    if (operator === 'divide') {
        return firstNumber / secondNumber
    }
    if (operator === 'times') {
        return firstNumber * secondNumber
    }
}
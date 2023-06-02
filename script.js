console.log('script running')

// Getting elements
const billAmount = document.querySelector('.dollar-amt')
const people = document.querySelector('.ppl-input')
const tipAmt = document.querySelector('.tip-amt')
const totalAmt = document.querySelector('.total-amt')



console.log(people)
let tipBtns = document.querySelectorAll('.tip-btn')
let userInput;
let userPeople;
let ppAmount;
let calculation;

const getValue = () => {
    userInput = billAmount.value
}

const getPeople = () => {
    userPeople = people.value
    console.log(userPeople)
}



billAmount.addEventListener('input', getValue)

const calculateTip = (id) => {
    let tipPercent = parseInt(id)/100
    calculation = userInput * tipPercent
    ppAmount = calculation/userPeople
    console.log('people amount' + ppAmount)
    console.log(userInput)
    console.log(tipPercent)
    console.log(calculation)

}

tipBtns.forEach(button => {
    console.log(button.textContent)
    button.addEventListener('click', () => {
        calculateTip(button.id)
        getPeople()
        tipAmt.textContent = calculation/userPeople

    })

})


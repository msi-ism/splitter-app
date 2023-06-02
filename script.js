console.log('script running')

// Getting elements
const billAmount = document.querySelector('.bill-input')
const people = document.querySelector('.ppl-input')
const tipAmt = document.querySelector('.tip-amt')
const totalDOM = document.querySelector('.total-amt')


console.log(people)
let tipBtns = document.querySelectorAll('.tip-btn')
let userBillInput;
let userPeople = 1;
let ppAmount;
let tipOwed;
let totalAmountPP;

const getValue = () => {
    userBillInput = billAmount.value
}

const getPeople = () => {
    if (people.value > 1) {
        userPeople = people.value
    } else {
        userPeople = 1
    }
    console.log(userPeople)
}

const getTotalAmount = () => {
    if (userPeople > 1) {
        totalAmountPP = (parseInt(userBillInput) + parseInt(tipOwed)) / parseInt(userPeople)
        console.log(userPeople)
    } else {
        totalAmountPP = (parseInt(userBillInput) + parseInt(tipOwed)) / 1
    }

}

billAmount.addEventListener('input', getValue)

const calculateTip = (id) => {
    let tipPercent = parseInt(id) / 100
    tipOwed = userBillInput * tipPercent
    ppAmount = tipOwed / userPeople
    console.log('people amount' + ppAmount)
    console.log(userBillInput)
    console.log(tipPercent)
    console.log(tipOwed)

}

tipBtns.forEach(button => {
    console.log(button.textContent)
    button.addEventListener('click', () => {
        calculateTip(button.id)
        getPeople()
        getTotalAmount()
        tipAmt.textContent = `$ ${parseInt(tipOwed / userPeople)}`
        totalDOM.textContent = `$${totalAmountPP}`

    })

})


console.log('script running')

// Getting elements
const billAmount = document.querySelector('.dollar-amt')
const people = document.querySelector('.ppl-input')
const customTipInput = document.querySelector('.custom-tip')
const tipAmt = document.querySelector('.tip-amt')
const totalDOM = document.querySelector('.total-amt')
const errorText = document.querySelector('.error-text')
const peopleErrorText = document.querySelector('.ppl-error-text')


console.log(people)
let tipBtns = document.querySelectorAll('.tip-btn')
let userBillInput;
let userPeople;
let ppAmount;
let tipOwed;
let totalAmountPP;
let customTip;



const getValue = () => {
    userBillInput = billAmount.value
    errorText.style.display = 'none'
}

const getPeople = () => {
        userPeople = people.value
        peopleErrorText.style.display = 'none'
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

const getCustomTip = () => {
    customTip = parseInt(customTipInput.value) / 100
    console.log(customTip)
}

billAmount.addEventListener('input', getValue)
people.addEventListener('input', getPeople)
customTipInput.addEventListener('input', getCustomTip)


const validateBill = () => {
    if (billAmount.value >= 1) {
        return true
    } else {
        errorText.style.display = 'flex'
        errorText.textContent = "Can't Be Zero"
        return false
    }
}



const calculateTip = (id) => {
    if (billAmount.value < 1) {
        errorText.style.display = 'flex'
        errorText.textContent = "Can't Be Zero"
        console.log('should be errors')
        billAmount.style.border = '2px solid rgb(229, 166, 89)'

    }
    if (people.value < 1) {
        peopleErrorText.style.display = 'flex'
        peopleErrorText.textContent = "Can't Be Zero"
        console.log('should be errors')
        people.style.border = '2px solid rgb(229, 166, 89)'

    } else if (billAmount.value > 0 && userPeople > 0) {
        let tipPercent = parseInt(id) / 100
        tipOwed = userBillInput * tipPercent
        ppAmount = tipOwed / userPeople
        getTotalAmount()
        tipAmt.textContent = `$ ${parseInt(tipOwed / userPeople).toFixed(2)}`
        totalDOM.textContent = `$ ${totalAmountPP.toFixed(2)}`
    }
}

const calculateCustomTip = (id) => {
    if (billAmount.value < 1) {
        errorText.style.display = 'flex'
        errorText.textContent = "Can't Be Zero"
        console.log('should be errors')
        billAmount.style.border = '2px solid rgb(229, 166, 89)'

    }
    if (people.value < 1) {
        peopleErrorText.style.display = 'flex'
        peopleErrorText.textContent = "Can't Be Zero"
        console.log('should be errors')
        people.style.border = '2px solid rgb(229, 166, 89)'

    } else if (billAmount.value > 0 && userPeople > 0) {
        let tipPercent = parseInt(id) / 100
        tipOwed = userBillInput * customTip
        ppAmount = tipOwed / userPeople
        getTotalAmount()
        tipAmt.textContent = `$ ${parseInt(tipOwed / userPeople).toFixed(2)}`
        totalDOM.textContent = `$ ${totalAmountPP.toFixed(2)}`
    }
}



tipBtns.forEach(button => {
    button.addEventListener('click', () => {
        calculateTip(button.id)
    })

})


document.addEventListener('keypress', (e) => {
    let name = e.key
    let code = e.code
    console.log(e.key)
    if (name === 'Enter') {
        calculateCustomTip()
    }
})


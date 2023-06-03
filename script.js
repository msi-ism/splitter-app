console.log('script running')

// ^ Setting document variables
const billAmount = document.querySelector('.dollar-amt')
const people = document.querySelector('.ppl-input')
const customTipInput = document.querySelector('.custom-tip')
const tipAmt = document.querySelector('.tip-amt')
const totalDOM = document.querySelector('.total-amt')
const errorText = document.querySelector('.error-text')
const peopleErrorText = document.querySelector('.ppl-error-text')
const resetBtn = document.querySelector('.reset-btn')
const tipBtns = document.querySelectorAll('.tip-btn')


let userBillInput;
let userPeople;
let ppAmount;
let tipOwed;
let totalAmountPP;
let customTip;


// ^ Get value of the userBillInput box
const getValue = () => {
    userBillInput = billAmount.value
    billAmount.style.border = 'none'
    errorText.style.display = 'none'
}

// ^ Get value of the people input box
const getPeople = () => {
    userPeople = people.value
    people.style.border = 'none'
    peopleErrorText.style.display = 'none'
    console.log(userPeople)
}

// ^ Get total amount owed per person
const getTotalAmount = () => {
    if (userPeople > 1) {
        totalAmountPP = (parseInt(userBillInput) + parseFloat(tipOwed)) / parseInt(userPeople)
        console.log(userPeople)
    } else {
        totalAmountPP = (parseInt(userBillInput) + parseFloat(tipOwed)) / 1
    }
}

// ^ Get value entered in custom tip box and coverted to a decimal
const getCustomTip = () => {
    customTip = parseInt(customTipInput.value) / 100
    console.log(customTip)
}


// ^ Event listeners to listen for inputs 
billAmount.addEventListener('input', getValue)
people.addEventListener('input', getPeople)


// ^ Validate input fields before calculating tip
const validateBill = () => {
    if (billAmount.value >= 1) {
        return true
    } else {
        errorText.style.display = 'flex'
        errorText.textContent = "Can't Be Zero"
        return false
    }
}

// ^ Calculate tip or throw errors if inputs not valid
const calculateTip = (id) => {
    if (billAmount.value < 1) {
        errorText.style.display = 'flex'
        errorText.textContent = "Can't Be Zero"
        console.log('should be errors')
        billAmount.style.border = '2px solid #FFB7A5'
    }
    if (people.value < 1) {
        peopleErrorText.style.display = 'flex'
        peopleErrorText.textContent = "Can't Be Zero"
        console.log('should be errors')
        people.style.border = '2px solid #FFB7A5'

    } else if (billAmount.value > 0 && userPeople > 0) {
        let tipPercent = parseInt(id) / 100
        tipOwed = userBillInput * tipPercent
        ppAmount = tipOwed / userPeople
        getTotalAmount()
        tipAmt.textContent = `$ ${parseFloat(tipOwed / userPeople).toFixed(2)}`
        totalDOM.textContent = `$ ${totalAmountPP.toFixed(2)}`
    }
}

// ^ Calculate tip with custom amount or throw errors if inputs not valid
const calculateCustomTip = (id) => {
    if (billAmount.value < 1) {
        errorText.style.display = 'flex'
        errorText.textContent = "Can't Be Zero"
        console.log('should be errors')
        billAmount.style.border = '2px solid #FFB7A5'

    }
    if (people.value < 1) {
        peopleErrorText.style.display = 'flex'
        peopleErrorText.textContent = "Can't Be Zero"
        console.log('should be errors')
        people.style.border = '2px solid #FFB7A5'

    } else if (billAmount.value > 0 && userPeople > 0 && customTipInput.value > 0) {
        customTip = parseInt(customTipInput.value) / 100
        tipOwed = userBillInput * customTip
        ppAmount = tipOwed / userPeople
        getTotalAmount()
        tipAmt.textContent = `$ ${parseFloat(tipOwed / userPeople).toFixed(2)}`
        totalDOM.textContent = `$ ${totalAmountPP.toFixed(2)}`
    }
}

// ^ Set Active tip button
const setActive = (evt) => {
    let buttons = tipBtns
    if (billAmount.value != '' && people.value != '') {
    for (let i = 0; i <= tipBtns.length; i++) {
        if (buttons[i].classList.contains('active')) {
            buttons[i].classList.remove('active')
        }
        evt.currentTarget.classList.add('active')
    }
}
}


// ^ Event listeners to calculate tip and set active field based on button clicked
tipBtns.forEach(button => {
    button.addEventListener('click', (evt) => {
        calculateTip(button.id)
        setActive(evt)
    })

})

// ^ Reset app to default state

const resetApp = () => {
    let zero = 0
    console.log('button working')
    billAmount.value = null
    people.value = null
    billAmount.style.border = 'none'
    people.style.border = 'none'
    errorText.style.display = 'none'
    peopleErrorText.style.display = 'none'
    customTipInput.value = null
    tipAmt.textContent = `$${zero.toFixed(2)}`
    totalDOM.textContent = `$${zero.toFixed(2)}`
    let buttons = tipBtns
    for (let i = 0; i <= tipBtns.length; i++) {
        if (buttons[i].classList.contains('active')) {
            buttons[i].classList.remove('active')
        }
    }

}

// ^ Prevents input into custom tip field if other input fields are not valie

if (billAmount.value == '' || people.value == '') {
    customTipInput.addEventListener('keypress', (evt) => {
        if (billAmount.value == '') {
            evt.preventDefault()
            errorText.style.display = 'flex'
            errorText.textContent = "Can't Be Zero"
            billAmount.style.border = '2px solid #FFB7A5'
        }
        if (people.value == '') {
            evt.preventDefault()
            peopleErrorText.style.display = 'flex'
            peopleErrorText.textContent = "Can't Be Zero"
            people.style.border = '2px solid #FFB7A5'
        }
    })
}
// ^ Event listeners for reset button and to calculate tip as custom tip is entered

resetBtn.addEventListener('click', resetApp)
customTipInput.addEventListener('input', calculateCustomTip)


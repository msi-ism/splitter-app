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
let currentTip;
let buttons;


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
}

// ^ Get total amount owed per person
const getTotalAmount = () => {
    if (userPeople > 1) {
        totalAmountPP = (parseFloat(userBillInput) + parseFloat(tipOwed)) / parseFloat(userPeople)
    } else {
        totalAmountPP = (parseFloat(userBillInput) + parseFloat(tipOwed)) / 1
    }
}

// ^ Get value entered in custom tip box and coverted to a decimal
const getCustomTip = () => {
    customTip = parseFloat(customTipInput.value) / 100
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
        billAmount.style.border = '2px solid #FFB7A5'
    }
    if (people.value < 1) {
        peopleErrorText.style.display = 'flex'
        peopleErrorText.textContent = "Can't Be Zero"
        people.style.border = '2px solid #FFB7A5'

    } else if (billAmount.value > 0 && userPeople > 0) {
        currentTip = parseFloat(id) / 100
        tipOwed = userBillInput * currentTip
        ppAmount = tipOwed / userPeople
        getTotalAmount()
        tipAmt.textContent = `$${parseFloat(tipOwed / userPeople).toFixed(2)}`
        totalDOM.textContent = `$${totalAmountPP.toFixed(2)}`
    }
}

// ^ Calculate tip or throw errors if inputs not valid
const calculateTipChange = () => {
if (billAmount.value > 0 && userPeople > 0 && currentTip > 0) {
        
        tipOwed = userBillInput * currentTip
        ppAmount = tipOwed / userPeople
        getTotalAmount()
        tipAmt.textContent = `$${parseFloat(tipOwed / userPeople).toFixed(2)}`
        totalDOM.textContent = `$${totalAmountPP.toFixed(2)}`
    }
}



// ^ Calculate tip with custom amount or throw errors if inputs not valid
const calculateCustomTip = () => {
    if (billAmount.value < 1) {
        errorText.style.display = 'flex'
        errorText.textContent = "Can't Be Zero"
        billAmount.style.border = '2px solid #FFB7A5'

    }
    if (people.value < 1) {
        peopleErrorText.style.display = 'flex'
        peopleErrorText.textContent = "Can't Be Zero"
        people.style.border = '2px solid #FFB7A5'

    } else if (billAmount.value > 0 && userPeople > 0 && customTipInput.value > 0) {
        customTip = parseFloat(customTipInput.value) / 100
        currentTip = customTip
        tipOwed = userBillInput * customTip
        ppAmount = tipOwed / userPeople
        getTotalAmount()
        tipAmt.textContent = `$${parseFloat(tipOwed / userPeople).toFixed(2)}`
        totalDOM.textContent = `$${totalAmountPP.toFixed(2)}`
        clearActive()
    }
}

// ^ Set Active tip button
const setActive = (evt) => {
    buttons = tipBtns
    if (billAmount.value != '' && people.value != '') {
       buttons.forEach(button => {
            if (button.classList.contains('active')) {
                button.classList.remove('active')
            }
            evt.currentTarget.classList.add('active')
        })
        
    }
}

// ^ Clear active tip button
const clearActive = () => {
    buttons = tipBtns
    buttons.forEach(button => {
        if (button.classList.contains('active')) {
            button.classList.remove('active')
        }
    })
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
    billAmount.value = null
    people.value = null
    currentTip = null
    billAmount.style.border = 'none'
    people.style.border = 'none'
    errorText.style.display = 'none'
    peopleErrorText.style.display = 'none'
    customTipInput.value = null
    tipAmt.textContent = `$${zero.toFixed(2)}`
    totalDOM.textContent = `$${zero.toFixed(2)}`
    clearActive()

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
billAmount.addEventListener('change', calculateTipChange)
people.addEventListener('change', calculateTipChange)
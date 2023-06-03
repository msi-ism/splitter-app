console.log('script running')

// Getting elements
const billAmount = document.querySelector('.dollar-amt')
const people = document.querySelector('.ppl-input')
const customTipInput = document.querySelector('.custom-tip')
const tipAmt = document.querySelector('.tip-amt')
const totalDOM = document.querySelector('.total-amt')
const errorText = document.querySelector('.error-text')
const peopleErrorText = document.querySelector('.ppl-error-text')
const resetBtn = document.querySelector('.reset-btn')
const tipBtns = document.querySelectorAll('.tip-btn')

console.log(tipBtns)




let userBillInput;
let userPeople;
let ppAmount;
let tipOwed;
let totalAmountPP;
let customTip;



const getValue = () => {
    userBillInput = billAmount.value
    billAmount.style.border = 'none'
    errorText.style.display = 'none'
}

const getPeople = () => {
    userPeople = people.value
    people.style.border = 'none'
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

const setActive = (evt) => {
    let buttons = tipBtns
    for (let i = 0; i <= tipBtns.length; i++) {
        if (buttons[i].classList.contains('active')) {
            buttons[i].classList.remove('active')
        }
        evt.currentTarget.classList.add('active')
    }
}



tipBtns.forEach(button => {
    button.addEventListener('click', (evt) => {
        calculateTip(button.id)
        setActive(evt)
    })

})


document.addEventListener('keypress', (e) => {
    let name = e.key
    let code = e.code
    if (name === 'Enter') {
        calculateCustomTip()
    }
})


const resetApp = () => {
    let zero = 0
    console.log('button working')
    billAmount.value = null
    people.value = null
    billAmount.style.border = 'none'
    people.style.border = 'none'
    customTipInput.value = null
    tipAmt.textContent = `$${zero.toFixed(2)}`
    totalDOM.textContent = `$${zero.toFixed(2)}`

}
resetBtn.addEventListener('click', resetApp)


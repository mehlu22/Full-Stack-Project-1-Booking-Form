let username = document.getElementById('username');
let firstName = document.getElementById('first_name');
let lastName = document.getElementById('last_name');

let phone = document.getElementById('phone_number');
let fax = document.getElementById('fax_number');
let email = document.getElementById('email');

let checkIn = document.getElementById('checkIn');
checkIn.min = moment(new Date()).format('YYYY-MM-DD');

let checkOut = document.getElementById('checkOut');
checkOut.min = moment(checkIn.min, 'YYYY-MM-DD').add(1, 'days').format('YYYY-MM-DD');

let days = document.getElementById("days");
let adults = document.getElementById("adults");
let cost = document.getElementById("cost");

let message = document.getElementById('message');


const inputs = [username, firstName, lastName, phone, fax, email, checkIn, checkOut, days, cost];
const names = ['Username', 'First Name', 'Last Name', 'Phone Number', 'Fax Number', 'Email Address', 'Check-In Date', 'Check-Out Date',
                    'Days', 'Cost']

let range = document.getElementById('range');
let low = document.getElementById('low');
let med = document.getElementById('med');
let high = document.getElementById('high');
let reset = document.getElementById('reset');
let submit = document.getElementById('submit')

for(let x = 2; x <= 10; x++) {
    adults.innerHTML += '<option value=' + x + '>' + x + '</option>';
}

checkIn.onchange = function() {
    checkOut.min = moment(checkIn.value, 'YYYY-MM-DD').add(1, 'days').format('YYYY-MM-DD');
    if (moment(checkIn.value, 'YYYY-MM-DD') > moment(checkOut.value, 'YYYY-MM-DD')) {
        checkOut.value = "";
    }
    if(checkOut.value != "") {
        days.value = moment(checkOut.value, 'YYYY-MM-DD').diff(moment(checkIn.value, 'YYYY-MM-DD'), 'days');
    }
    else {
        days.value = "";
        cost.value = "";
    }
    if(days.value != "") {
        cost.value = days.value * adults.value * 150;
    }
}

checkOut.onchange = function () {
    if (checkIn.value != "") {
        days.value = moment(checkOut.value, 'YYYY-MM-DD').diff(moment(checkIn.value, 'YYYY-MM-DD'), 'days');
    }
    if(days.value != "") {
        console.log(days.value);
        console.log(adults.value);
        cost.value = days.value * adults.value * 150;
    }
}

adults.onchange = function () {
    if(days.value != "") {
        cost.value = days.value * adults.value * 150;
    }
};

$('#reset').on('click', function() {
    for(let i = 0; i < inputs.length; i++) {
        inputs[i].value = "";
        inputs[i].parentElement.classList.remove('has-error');
    }
    adults.value = 1;
    range.value = 5;
    low.checked = true;
    med.checked = false;
    high.checked = false;
    toastr.info('Form has been reset successfully.');
});

$('#submit').on('click', function() {
    let counter = 0;
    for(let x = 0; x < inputs.length; x++) {
        if(inputs[x].value == "" & x!= 8 & x != 9) {
            if(x < 6 | x == 10) {
                inputs[x].parentElement.classList.add('has-error');
            }
            counter++;
            toastr.options = {
                "newestOnTop": false,
                "positionClass": "toast-top-right"
            }
            toastr.error('Error: ' + names[x] + ' has not filled in.');
        }
        else if(x < 6 | x == 10) {
            inputs[x].parentElement.classList.remove('has-error');
        }
    }
    if(cost.value < 0 | cost.value == "") {
        toastr.error('Error: Price must be positive.');
    }
    else if(counter == 0) {
        toastr.options = {
            "positionClass": "toast-top-right"
        }
        toastr.success('Form has been successfully submitted! Thank you.');
    }
});
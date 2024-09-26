// toggling between Donation and History buttons
const donationBtn = document.getElementById('donation-btn');
const historyBtn = document.getElementById('history-btn');
const donationSect = document.getElementById('donation-section');
const historySect = document.getElementById('history-section');

donationBtn.addEventListener('click', function () {
  donationBtn.classList.add('bg-lime-300', 'text-black');
  donationBtn.classList.remove('bg-gray-200', 'text-gray-700');
  historyBtn.classList.add('bg-gray-200', 'text-gray-700');
  historyBtn.classList.remove('bg-lime-300', 'text-black');
  donationSect.style.display = 'flex';
  historySect.style.display = 'none';
});

historyBtn.addEventListener('click', function () {
  historyBtn.classList.add('bg-lime-300', 'text-black');
  historyBtn.classList.remove('bg-gray-200', 'text-gray-700');
  donationBtn.classList.add('bg-gray-200', 'text-gray-700');
  donationBtn.classList.remove('bg-lime-300', 'text-black');
  donationSect.style.display = 'none';
  historySect.style.display = 'flex';
});


// Initially donation section 
donationSect.style.display = 'flex';
historySect.style.display = 'none';



// **********************************************
// Function to show the modal
function showCongratsModal() {
  document.getElementById('CongratsModal').classList.remove('hidden');
}

// hiding the modal
document.getElementById('closeModalBtn').addEventListener('click', function() {
  document.getElementById('CongratsModal').classList.add('hidden');
});


// *********************************************
// Function to update the donation history
function showHistory(purpose, amount) {
  const historySection = document.getElementById('donationHistoryList');
  
  // Create a new list item for the history
  const newHistoryItem = document.createElement('li');
  newHistoryItem.classList.add('bg-white', 'p-4', 'mb-2', 'rounded-lg', 'shadow-md');
  
  // Get the current date and time
  const currentDate = new Date();
  const dateString = currentDate.toLocaleString('en-GB', { timeZone: 'Asia/Dhaka', hour12: false });
  
  // Add the donation info to the new list item
  newHistoryItem.innerHTML = `
    <strong>${amount} BDT is Donated for ${purpose}</strong><br>
    Date: ${dateString} (Bangladesh Standard Time)
  `;
  
  // Prepend the new history item to the history list
  historySection.prepend(newHistoryItem);
}




// ******************************
// creating a common function
function donateNowButton(donationAmountInputID, totalDonationID){
  let availableBalance = parseFloat(document.getElementById('balance').innerText)
  let donationAmount= parseFloat(document.getElementById(donationAmountInputID).value);

  if (isNaN(donationAmount) || donationAmount === "" || donationAmount <= 0) {
    alert("Please enter a valid number greater than 0.");
    return; // Exiting the function if the input is invalid
  }

  if (availableBalance >= donationAmount) {
    let previousDonation = parseFloat(document.getElementById(totalDonationID).innerText)
    let totalDonation = previousDonation + donationAmount

    document.getElementById(totalDonationID).innerText = totalDonation.toFixed(1);

    let remainingBalance= availableBalance - donationAmount
    document.getElementById('balance').innerText = remainingBalance.toFixed(2)
    showCongratsModal();

    if (totalDonationID =='total-donation-noakhali'){
      purpose = 'noakhali'
    }else if (totalDonationID == 'total-donation-feni'){
      purpose = 'feni'
    }else{purpose="quota"}

    showHistory(purpose, donationAmount);
    

  }else{
    console.log("You don't have enough balance")
  }
}


// Calling Common Function three times
document.getElementById('donate-now-noakhali').addEventListener('click', function() {
  donateNowButton('donation-amount-noakhali', 'total-donation-noakhali');
});

document.getElementById('donate-now-feni').addEventListener('click', function() {
  donateNowButton('donation-amount-feni', 'total-donation-feni');
});

document.getElementById('donate-now-quota').addEventListener('click', function() {
  donateNowButton('donation-amount-quota', 'total-donation-quota');
});





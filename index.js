document.addEventListener('DOMContentLoaded', () => {
  const mortgageAmountInput = document.getElementById('mortgageAmount');
  const mortgageTermInput = document.getElementById('mortgageTerm');
  const interestRateInput = document.getElementById('interestRate');
  const mortgageTypeRadios = document.querySelectorAll('input[name="mortgageType"]');
  const calculateBtn = document.getElementById('calculateBtn');
  const resultsCard = document.getElementById('resultsCard');
  const monthlyRepaymentsSpan = document.getElementById('monthlyRepayments');
  const totalRepaySpan = document.getElementById('totalRepay');
  const clearAllLink = document.getElementById('clearAll');

  function calculateMortgage() {
    const principal = parseFloat(mortgageAmountInput.value);
    const termYears = parseFloat(mortgageTermInput.value);
    const annualInterestRate = parseFloat(interestRateInput.value);
    let mortgageType = 'repayment';

    mortgageTypeRadios.forEach(radio => {
      if (radio.checked) mortgageType = radio.value;
    });

    if (isNaN(principal) || isNaN(termYears) || isNaN(annualInterestRate) || principal <= 0 || termYears <= 0 || annualInterestRate < 0) {
      alert('Please enter valid positive numbers.');
      resultsCard.classList.remove('active');
      return;
    }

    const monthlyInterestRate = (annualInterestRate / 100) / 12;
    const numberOfPayments = termYears * 12;

    let monthlyPayment = 0;
    let totalRepayable = 0;

    if (mortgageType === 'repayment') {
      if (monthlyInterestRate === 0) {
        monthlyPayment = principal / numberOfPayments;
        totalRepayable = principal;
      } else {
        monthlyPayment = principal * (monthlyInterestRate * Math.pow(1 + monthlyInterestRate, numberOfPayments)) /
                         (Math.pow(1 + monthlyInterestRate, numberOfPayments) - 1);
        totalRepayable = monthlyPayment * numberOfPayments;
      }
    } else {
      monthlyPayment = principal * monthlyInterestRate;
      totalRepayable = (monthlyPayment * numberOfPayments) + principal;
    }

    monthlyRepaymentsSpan.textContent = `£${monthlyPayment.toFixed(2)}`;
    totalRepaySpan.textContent = `£${totalRepayable.toFixed(2)}`;
    resultsCard.classList.add('active');
  }

  calculateBtn.addEventListener('click', calculateMortgage);

  clearAllLink.addEventListener('click', (e) => {
    e.preventDefault();
    mortgageAmountInput.value = '';
    mortgageTermInput.value = '';
    interestRateInput.value = '';
    mortgageTypeRadios[0].checked = true;
    resultsCard.classList.remove('active');
  });

  calculateMortgage(); // Auto-calculate on load (optional)
});
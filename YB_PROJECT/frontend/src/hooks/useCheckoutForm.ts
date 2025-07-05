import { useState, useCallback, useMemo } from 'react';

interface CardErrors {
  cardNumber: string;
  expiryDate: string;
  cvv: string;
}

interface UseCheckoutFormReturn {
  // Form data
  cardNumber: string;
  expiryDate: string;
  cvv: string;
  selectedPlan: string;
  cardErrors: CardErrors;
  
  // Form handlers
  handleCardNumberChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleExpiryDateChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleCvvChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  setSelectedPlan: (plan: string) => void;
  
  // Actions
  handlePayNow: () => boolean;
  resetForm: () => void;
}

export function useCheckoutForm(): UseCheckoutFormReturn {
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [selectedPlan, setSelectedPlan] = useState("1month");
  const [cardErrors, setCardErrors] = useState<CardErrors>({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
  });

  // Regex patterns for validation - memoized to avoid re-creation
  const validationRegex = useMemo(() => ({
    cardNumber: /^[0-9]{13,19}$/,
    expiryDate: /^(0[1-9]|1[0-2])\/([0-9]{2})$/,
    cvv: /^[0-9]{3,4}$/,
  }), []);

  // Format card number with spaces
  const formatCardNumber = useCallback((value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(' ');
    } else {
      return v;
    }
  }, []);

  // Format expiry date with slash
  const formatExpiryDate = useCallback((value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    if (v.length >= 2) {
      return v.substring(0, 2) + '/' + v.substring(2, 4);
    }
    return v;
  }, []);

  // Validate card number
  const validateCardNumber = useCallback((value: string) => {
    const cleanValue = value.replace(/\s/g, '');
    if (!cleanValue) return "Card number is required";
    if (!validationRegex.cardNumber.test(cleanValue)) return "Invalid card number";
    return "";
  }, [validationRegex.cardNumber]);

  // Validate expiry date
  const validateExpiryDate = useCallback((value: string) => {
    if (!value) return "Expiry date is required";
    if (!validationRegex.expiryDate.test(value)) return "Invalid expiry date (MM/YY)";
    
    const [month, year] = value.split('/');
    const currentYear = new Date().getFullYear() % 100;
    const currentMonth = new Date().getMonth() + 1;
    
    if (parseInt(year) < currentYear || (parseInt(year) === currentYear && parseInt(month) < currentMonth)) {
      return "Card has expired";
    }
    return "";
  }, [validationRegex.expiryDate]);

  // Validate CVV
  const validateCvv = useCallback((value: string) => {
    if (!value) return "CVV is required";
    if (!validationRegex.cvv.test(value)) return "Invalid CVV";
    return "";
  }, [validationRegex.cvv]);

  const handleCardNumberChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCardNumber(e.target.value);
    setCardNumber(formatted);
    setCardErrors(prev => ({ ...prev, cardNumber: validateCardNumber(formatted) }));
  }, [formatCardNumber, validateCardNumber]);

  const handleExpiryDateChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatExpiryDate(e.target.value);
    setExpiryDate(formatted);
    setCardErrors(prev => ({ ...prev, expiryDate: validateExpiryDate(formatted) }));
  }, [formatExpiryDate, validateExpiryDate]);

  const handleCvvChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9]/g, '').substring(0, 4);
    setCvv(value);
    setCardErrors(prev => ({ ...prev, cvv: validateCvv(value) }));
  }, [validateCvv]);

  const handlePayNow = useCallback(() => {
    // Validate all fields
    const cardNumberError = validateCardNumber(cardNumber);
    const expiryDateError = validateExpiryDate(expiryDate);
    const cvvError = validateCvv(cvv);

    setCardErrors({
      cardNumber: cardNumberError,
      expiryDate: expiryDateError,
      cvv: cvvError,
    });

    // If no errors, proceed with payment
    if (!cardNumberError && !expiryDateError && !cvvError) {
      // Handle payment logic here
      console.log('Processing payment...');
      return true;
    }
    return false;
  }, [cardNumber, expiryDate, cvv, validateCardNumber, validateExpiryDate, validateCvv]);

  const resetForm = useCallback(() => {
    setCardNumber("");
    setExpiryDate("");
    setCvv("");
    setSelectedPlan("1month");
    setCardErrors({
      cardNumber: "",
      expiryDate: "",
      cvv: "",
    });
  }, []);

  return {
    // Form data
    cardNumber,
    expiryDate,
    cvv,
    selectedPlan,
    cardErrors,
    
    // Form handlers
    handleCardNumberChange,
    handleExpiryDateChange,
    handleCvvChange,
    setSelectedPlan,
    
    // Actions
    handlePayNow,
    resetForm,
  };
}

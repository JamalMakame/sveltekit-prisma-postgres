export function isValidPhone(phoneNumber: string): boolean {
	// You can customize this validation based on the specific requirements for WhatsApp phone numbers.
	// For simplicity, this example checks if the phone number starts with '+' and contains only numeric characters.

	const cleanedNumber = phoneNumber.replace(/\D/g, ''); // Remove non-numeric characters
	console.log(cleanedNumber);

	return /^\d+$/.test(cleanedNumber);
}

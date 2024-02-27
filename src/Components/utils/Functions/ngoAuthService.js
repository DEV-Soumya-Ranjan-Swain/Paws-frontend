import axios from "axios";
import isValidEmail from "./emailValidator";
import isValidPhoneNumber from "./phoneNumberValidator";

/**
 * Performs a login request to the backend server.
 * 
 * @param {string} email - The email address of the user trying to login.
 * @param {string} password - The password of the user trying to login.
 * @param {Function} setError - A function to set the error message in the component state.
 * @param {Function} setButtonState - A function to set the state of the login button (idle/loading/success/error).
 * @returns {void}
 */
export const login = async (email, password, setError, setButtonState) => {
    // Validate the email address
    if (!isValidEmail(email)) {
        setError("Enter a valid email address.");
        return;
    }

    try {
        // Clear any previous error message and set button state to loading
        setError("");
        setButtonState('loading');

        // Send a POST request to the login endpoint with email and password
        const response = await axios.post(
            "https://aniresfr-backend.vercel.app/login/",
            {
                email,
                password
            }
        );

        // Set button state to success and extract token from response
        setButtonState('success');
        const token = response.data.token;

        // Save token to local storage and redirect user to home page
        localStorage.setItem("csrftoken", token);
        window.location.href = "/";
    } catch (error) {
        // Set button state to error and handle error message
        setButtonState("error");
        if (error.response && error.response.data.error) {
            setError(error.response.data.error);
        } else {
            setError("An error occurred while logging in.");
        }
    }
};


/**
 * Performs a registration request to the backend server.
 * 
 * @param {string} orgName - The name of the organization registering.
 * @param {number} phoneNumber - The phone number of the organization registering.
 * @param {string} email - The email address of the organization registering.
 * @param {password} password - The password of the organization registering.
 * @param {string} emergency - The emergency contact of the organization registering.
 * @param {string} password - The password of the organization registering.
 * @param {string} error - The error message to be displayed if registration fails.
 * @param {string} location - The specific location of the organization.
 * @param {string} websiteLink - The website link of the organization.
 * @param {number} latitude - The latitude of the organization.
 * @param {number} longitude - The longitude of the organization.
 * @returns {void}
 * @throws {Error} Throws an error if the email or phone number is not valid or if there's an error during the registration process.
 */
export const registration = async (orgName, phoneNumber, email, emergency, password, location, websiteLink, latitude, longitude, setError, setButtonState) => {
    // Validate the email address
    if (!isValidEmail(email)) {
        setError("Enter a valid email address.");
        return;
    }

    // Validate the phone number
    if (!isValidPhoneNumber(phoneNumber)) {
        setError("Enter a valid phone number.");
        return;
    }

    if (!isValidPhoneNumber(emergency)) {
        setError("Enter a valid emergency contact number.");
        return;
    }

    try {
        // Clear any previous error message and set button state to loading
        setError("");
        setButtonState('loading');

        // Send a POST request to the registration endpoint with user data
        const response = await axios.post(
            "https://aniresfr-backend.vercel.app/register/ngo",
            {
                name: orgName,
                phone_number: phoneNumber,
                email: email,
                password: password,
                emergency_contact_number: emergency,
                animals_supported: [], // You need to replace this with the actual data
                website: websiteLink,
                address: "temp", //You need to replace this with the actual data
                latitude: latitude, 
                longitude: longitude,
            }
        );

        // Set button state to success and initiate login
        setButtonState('success');
        const token = response.data.token;
        localStorage.setItem("csrftoken", token);
        window.location.href = "/";
    } catch (error) {
        // Set button state to error and handle error message
        setButtonState('error');
        if (error.response && error.response.data.error) {
            setError(error.response.data.error);
        } else {
            setError("An error occurred while registering.");
        }
    }
};

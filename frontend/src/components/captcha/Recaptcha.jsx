import { useEffect } from "react";
import PropTypes from "prop-types";

const Recaptcha = ({ action = "login", onVerify }) => {
    useEffect(() => {
        const siteKey = import.meta.env.VITE_GOOGLE_SITE_KEY;

        const loadRecaptcha = () => {
            if (!window.grecaptcha) {
                console.error("Google reCAPTCHA not loaded.");
                return;
            }

            window.grecaptcha.ready(() => {
                console.log("reCAPTCHA ready, executing...");
                window.grecaptcha.execute(siteKey, { action }).then((token) => {
                    console.log("reCAPTCHA Token:", token); // Debugging
                    if (onVerify) onVerify(token); // Send token to parent
                }).catch((err) => {
                    console.error("reCAPTCHA execution error:", err);
                });
            });
        };

        if (window.grecaptcha) {
            loadRecaptcha();
        } else {
            const script = document.createElement("script");
            script.src = `https://www.google.com/recaptcha/api.js?render=${siteKey}`;
            script.async = true;
            script.defer = true;
            script.onload = loadRecaptcha;
            document.head.appendChild(script);
        }
    }, [action, onVerify]);

    return null; // No visible UI needed for reCAPTCHA v3
};

// ✅ Add PropTypes validation
Recaptcha.propTypes = {
    action: PropTypes.string,
    onVerify: PropTypes.func.isRequired,
};

export default Recaptcha;

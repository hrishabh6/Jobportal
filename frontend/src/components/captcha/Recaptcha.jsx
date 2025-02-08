import { useEffect, useCallback, useRef } from "react";
import PropTypes from "prop-types";

const RECAPTCHA_REFRESH_INTERVAL = 110000; // Refresh every 110 seconds (tokens expire at 120 seconds)

const Recaptcha = ({ action = "login", onVerify }) => {
    const tokenRefreshTimer = useRef(null);
    const siteKey = import.meta.env.VITE_GOOGLE_SITE_KEY;

    const executeRecaptcha = useCallback(async () => {
        if (!window.grecaptcha) {
            console.error("Google reCAPTCHA not loaded.");
            return null;
        }

        try {
            const token = await window.grecaptcha.execute(siteKey, { action });
            console.log("New reCAPTCHA token generated");
            onVerify(token);
            return token;
        } catch (err) {
            console.error("reCAPTCHA execution error:", err);
            return null;
        }
    }, [siteKey, action, onVerify]);

    // Setup periodic token refresh
    const setupTokenRefresh = useCallback(() => {
        if (tokenRefreshTimer.current) {
            clearInterval(tokenRefreshTimer.current);
        }

        tokenRefreshTimer.current = setInterval(() => {
            executeRecaptcha();
        }, RECAPTCHA_REFRESH_INTERVAL);
    }, [executeRecaptcha]);

    useEffect(() => {
        const loadRecaptcha = () => {
            window.grecaptcha.ready(async () => {
                await executeRecaptcha();
                setupTokenRefresh();
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

        // Cleanup
        return () => {
            if (tokenRefreshTimer.current) {
                clearInterval(tokenRefreshTimer.current);
            }
        };
    }, [executeRecaptcha, setupTokenRefresh, siteKey]);

    // Expose refresh method
    if (window.refreshRecaptcha === undefined) {
        window.refreshRecaptcha = executeRecaptcha;
    }

    return null;
};

Recaptcha.propTypes = {
    action: PropTypes.string,
    onVerify: PropTypes.func.isRequired,
};

export default Recaptcha;
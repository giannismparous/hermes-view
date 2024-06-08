
import React, { useEffect } from "react";
import LandingForm from "./ReservationSystemLandingPage";
import '../styles/ReservationSystem.css';

function ReservationSystem() {
    const hermesViewBlueImgPath = '../icons/hermes-view-logo-new-blue.png';


    useEffect(() => {
        // Initialize Facebook Pixel
        (function(f, b, e, v, n, t, s) {
            if (f.fbq) return; 
            n = f.fbq = function() {
                n.callMethod ?
                    n.callMethod.apply(n, arguments) : n.queue.push(arguments);
            };
            if (!f._fbq) f._fbq = n;
            n.push = n; n.loaded = !0; n.version = '2.0'; n.queue = [];
            t = b.createElement(e); t.async = !0;
            t.src = v; s = b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t, s);
        }(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js'));

        window.fbq('init', '1477714302952075');
        window.fbq('track', 'PageView');
    }, []);

    const handleFormSubmit = (event) => {
        event.preventDefault();
        const form = event.target;
        const formData = new FormData(form);
        const xhr = new XMLHttpRequest();
        xhr.open(form.method, form.action, true);
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

        xhr.onreadystatechange = function () {
            if (xhr.readyState === XMLHttpRequest.DONE) {
                if (xhr.status === 200) {
                    console.log('Form submitted successfully');
                    if (window.fbq) {
                        window.fbq('track', 'Register', {eventID: 'unique-event-id'});
                    }
                } else {
                    console.error('Form submission failed:', xhr.statusText);
                }
            }
        };

        const params = new URLSearchParams();
        formData.forEach((value, key) => {
            params.append(key, value);
        });
        xhr.send(params.toString());
    };


    return (
        <div className="reservation-system">
            <header className="reservation-system-header">
                {/* <img src={hermesViewBlueImgPath} alt="HermesView Logo" className="logo" /> */}
            </header>
            <div className="reservation-system-content">
                <div className="reservation-system-info-container" id="WhyNow">
                    <h2>Γιατί να το δοκιμάσεις τώρα;</h2>
                    <p>
                        Επιλέγουμε 5 εστιατόρια στην Αθήνα για να συμμετάσχουν σε μια <strong>ΔΩΡΕΑΝ</strong> δοκιμή της εφαρμογής διάρκειας 6 εβδομάδων.
                    </p>
                    <p>
                        Τα εστιατόρια θα πρέπει να συνεργαστούν στενά για την προσαρμογή του προγράμματος στις ανάγκες τους.
                    </p>
                </div>
                <div className="reservation-system-form-container">
                    <h2>Δήλωση ενδιαφέροντος</h2>
                    <LandingForm />
                </div>
                <div className="reservation-system-info-container" id="WhyDoIt">
                    <h2>Γιατί χρειάζεστε σύστημα κρατήσεων</h2>
                    <p>
                        Εστιατόρια: Αυτό το σύστημα είναι ιδανικό για οποιοδήποτε εστιατόριο, ειδικά για εκείνα που επιθυμούν:
                    </p>
                    <ul>
                        <li><strong>Αύξηση των κρατήσεων</strong>: ξεχωρίστε από τον ανταγωνισμό με μια εμπειρία VR που προσελκύει τους πελάτες με μια κλεφτή ματιά στην ατμόσφαιρα σας.</li>
                        <li><strong>Βελτίωση της επιλογής τραπεζιού</strong>: Επιτρέψτε στους επισκέπτες να εξερευνήσουν εικονικά τον χώρο σας και να επιλέξουν το τέλειο τραπέζι για την περίσταση τους, μειώνοντας τη σύγχυση και τον χαμένο χρόνο κατά την άφιξη.</li>
                        <li><strong>Ανάδειξη μοναδικών χαρακτηριστικών</strong>: Έχετε μια εκπληκτική ταράτσα ή μια μοναδική ιδιωτική τραπεζαρία; Το VR σάς επιτρέπει να επιδείξετε αυτά τα χαρακτηριστικά και να αυξήσετε την ελκυστικότητά τους.</li>
                    </ul>
                    <p>
                        Η εικονική περιήγηση είναι προαιρετική και η εφαρμογή μπορεί να λειτουργήσει και χωρίς αυτήν.
                    </p>
                </div>
            </div>
        </div>
    );
}

export default ReservationSystem;

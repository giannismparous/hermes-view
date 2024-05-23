// src/App.js
import React from "react";
import LandingForm from "./ReservationSystemLandingPage";
import '../styles/ReservationSystem.css';

function ReservationSystem() {

    const hermesViewBlueImgPath = '../icons/hermes-view-logo-new-blue.png';

    return (
        <div className="reservation-system">
        <header className="reservation-system-header">
            <img src={hermesViewBlueImgPath} alt="HermesView Logo" className="logo" />
            <h1>Σύστημα Κρατήσεων</h1>
        </header>
        <div className="reservation-system-content">
            <div className="reservation-system-info-container">
            <h2>Γιατί χρειάζεστε σύστημα κρατήσεων</h2>
            <p>
                Το σύστημα κρατήσεων για το εστιατόριό σας ή την καφετέρια σας βοηθά
                στη διαχείριση των κρατήσεων και των πελατών σας αποτελεσματικά.
                Επιπλέον, προσφέρει μια ολοκληρωμένη εμπειρία με εικονική περιήγηση
                της επιχείρησής σας.
            </p>
            <p>
                Η εικονική περιήγηση είναι προαιρετική και η εφαρμογή μπορεί να
                λειτουργήσει και χωρίς αυτήν.
            </p>
            </div>
            <div className="reservation-system-form-container">
            <LandingForm />
            </div>
            <div className="reservation-system-info-container">
            <h2>Γιατί χρειάζεστε σύστημα κρατήσεων</h2>
            <p>
                Το σύστημα κρατήσεων για το εστιατόριό σας ή την καφετέρια σας βοηθά
                στη διαχείριση των κρατήσεων και των πελατών σας αποτελεσματικά.
                Επιπλέον, προσφέρει μια ολοκληρωμένη εμπειρία με εικονική περιήγηση
                της επιχείρησής σας.
            </p>
            <p>
                Η εικονική περιήγηση είναι προαιρετική και η εφαρμογή μπορεί να
                λειτουργήσει και χωρίς αυτήν.
            </p>
            </div>
        </div>
        </div>
    );
    }

    export default ReservationSystem;
import React, { useState } from 'react';

import CusNav from "../../componets/CusNav/CusNav.jsx";
import CusFooter from "../../componets/CusFooter/CusFooter.jsx";
import Banner from "../../componets/Banner/Banner.jsx"

import "./FaqPage.css";
import "../../App.css";

function Question(props) {
    return (
        <div class="QA">
            <h2>{props.question}</h2>
            <p>{props.answer}</p>
        </div>
    )
}

function FaqPage() {
    return (
        <>
            <header>
                <CusNav />
            </header>
            <main id="fqa-section">
                <h1>Frequently Asked Questions</h1>

                <div className="q-and-a">
                <Question key="1" question="Big black dick?" answer="yes" />
                <Question key="2" question="Big white booty?" answer="rico" />
                <Question key="3" question="Pizza?" answer="maybe" />
                <Question key="4" question="Esta melodia esta que arde?" answer="Se siente sola" />
                </div>
            </main>
        </>
    )
}

export default FaqPage;
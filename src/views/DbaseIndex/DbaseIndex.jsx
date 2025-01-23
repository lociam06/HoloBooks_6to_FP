import React, { useState } from 'react';

import CusNav from "../../componets/CusNav/CusNav.jsx";
import CusFooter from "../../componets/CusFooter/CusFooter.jsx";
import Banner from "../../componets/Banner/Banner.jsx"

import "./DbaseIndex.css";
import "../../App.css";

function DbaseIndex() {
    return (
        <>
            <CourseSelector />
        </>
    )
}

export default DbaseIndex;
import React from 'react';

import CusNav from "../..//CusNav/CusNav.jsx";
import CusFooter from "../..//CusFooter/CusFooter.jsx";
import CoursesPageDatas from "/CoursePageDatas";

import "./CourseSelector.css";

function CourseDescButton(props) {
    return (
        <>
            <button>
                {props.course}
            </button>
        </>
    )
}

function CourseStartButton(props) {
    return (
        <>
            <button>
                here, we gotta insert some query that will be like:
                from json database get{props.course}Title({props.key})
            </button>
        </>
    )
}

function CourseDescSection() {
    return (
        <h1>tetaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa</h1>
    )
}

function CourseSelector() {
    return (
            <>
                <header>
                    <CusNav color="web" />
                 </header>
                <main>
                    <div className="courseSection">
                        <div className="coursesButtons">

                        </div>
                        <div className="courseInfo">

                        </div>
                    </div>
                </main>
                <footer>
                    <CusFooter />
                </footer>
            </>
    )
}

export default CourseSelector
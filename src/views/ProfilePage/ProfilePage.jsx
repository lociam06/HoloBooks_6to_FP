import React, { useState } from 'react';

import CusNav from "../../componets/CusNav/CusNav.jsx";
import "./ProfilePage.css";

export default function ProfilePage(){
    return(
        <>
         <header>
          <CusNav />
        </header>
        <section id='profile-page'>
            <img src="..\..\public\icons\whitoutAvatarPhoto.png" alt="ProfilePicture" id='userIcon'/>
            <div id="userInfo">
                <h1 id="username">@fetchUsername</h1>
                <div id="accountDateBlock">
                    <p id="dateHeader">Cuenta creada:</p>
                    <p id="accountDate">Hace +fetchDateDif</p>
                </div>
            </div>
        </section>

        <hr></hr>

        <section id='profile-progress'>
        <h1 className="progressTitle">Cursos Trabajados</h1>
            <ul className="progressList">
                <li className="pageCourseContainer">
                        <img src="public\icons\webBook.png" alt="fetchname+Icon" className="courseIcon" />
                        <ul className="pageCourses">
                            <li className="courseProgress">
                                 <span className="courseTitle">Fetch Title</span>
                                 <p className="ProgressPercent">60%</p>
                             </li>
                        </ul>
                </li>
            </ul>
        </section>
        </>
    )
}
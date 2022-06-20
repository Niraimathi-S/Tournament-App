import React from "react";
import { Link } from "react-router-dom";
import Header from "../header/Header";
import "./dashboard.css";

import PlayerImage from "../../assets/player.jpg";
import TeamImage from "../../assets/team2.jpg";
import TournamentImage from "../../assets/tour.jpg";

function DashBoard() {
  const fields = [
    { link: "/player", heading: "Players", imageUrl: PlayerImage },
    { link: "/team", heading: "Teams", imageUrl: TeamImage },
    { link: "/tournament", heading: "Tournament", imageUrl: TournamentImage },
  ];

  return (
    <div className="tab-container">
      <Header />
      <div className="container px-4 py-5" id="custom-cards">
        <div className="row row-cols-1 row-cols-lg-3 align-items-stretch g-4 py-5">
          {fields.map((field) => {
            return (
              <Link
                to={field.link}
                style={{ textDecoration: "none" }}
                key={field.heading}
              >
                <div className="col">
                  <div className="card card-cover h-100 overflow-hidden text-white bg-dark rounded-5 shadow-lg">
                    <div
                      className="d-flex flex-column h-100 p-5 pb-3 text-white text-shadow-1 cards bg-img"
                      style={{ backgroundImage: "url(" + field.imageUrl + ")" }}
                    >
                      <h4 className="pt-5 mt-5 mb-4 display-6 lh-1 fw-bold heading ">
                        {field.heading}
                      </h4>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default DashBoard;

import React from "react";
import "./aboutSection.css";
import { Button, Typography, Avatar } from "@material-ui/core";
import GitHub from "@material-ui/icons/GitHub";
import LinkedIn from "@material-ui/icons/LinkedIn";
const About = () => {
    const visitInstagram = () => {
        window.location = "https://www.linkedin.com/in/elgun-ezmemmedov-1628a51b4/";
    };
    return (
        <div className="aboutSection">
            <div></div>
            <div className="aboutSectionGradient"></div>
            <div className="aboutSectionContainer">
                <Typography component="h1"> Full Stack Developer</Typography>
                <div>
                    <div>
                        <Avatar
                            style={{ width: "8vmax", height: "8vmax", margin: "2vmax 0" }}
                            src="https://res.cloudinary.com/dyplegxqx/image/upload/v1664456697/avatars/v0daytqtqaazlagz8c7c.jpg"
                            alt="Founder"
                        />
                        <h2 style={{ color: 'green' }}>Elgun Ezmemmedov</h2>
                        <Button onClick={visitInstagram} color="primary">
                            Visit LinkedIn
                        </Button>
                        <span>
                            <span style={{ color: "black" }}>   This is a Ecommerce website made by Me.</span>

                            <br />
                            <br />
                            <span style={{ color: "red " }}> Node_js Mongo_db</span>
                            <br />
                            <br />
                            <span style={{ color: "red " }}>   Html/Css Javascript React/Redux Material Ui</span>
                        </span>
                    </div>
                    <div className="aboutSectionContainer2">
                        <Typography component="h2">You can find me on:</Typography>
                        <a href="https://www.linkedin.com/in/elgun-ezmemmedov-1628a51b4/" target="blank">
                            <LinkedIn className="instagramSvgIcon" />
                        </a>
                        <a
                            href="https://github.com/bbaymistery?tab=repositories"
                            target="blank"
                        >
                            <GitHub className="youtubeSvgIcon" />
                        </a>


                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;
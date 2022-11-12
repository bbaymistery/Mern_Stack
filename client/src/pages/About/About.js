import React from "react";
import "./aboutSection.css";
import { Button, Typography, Avatar } from "@material-ui/core";
import GitHub from "@material-ui/icons/GitHub";
import LinkedIn from "@material-ui/icons/LinkedIn";
import Nabvbar from '../../components/Navbar/index';
import EmailIcon from '@mui/icons-material/Email';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
const About = () => {
    const visitInstagram = () => {
        window.location = "https://www.linkedin.com/in/elgun-ezmemmedov-1628a51b4/";
    };
    return (
        <>
            <Nabvbar />
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
                                <span style={{ color: "black", fontWeight: '500' }}>


                                    © 09.12.2022  All Rights Reserved.
                                </span>

                                <br />
                                <br />
                                <span style={{ color: "red " }}> Node_js Mongo_db</span>
                                <br />
                                <br />
                                <span style={{ color: "red " }}>   Html/Css Javascript React/Redux_tolkit Material Ui</span>
                            </span>
                        </div>
                        <div className="aboutSectionContainer2" >
                            <Typography component="h2" style={{ fontWeight: '500' }}>Hire me:</Typography>
                            <a href="https://www.linkedin.com/in/elgun-ezmemmedov-1628a51b4/" target="blank">
                                <LinkedIn className="instagramSvgIcon" style={{ fontSize: '32px' }} />
                            </a>
                            &nbsp;
                            <a
                                href="https://github.com/bbaymistery?tab=repositories"
                                target="blank"
                            >
                                <GitHub className="youtubeSvgIcon" style={{ fontSize: '32px' }} />
                            </a>
                            &nbsp;
                            <a
                                href="mailto:elgun.ezmemmedov@gmail.com"
                                target="blank"
                            >
                                <AlternateEmailIcon className="emailIcon" style={{ fontSize: '32px' }} />
                            </a>
                            &nbsp;
                            <a
                                href="https://wa.me/+994506330135"
                                target="blank"
                            >

                                <WhatsAppIcon className="wpIcon" style={{ fontSize: '32px' }} />
                            </a>

                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default About;
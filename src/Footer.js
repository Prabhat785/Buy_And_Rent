import React from 'react'
import './Footer.css'
function Footer() {
    return (
        <div className="footer">
        <img
          className="footer_logo"
          src="https://pngimg.com/uploads/amazon/amazon_PNG11.png"
          alt="BRD"
        ></img>
            <div className="footerow">
            
                <div className="footercol">
                    <h3 className="colhead">Get to Know us</h3>
                    <ul>
                        <li>About us</li>
                        <li>Careers</li>
                        <li>Press Releases</li>
                        <li>Gift a Smile</li>
                    </ul>
                </div>
                <div className="footercol">
                    <h3 className="colhead">Connect With Us</h3>
                    <ul>
                        <li>Facebook</li>
                        <li>Careers</li>
                        <li>Instagram</li>
                    </ul>
                </div>
                <div className="footercol">
                    <h3 className="colhead">Make Money with Us</h3>
                    <ul>
                        <li>Sell on Amazon</li>
                        <li>Sell under Amazon</li>
                        <li>Press Releases</li>
                        <li>Gift a Smile</li>
                    </ul>
                </div>
                <div className="footercol">
                    <h3 className="colhead">Let Us Help you</h3>
                    <ul>
                        <li>COVID-19 and Amazon</li>
                        <li>Your Account</li>
                        <li>Returns Centre</li>
                        <li>100% Purchase Protection</li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Footer

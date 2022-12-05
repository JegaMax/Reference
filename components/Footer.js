import React from "react";
import { Container, Row, Col } from "reactstrap";

const Footer = () => {
  const links = [
    {
      id: 1,
      title: "Feature",
      child: [
        { title: "LOREM IPSUM", link: "/" },
        { title: "LOREM IPSUM", link: "/" },
        { title: "LOREM IPSUM", link: "/" },
        { title: "LOREM IPSUM", link: "/" },
      ],
    },
    {
      id: 2,
      title: "About Us",
      child: [
        { title: "Contact Us", link: "/" },
        { title: "FAQs", link: "/" },
        { title: "Privacy Policy", link: "/" },
      ],
    },
  ];

  return (
    <section className="footer section">
      <div class="col-lg-12">
        <div class="footer__copyright__text">
          <p>
            Copyright © 2022 All rights reserved by{" "}
            <a href="https://colorlib.com" target="_blank">
              physicaltodigital@io
            </a>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Footer;

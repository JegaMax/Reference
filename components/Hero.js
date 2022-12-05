import React from "react";
import { Container, Row, Col } from "reactstrap";

const Hero = () => {
  return (
    <section className="section position-relative">
      <div className='container-fluid col-md-10'>
        <div class="row fullscreen align-items-center justify-content-between">
          <div class="col-lg-6 col-md-6 banner-left">
            <h2>This is me</h2>
            <h1>Philip Gilbert</h1>
            <p>
              You will begin to realise why this exercise is called the Dickens
              Pattern with reference to the ghost showing Scrooge some different
              futures.
            </p>
            <a href="#" class="primary-btn text-uppercase">
              discover now
            </a>
          </div>
          <div class="col-lg-6 col-md-6 banner-right d-flex align-self-end">
            <img
              src="/images/Group Members.png"
              alt=""
              className="img-fluid mx-auto d-block"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

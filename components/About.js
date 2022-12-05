import React from "react";

const ProductCountBox = (props) =>{
  return (
    <>
    {
      props.features.map((feature, key) =>
      <div class="card col-md-2">
            <div class="card-body p-4">
              <h5 class="card-title">Special title treatment</h5>
              <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
            </div>
          </div>
      )
    }
    </>
  );
}
const About = () => {
  const features = [
    {id : 1, img : "./images/45.png", title : "LOREM IPSUM", desc : "It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.", link : "/"},
    {id : 2, img : "./images/Group Members.png", title : "LOREM IPSUM", desc : "Sed perspiciatis unde omnis natus error voluptatem accusantium doloremque laudantium totam rem aperiam eaque ipsa quae ab illo excepturi sint occaecati cupiditate architecto.", link : "/"},
    {id : 3, img : "./images/45.png", title : "LOREM IPSUM", desc : "It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.", link : "/"},
  ];
  return (
  <section className="section bg-light" id="about">
    <div class="container">
      <div class="row">
        <ProductCountBox features = {features}/>
      </div>
    </div>
  </section>
)
  };

export default About;

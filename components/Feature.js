import React from 'react';

const FeatureBox = (props) => {
  return (
    <>
    {
      props.features.map((feature, key) =>
      <div class="col-md-3">
        <img src={feature.img} alt="" className="img-fluid d-block mx-auto"/>
        <div class="caption">
        <h3>{feature.title}</h3>
        <p>
        {feature.desc}
        </p>
          </div>
      </div>
      )
    }
    </>
  );
}

const Feature = () => {

  const features = [
    {id : 1, img : "./images/45.png", title : "LOREM IPSUM", desc : "It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.", link : "/"},
    {id : 2, img : "./images/Group Members.png", title : "LOREM IPSUM", desc : "Sed perspiciatis unde omnis natus error voluptatem accusantium doloremque laudantium totam rem aperiam eaque ipsa quae ab illo excepturi sint occaecati cupiditate architecto.", link : "/"},
    {id : 3, img : "./images/45.png", title : "LOREM IPSUM", desc : "It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.", link : "/"},
  ];

  return (
    <section className="section" id="feature">
      <div id="features" class="text-center">
  <div class="container-fluid">
    <div class="col-md-12 col-md-offset-1 section-title">
      <h2>Features</h2>
    </div>
    <div class="row justify-content-center">
      <FeatureBox features = {features}/>
    </div>
  </div>
</div>
    </section>
  );
}

export default Feature;



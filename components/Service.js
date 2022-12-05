import React from 'react';

const ServiceBox = (props) => {
  return (
    <>
    {
      props.features.map((feature, key) =>
      <div class="col-3 card m-2">
        <div class="card-body text-center rounded-lg">
        <img src={feature.img} alt="" className="img-fluid d-block mx-auto"/>
        <p class="mt-4">
        {feature.desc}
        </p>
          </div>
      </div>
      )
    }
    </>
  );
}

const Service = () => {

  const features = [
    {id : 1, img : "./images/45.png", title : "LOREM IPSUM", desc : "It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.", link : "/"},
    {id : 2, img : "./images/Group Members.png", title : "LOREM IPSUM", desc : "Sed perspiciatis unde omnis natus error voluptatem accusantium doloremque laudantium totam rem aperiam eaque ipsa quae ab illo excepturi sint occaecati cupiditate architecto.", link : "/"},
    {id : 3, img : "./images/45.png", title : "LOREM IPSUM", desc : "It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.", link : "/"},
    {id : 4, img : "./images/45.png", title : "LOREM IPSUM", desc : "It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.", link : "/"},
    {id : 5, img : "./images/Group Members.png", title : "LOREM IPSUM", desc : "Sed perspiciatis unde omnis natus error voluptatem accusantium doloremque laudantium totam rem aperiam eaque ipsa quae ab illo excepturi sint occaecati cupiditate architecto.", link : "/"},
    {id : 6, img : "./images/45.png", title : "LOREM IPSUM", desc : "It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.", link : "/"},
  ];

  return (
    <section className="section" id="service">
      <div id="services" class="text-center">
  <div class="container-fluid">
    <div class="col-md-12 col-md-offset-1 section-title">
      <h2>Features</h2>
    </div>
    <div class="row justify-content-center">
      <ServiceBox features = {features}/>
    </div>
  </div>
</div>
    </section>
  );
}

export default Service;
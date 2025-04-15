import React from "react";

const Card = ({ children }) => {
  return (
    <section className="bg-light p-3 p-md-4 p-xl-5">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-md-9 col-lg-7 col-xl-6 col-xxl-5">
            <div style={{backgroundColor : "lightcyan"}} className="card border border-light-subtle rounded-4">
              <div className="card-body p-3 p-md-4 p-xl-5">
                {children}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};  

export default Card;

import React from "react";

const Newsitem = (props)=> {

    let { title, description, imageUrl, newsUrl, author, date, source } =
      props;
    return (
      <div className="my-3">
       <div className="card position-relative">
    <span
      className="position-absolute top-0 end-0 badge rounded-pill bg-danger"
      style={{ margin: '1px', zIndex: 1 }}
    >
      {source}
    </span>
          </div>
          <img
            src={
              !imageUrl
                ? "https://t3.ftcdn.net/jpg/01/33/49/22/360_F_133492249_piBI1o2jc2auyjUq6rfPRiAiDgcok4BQ.jpg"
                : imageUrl
            }
            className="card-img-top"
            alt="..."
          />
          <div className="card-body">
            <h5 className="card-title">{title} </h5>
            <p className="card-text">{description}</p>
            <p className="card-text text-success">
              <small>
                By {!author ? "unknowm" : author} on{" "}
                {new Date(date).toGMTString()}
              </small>
            </p>
            <a
              rel="noreferrer"
              href={newsUrl}
              target="_blank"
              className="btn btn-primary"
            >
              Read more
            </a>
          </div>
        </div>
      // </div>
    );
  }


export default Newsitem;

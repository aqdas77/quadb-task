import axios from "axios";
import React from "react";
import StarRatings from "react-star-ratings";
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';

const Detail = () => {
  const [data, setData] = useState(null);
  const [modal, setModal] = useState(false);
  const [user,setUser]=useState({
    userName : "",
    email : "",
    ticketCount : 1
  })
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };
  const handleSubmit = ()=>{
    localStorage.setItem("user",JSON.stringify(user))
    alert("Form Submitted Successfully")
    setUser({
        userName : "",
        email : "",
        ticketCount : 1
    })
  }
  const fetchDetail = async (id) => {
    const res = await axios.get(`https://api.tvmaze.com/shows/${id}`);
    setData(res.data);
    console.log(res.data);
  };
  useEffect(() => {
    const id = localStorage.getItem("id");
    fetchDetail(id);
  }, []);
  return (
    <>
      <div class="container">
      <div className="row d-flex  align-items-center mt-2 ">
          <div className="col-auto">
            <button  className="btn btn-primary" onClick={()=>navigate('/')}> Back</button>
            </div>
            </div>

        <div class="row">
          <div class="col fs-1 fw-light my-3"> {data && data.name}</div>
        </div>
        <div class="row ">
          <div class="col-8 ">
            <div className="row">
              <div className="col">
                <img
                  src={
                    (data && data.image && data.image.original) || "media.jpg"
                  }
                  style={{ height: "24rem", width: "24rem" }}
                />
              </div>
              <div
                className="col ml-0 fs-5"
                dangerouslySetInnerHTML={{ __html: data && data.summary }}
              />
            </div>
          </div>
          <div
            class="col-4 "
            style={{
              boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
              width: "20rem",
              height: "24rem",
              backgroundColor: "#eaf1f8",
            }}
          >
            <div className="row mx-1 fs-1 fw-light">Show Info</div>
            <div className="row my-1">
              <div>
                <b>Network : </b> {data && data.network && data.network.name}
              </div>
            </div>
            <div className="row my-1">
              <div>
                <b>Schedule : </b>{" "}
                {data && data.schedule && data.schedule.days[0]} at{" "}
                {data && data.schedule && data.schedule.time} (
                {data && data.runtime} min)
              </div>
            </div>
            <div className="row my-1">
              <div>
                <b>Status : </b> {data && data.status}
              </div>
            </div>
            <div className="row my-1">
              <div>
                <b>Show Type : </b> {data && data.type}
              </div>
            </div>
            <div className="row my-1">
              <div>
                <b>Genres : </b>{" "}
                {data &&
                  data.genres &&
                  data.genres.map((item) => {
                    return <span>{item} |</span>;
                  })}
              </div>
            </div>
            <div className="row my-1">
              <div>
                <b>Language : </b> {data && data.language}
              </div>
            </div>
            <div className="row my-1">
              <div>
                <b>Official Site : </b> {data && data.officialSite}
              </div>
            </div>
            <div className="row my-4">
              <div>
                <StarRatings
                  rating={
                    data && data.rating && data.rating.average !== null
                      ? data.rating.average
                      : 2
                  }
                  starRatedColor="orange"
                  numberOfStars={10}
                  name="rating"
                  starDimension="22px"
                  starSpacing="1px"
                />
                <span
                  className="fw-bold"
                  style={{ margin: "10px", paddingTop: "10px" }}
                >
                  {data && data.rating.average}
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="row d-flex justify-content-center align-items-center my-4">
          <div className="col-auto">
            <button
              className="btn btn-primary"
              data-bs-toggle="modal"
              data-bs-target="#exampleModal"
              data-bs-whatever="@mdo"
              onClick={() => setModal(true)}
            >
              Book Ticket
            </button>
          </div>
        </div>
      </div>
      <div
        class="modal fade"
        id="exampleModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class=" modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">
                Ticket Details
              </h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <form>
                <div class="mb-3">
                  <label for="show-name" class="col-form-label">
                    Show Name:
                  </label>
                  <div className="fw-bold">{data && data.name}</div>
                 
                </div>
                <div className="mb-3">
                    <label for="price" class="col-form-label">
                      Price(per ticket):
                    </label>
                    <div className="fw-bold">10 $</div>
                  </div>
                  <div className="mb-3">
                    <label for="price" class="col-form-label">
                      Language:
                    </label>
                    <div className="fw-bold">{data && data.language}</div>
                  </div>
                <div class="mb-3">
                  <label for="recipient-name" class="col-form-label">
                    Full Name:
                  </label>
                  <input type="text" class="form-control" id="user-name"  name="userName"
                  value={user.userName}
                  onChange={handleChange} />
                </div>
                <div class="mb-3">
                  <label for="recipient-email" class="col-form-label">
                    Email:
                  </label>
                  <input type="text" class="form-control" id="user-email"  name="email"
                  value={user.email}
                  onChange={handleChange} />
                </div>
                <div class="mb-3">
                  <label for="recipient-ticket" class="col-form-label">
                    Number of Tickets:
                  </label>
                  <input type="text" class="form-control" id="no-of-tickets"  name="ticketCount"
                  value={user.ticketCount}
                  onChange={handleChange} />
                </div>
              </form>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button type="button" class="btn btn-primary" onClick={()=>handleSubmit()}>
                Book
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Detail;

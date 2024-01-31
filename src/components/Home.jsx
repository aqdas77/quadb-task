import React, { useEffect, useState } from 'react'
import axios from 'axios'
import StarRatings from 'react-star-ratings';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const [data,setData] = useState(null)
    const navigate = useNavigate()

    const handleDetail = (id)=>{
        localStorage.removeItem("id")
        localStorage.setItem("id",id)
        navigate("/details")
    }
    const fetchData = async ()=>{
        const res = await axios.get("https://api.tvmaze.com/search/shows?q=all")
        if(res.status===200)
        setData(res.data)
        console.log(res.data)
    }
    useEffect(()=>{
      fetchData();
    },[])
  return (
    <>
    <div class="container my-4">
    <div class="row row-cols-auto">
    
    {data && data.map((item)=>{
        return (
            <div class="card col m-3 " style={{width: "18rem", boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px"}}>
            <img src={item.show.image?.original  || "media.jpg" } style={{height : "16rem"}} class="card-img-top"  />
            <div class="card-body">
              <h5 class="card-title">{item.show.name}</h5>
              <div dangerouslySetInnerHTML={{ __html: item.show.summary.length>55 ? `${item.show.summary.substr(0,55)}...` : item.show.summary }} />
             
              <StarRatings
        rating={item.show.rating.average !== null ? item.show.rating.average : 2}
        starRatedColor="orange"
        
        numberOfStars={10}
        name="rating"
        starDimension="20px"
        starSpacing="1px"
      />
             <button type="button" class="btn btn-outline-dark mt-2" onClick={()=>handleDetail(item.show.id)}>Details</button>
            </div>
          </div>
        )
       
    })}
    
   
  </div>
   
</div>
    </>
  )
}

export default Home
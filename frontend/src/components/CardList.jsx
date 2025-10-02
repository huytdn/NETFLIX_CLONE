import React, { useEffect, useState } from "react";
import CardImg from "../assets/images/cardimg.jpg";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

const CardList = ({ title, category }) => {
  const [data, setData] = useState([]);

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0ZTE3MzZkMDg0Y2ZhNGViYTM0MWE5NDJiNzkxYTYwNiIsIm5iZiI6MTc1NTk0Nzk2OC44OTkwMDAyLCJzdWIiOiI2OGE5YTNjMGU4MTYzNjQwYjM3ODE4NWQiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.eo1yUH8yzK7Jr0gHm1duEpFh_qmx9I4x4YkWXNEKSQA",
    },
  };

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/movie/${category}?language=en-US&page=1`,
      options
    )
      .then((res) => res.json())
      .then((res) => setData(res.results))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="text-white md:px-4">
      <h2 className="pt-10 pb-5 text-lg font-medium">{title}</h2>

      <Swiper slidesPerView={"auto"} className="mySwiper">
        {data.map((item, index) => (
          <SwiperSlide key={index} className="max-w-72">
            <img
              src={`https://image.tmdb.org/t/p/w500/${item.backdrop_path}`}
              alt=""
              className="h-44 w-full object-center object-cover"
            />
            <p className="text-center pt-2">{item.original_title}</p>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default CardList;

import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Link } from "react-router-dom";

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
      .then((res) => setData(res.results || []))
      .catch((err) => console.error(err));
  }, [category]);

  return (
    <div className="text-white md:px-6">
      {/* title */}
      <h2 className="pt-10 pb-5 text-2xl font-semibold tracking-wide">
        {title}
      </h2>

      {/* slider */}
      <Swiper slidesPerView={"auto"} spaceBetween={12} className="mySwiper">
        {data.map((item, index) => (
          <SwiperSlide key={index} className="!w-64">
            <Link to={`/movie/${item.id}`}>
              <div className="bg-zinc-900 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
                {/* ảnh */}
                <div className="relative">
                  <img
                    src={`https://image.tmdb.org/t/p/w500/${item.backdrop_path}`}
                    alt={item.original_title}
                    className="h-40 w-full object-cover rounded-t-2xl transform hover:scale-105 transition-transform duration-300"
                  />
                </div>
                {/* tên */}
                <div className="p-3 text-center">
                  <p className="text-sm md:text-base font-medium line-clamp-2">
                    {item.original_title}
                  </p>
                </div>
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default CardList;

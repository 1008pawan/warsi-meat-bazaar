import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import { Link } from "react-router-dom";
import "swiper/css";
import "swiper/css/navigation";

const reviews = [
  {
    id: 1,
    name: "Aman Khan",
    location: "Farrukhabad",
    rating: 5,
    review:
      "Chicken quality bahut fresh thi aur delivery bhi time se hui. Definitely ordering again!",
  },
  {
    id: 2,
    name: "Rahul Verma",
    location: "Kanpur",
    rating: 5,
    review:
      "Mutton quality outstanding thi. Packaging bhi hygienic thi aur price bhi reasonable tha.",
  },
  {
    id: 3,
    name: "Sana Siddiqui",
    location: "Lucknow",
    rating: 5,
    review: "Seafood fresh tha aur delivery expected time se pehle mil gayi.",
  },
  {
    id: 4,
    name: "Arif Ali",
    location: "Delhi",
    rating: 5,
    review: "Best meat delivery service. Fresh products and quick support.",
  },
];

export default function CustomerReviews() {
  return (
    <section className="bg-red-50 py-16">
      <div className="container mx-auto px-4">
        {/* Heading */}
        <div className="mb-12 text-center">
          <span className="rounded-full bg-yellow-100 px-4 py-2 text-sm font-semibold text-yellow-700">
            ⭐ Customer Reviews
          </span>

          <h2 className="mt-4 text-3xl font-bold text-gray-900 md:text-4xl">
            What Our Customers Say
          </h2>
        </div>

        <div className="relative">
          {/* Navigation Buttons */}
          <button className="review-prev absolute left-0 top-1/2 z-10 -translate-y-1/2 rounded-full bg-red-600 p-3 text-white shadow-lg">
            <ChevronLeft size={20} />
          </button>

          <button className="review-next absolute right-0 top-1/2 z-10 -translate-y-1/2 rounded-full bg-red-600 p-3 text-white shadow-lg">
            <ChevronRight size={20} />
          </button>

          <Swiper
            modules={[Navigation, Autoplay]}
            navigation={{
              prevEl: ".review-prev",
              nextEl: ".review-next",
            }}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            loop={true}
            spaceBetween={24}
            breakpoints={{
              0: {
                slidesPerView: 1,
              },
              768: {
                slidesPerView: 2,
              },
              1024: {
                slidesPerView: 3,
              },
            }}
          >
            {reviews.map((review) => (
              <SwiperSlide key={review.id}>
                <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">
                  <div className="flex items-center gap-4">
                    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-red-600 text-lg font-bold text-white">
                      {review.name
                        .split(" ")
                        .map((word) => word[0])
                        .join("")
                        .toUpperCase()}
                    </div>

                    <div>
                      <h3 className="font-bold">{review.name}</h3>
                      <p className="text-sm text-gray-500">{review.location}</p>
                    </div>
                  </div>

                  <div className="mt-4 flex gap-1 text-yellow-500">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star
                        key={i}
                        size={18}
                        fill="currentColor"
                        strokeWidth={1}
                      />
                    ))}
                  </div>

                  <p className="mt-4 text-gray-600">"{review.review}"</p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Stats */}
        <div className="mt-14 rounded-3xl bg-red-600 p-8 text-white">
          <div className="grid gap-8 text-center md:grid-cols-4">
            <div>
              <h3 className="text-3xl font-bold">5000+</h3>
              <p>Happy Customers</p>
            </div>

            <div>
              <h3 className="text-3xl font-bold">4.9★</h3>
              <p>Average Rating</p>
            </div>

            <div>
              <h3 className="text-3xl font-bold">10K+</h3>
              <p>Orders Delivered</p>
            </div>

            <div>
              <h3 className="text-3xl font-bold">100%</h3>
              <p>Fresh Quality</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

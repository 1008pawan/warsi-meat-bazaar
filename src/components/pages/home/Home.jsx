import BestDealsSection from "../../home/BestDealsSection";
import BestSellingSection from "../../home/BestSellingSection";
import CategorySection from "../../home/CategorySection";
import CustomerReviews from "../../home/CustomerReviews";
import DeliveryAreas from "../../home/DeliveryAreas";
import Footer from "../../layout/Footer";
import Header from "../../layout/Header";
import HeroSection from "../../home/HeroSection";
import NewsletterSection from "../../home/NewsletterSection";
import PopularCombos from "../../home/PopularCombos";
import WhyChooseUs from "../../home/WhyChooseUs";
import FranchiseSection from "../../home/Franchise";

function Home() {
  return (
    <div>
      <HeroSection />
      <CategorySection />
      <BestDealsSection />
      <BestSellingSection />
      <WhyChooseUs />
      <PopularCombos />
      <CustomerReviews />
      <DeliveryAreas />
      <FranchiseSection />
      <NewsletterSection />
    </div>
  );
}

export default Home;

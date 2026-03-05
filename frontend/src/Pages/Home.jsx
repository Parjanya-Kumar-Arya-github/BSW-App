import CampusLife from "../Components/Home/CampusLife";
import OurOperations from "../Components/Home/OurOperations";
import HeroCarousel from "../Components/Home/HeroCarousel";
import WelfarePortalSection from "../Components/Home/WelfarePortalSection";
import NoticesLanding from "../Components/Home/NoticesLanding";
import GalleryAnimation from "../Components/Gallery/GalleryAnimation";
import MeetTheTeam from "../Components/MeetTheTeam/MeetTheTeam";
import HomeResources from "../Components/Home/HomeResources";

const Home = () => {

  return (
      <>
      <HeroCarousel />
      <OurOperations/>
      <CampusLife/>
      <WelfarePortalSection/>
      <HomeResources/>
      <NoticesLanding/>
      <MeetTheTeam />
      </>
  );
};

export default Home;
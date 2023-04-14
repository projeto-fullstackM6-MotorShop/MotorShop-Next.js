import AnnouceCard from "@/components/annouceCard";
import FilterCard from "@/components/filterCard";
import Footer from "@/components/footer";
import Header from "@/components/header";

import { mockAnnouce } from "@/mocks/AnnouceMock";

const Home = () => {
  return (
    <>
      <Header />
      <FilterCard/>
      <Footer/>
    </>
  );
};

export default Home;

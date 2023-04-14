import AnnouceCard from "@/components/annouceCard";
import Header from "@/components/header";
import { mockAnnouce } from "@/mocks/AnnouceMock";
import Footer from "../components/footer";
import { Flex, Heading, Image } from "@chakra-ui/react";
import FilterCard from "@/components/filterCard";

const Home = () => {
  return (
    <>
      <Header />

      <Flex
        marginTop={"80px"}
        h={"550px"}
        alignItems={"center"}
        justifyContent={"center"}
        flexDirection={"column"}
        gap={"10px"}
        bgGradient={
          "linear-gradient(180deg, rgba(0, 0, 0, 0.29) 0%, #000000 100%);"
        }
      >
        <Image
          src="/images/homeCar.png"
          alt="Logo"
          zIndex={"-1"}
          position={"absolute"}
        />
        <Heading color={"grey.11"} fontWeight={"semibold"} fontSize={"xxxl"}>
          MotorShop
        </Heading>
        <Heading color={"grey.11"} fontWeight={"bold"} fontSize={"xxl"}>
          A melhor plataforma de anúncios de carro do país
        </Heading>
      </Flex>

      <Flex>
        <FilterCard />
      </Flex>

      <Footer />
    </>
  );
};

export default Home;

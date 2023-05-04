import { useAnnouncement } from "@/contexts/announcementContext";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons"
import { Button, Flex, Heading } from "@chakra-ui/react"

const Pagination = () => {

    const { handleNextPage, handlePreviousPage, allAnnouncements, endIndex, currentPage, numPageEnd, numCountPage } = useAnnouncement();

    return (
        <>
            <Flex gap={"2rem"} alignItems={"center"}>
                {currentPage === 0
                    ?
                    <></>
                    :
                    <Button
                        className="buttonBack"
                        leftIcon={<ChevronLeftIcon />}
                        variant={"unstyled"}
                        bg={"transparent"}
                        color={"brand.1"}
                        fontSize={"md"}
                        iconSpacing={1}
                        display={"flex"}
                        alignItems={"center"}
                        onClick={handlePreviousPage}
                    >
                        Anterior
                    </Button>
                }
                <Heading color={"grey.3"} fontSize={"md"} fontWeight={"semibold"}>
                    {numCountPage} de {numPageEnd}
                </Heading>
                {endIndex >= allAnnouncements.length
                    ?
                    <></>
                    :
                    <Button
                        rightIcon={<ChevronRightIcon />}
                        variant={"unstyled"}
                        bg={"transparent"}
                        color={"brand.1"}
                        fontSize={"md"}
                        iconSpacing={1}
                        display={"flex"}
                        alignItems={"center"}
                        onClick={handleNextPage}
                    >
                        Seguinte
                    </Button>
                }

            </Flex>
        </>
    )
}

export default Pagination

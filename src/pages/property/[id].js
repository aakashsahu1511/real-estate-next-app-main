import { Box, Flex, Spacer, Text, Avatar } from "@chakra-ui/react";
import { FaBed, FaBath } from "react-icons/fa"
import {BsGridFill} from "react-icons/bs"
import {GoVerified} from "react-icons/go"
import millify from "millify";

import { baseUrl, fetchApi } from "../../../utils/fetchApi";
import ImageScrollbar from "../../../components/ImageScrollbar";

const PropertyDetails = ({propertyDetails: {price, rentFrequency, rooms, title, baths, area, agency, isVerified, description, type, purpose, furnishingStatus, amenities, photos}}) => (
    <Box margin="auto" p="4">
        {photos && <ImageScrollbar data={photos}/>}
        <Box w="full" p='6'>
            <Flex justifyContent="space-between" alignItems="center" paddingTop="2">
                <Flex alignItems="center">
                    <Box paddingRight="3" color="#46AA46">{isVerified && <GoVerified />}</Box>
                    <Text justifyContent="center" fontFamily="sans-serif" fontSize="xl" fontWeight="bold">AED {rentFrequency ? `${millify(price)}/${rentFrequency}` : millify(price)}</Text>
                </Flex>
                <Box>
                    <Avatar size="sm" src={agency.logo.url}></Avatar>
                </Box>
            </Flex>
            <Flex justifyContent="space-between" paddingRight="20" paddingTop="2" alignItems="center" color="#39ace7">
            {rooms} <FaBed /> | {baths} <FaBath /> | {millify(area)} sqft <BsGridFill />
            </Flex>
            <Box>
                <Text marginTop="2" fontSize="lg" fontWeight="bold">
                    {title}
                </Text>
                <Text lineHeight="2" color='gray.600' align="justify">{description}</Text>
            </Box>
            <Flex flexWrap="wrap" textTransform="uppercase" justifyContent="space-between">
                <Flex justifyContent="space-between" w="400px" borderBottom="1px" borderColor="gray.100">
                    <Text>Type</Text>
                    <Text fontWeight="bold">{type}</Text>
                </Flex>
                <Flex justifyContent="space-between" w="400px" borderBottom="1px" borderColor="gray.100">
                    <Text>Purpose</Text>
                    <Text fontWeight="bold">{purpose}</Text>
                </Flex>
                {furnishingStatus && (
                    <Flex justifyContent="space-between" w="400px" borderBottom="1px" borderColor="gray.100">
                    <Text>Furnishing Status</Text>
                    <Text fontWeight="bold">{furnishingStatus}</Text>
                </Flex>
                )}
            </Flex>
            <Box>
                {amenities && <Text fontSize="2xl" fontWeight="black" marginTop="5">Amenities</Text>}
                <Flex flexWrap="wrap">
                    {amenities.map((item) => (
                        item.amenities.map((amenity) => (
                            <Text
                                bg="gray.200"
                                borderRadius="5"
                                color="blue.400"
                                fontWeight="bold"
                                fontSize="lg"
                                m="1"
                                p="2"
                                key={amenity.text}
                            >{amenity.text}</Text>
                        ))
                    ))}
                </Flex>
            </Box>
        </Box>
    </Box>
    
)

export default PropertyDetails

export async function getServerSideProps({params: {id}}){
    const data = await fetchApi(`${baseUrl}/properties/detail?externalID=${id}`)

    return {
        props: {
            propertyDetails: data,
        },
    }
}
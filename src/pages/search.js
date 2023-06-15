import { useState } from "react";
import { useRouter } from "next/router";
import { Flex, Box, Text, Icon } from "@chakra-ui/react";
import Image from "next/image";
import {BsFilter} from "react-icons/bs"
import SearchFilters from "../../components/SearchFilters";
import Property from "../../components/Property";
import NoResult from "assets/images/NoResult.svg"
import { baseUrl, fetchApi } from "../../utils/fetchApi";

const Search = ({properties}) => {
    const [searchFilters, setSearchFilters] = useState(false)
    const router = useRouter()

    return (
        <Box>
            <Flex
                cursor="pointer"
                bg="gray.100"
                borderBottom="1px"
                borderColor="gray.200"
                padding="2"
                justifyContent="center"
                alignItems="center"
                fontWeight="black"
                fontSize="lg"
                onClick={() => setSearchFilters(!searchFilters)}
            >
                <Text>Search Property by Filters</Text>
                <Icon paddingLeft="2" w="8" as={BsFilter}></Icon>
            </Flex>
            {searchFilters && <SearchFilters />}
            <Text fontSize="2xl" padding="2" fontWeight="bold">
                Property {router.query.purpose}
            </Text>
            <Flex flexWrap="wrap">
                {properties.map((property) => <Property property={property} key={property.id} />)}
            </Flex>
            {properties.length === 0 && (
                <Flex justifyContent="center" alignItems="center" flexDirection="column">
                    <Image src={NoResult} alt="no results"/>
                    <Text fontSize="2xl" marginTop="3" color="gray.600">No Results Found</Text>
                </Flex>
            )}
        </Box>
    )
}

export async function getServerSideProps({query}){
    const purpose = query.purpose || 'for-rent'
    const rentFrequency = query.rentFrequency || 'yearly'
    const minPrice = query.minPrice ||'0'
    const maxPrice = query.maxPrice || '1000000'
    const roomsMin = query.roomsMin || '0'
    const bathsMin = query.bathsMin || '0'
    const sort = query.sort || 'price-desc'
    const areaMax = query.areaMax || '35000'
    const locationExternalIDs = query.locationExternalIDs || '5002'
    const categoryExternalID = query.categoryExternalID || '4'

    const data = await fetchApi(`${baseUrl}/properties/list?locationExternalIDs=${locationExternalIDs}&purpose=${purpose}&categoryExternalID=${categoryExternalID}&bathsMin=${bathsMin}&rentFrequency=${rentFrequency}&priceMin=${minPrice}&priceMax=${maxPrice}&roomsMin=${roomsMin}&sort=${sort}&areaMax=${areaMax}`)

    
    return {
      props: {
        properties: data?.hits,
      }
    }
  }

  export default Search
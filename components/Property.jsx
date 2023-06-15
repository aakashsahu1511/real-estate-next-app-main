import Link from "next/link";
import Image from "next/image";
import { Flex, Box, Text, Avatar } from "@chakra-ui/react";
import { FaBed, FaBath } from "react-icons/fa"
import {BsGridFill} from "react-icons/bs"
import {GoVerified} from "react-icons/go"
import millify from "millify";
import DefaultImage from "assets/images/House.jpg"

const Property = ({property: {externalID, coverPhoto, area, price, agency, rentFrequency, isVerified, rooms, baths, title}}) => (
    <Link href={`/property/${externalID}`} passHref>
        <Flex flexWrap="wrap" w={410} p={5} paddingTop={0} justifyContent="flex-start" cursor="pointer">
            <Box>
                <Image src={coverPhoto ? coverPhoto.url : DefaultImage} width="420" height="240" alt="Cover Photo"/>
            </Box>
            <Box w="full">
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
                <Flex paddingTop="2">
                    {title.length > 40 ? `${title.substring(0, 40)}...` : title}
                </Flex>
            </Box>
        </Flex>
    </Link>
)

export default Property
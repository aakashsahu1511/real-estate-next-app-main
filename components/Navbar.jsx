import Link from "next/link";
import { Flex, Box, Spacer, Menu, MenuList, MenuItem, MenuButton, IconButton } from "@chakra-ui/react";
import { FcMenu, FcHome, FcAbout } from 'react-icons/fc'
import { BsSearch } from 'react-icons/bs'
import { FiKey } from 'react-icons/fi'

const Navbar = () => (
    <Flex borderBottom="1px" p="2" borderColor="gray.300">
        <Box fontSize="3xl" color="blue.400" fontWeight="bold" paddingLeft="2">
            <Link pad href='/'>RENCA</Link>
        </Box>
        <Spacer />
        <Box>
            <Menu>
                <MenuButton as={IconButton} icon={<FcMenu />} variant="outline">Menu</MenuButton>
                <MenuList>
                    <Link href={'/'} passHref>
                        <MenuItem icon={<FcHome />}>Home</MenuItem>
                    </Link>
                    <Link href={'/search'} passHref>
                        <MenuItem icon={<BsSearch />}>Search</MenuItem>
                    </Link>
                    <Link href={'/search?purpose=for-sale'} passHref>
                        <MenuItem icon={<FcAbout />}>Buy Property</MenuItem>
                    </Link>
                    <Link href={'/search?purpose=for-rent'} passHref>
                        <MenuItem icon={<FiKey />}>Rent Property</MenuItem>
                    </Link>
                </MenuList>
            </Menu>
        </Box>
    </Flex>
);

export default Navbar;
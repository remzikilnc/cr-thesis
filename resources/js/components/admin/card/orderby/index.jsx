import React, { useState } from 'react';
import { Button, Menu, MenuButton, MenuDivider, MenuItemOption, MenuList, MenuOptionGroup } from "@chakra-ui/react";
import SettingsIcon from '@mui/icons-material/Settings';

export default function OrderByComponent(props) {
    const {setOrderBy,setIsDescending} = props

    const handleOrderChange = (value) => {
        setOrderBy(value);
    };

    const handleDirectionChange = (value) => {
        setIsDescending(value);
    };

    return (
        <Menu closeOnSelect={false}>
            <MenuButton as={Button} colorScheme='blue' className={"flex items-center text-md hover:cursor-pointer bg-lightPrimary p-2 text-black-500 hover:bg-gray-100 dark:bg-navy-700 dark:text-white dark:hover:bg-white/20 dark:active:bg-white/10 linear justify-center rounded-lg font-semibold transition duration-200"}>
                <SettingsIcon className="h-6 w-6" />
            </MenuButton>
            <MenuList minWidth='240px' className={"w-max rounded-xl bg-white py-3 px-4 text-sm shadow-xl dark:text-white shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none py-5"}>
                <MenuOptionGroup title='Order Type' defaultValue='id' type='radio' className={"my-2"}>
                    <MenuItemOption value='id' onClick={() => handleOrderChange('id')}>ID</MenuItemOption>
                    <MenuItemOption value='title' onClick={() => handleOrderChange('title')}>Title</MenuItemOption>
                    <MenuItemOption value='price' onClick={() => handleOrderChange('price')}>Price</MenuItemOption>
                    <MenuItemOption value='quantity' onClick={() => handleOrderChange('quantity')}>Quantity</MenuItemOption>
                    <MenuItemOption value='status' onClick={() => handleOrderChange('quantity')}>Status</MenuItemOption>
                    <MenuItemOption value='created_at' onClick={() => handleOrderChange('title')}>Created Date</MenuItemOption>
                    <MenuItemOption value='updated_at' onClick={() => handleOrderChange('title')}>Updated Date</MenuItemOption>
                </MenuOptionGroup>
                <MenuDivider  className={"my-2"}/>
                <MenuOptionGroup title='Order By' defaultValue='asc' type='radio' className={"my-2"}>
                    <MenuItemOption value='asc' onClick={() => handleDirectionChange('asc')}>Ascending</MenuItemOption>
                    <MenuItemOption value='desc' onClick={() => handleDirectionChange('desc')}>Descending</MenuItemOption>
                </MenuOptionGroup>
            </MenuList>
        </Menu>
    );
}

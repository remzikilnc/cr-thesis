import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import MainLogo from '@/assets/logos/logo.svg';
import { InputAdornment } from '@mui/material';
import {SearchField, VerticalSearch} from './styles';
import { Icon } from '@/assets/icons/Icons';
import { styled } from '@mui/system';
import CloseIcon from '@mui/icons-material/Close';

const w = [
    {
        id: 0,
        title: 'Cobol',
        imageUrl: MainLogo
    },
    {
        id: 1,
        title: 'JavaScript',
        imageUrl: MainLogo
    },
    {
        id: 2,
        title: 'Basic',
        imageUrl: MainLogo
    },
    {
        id: 3,
        title: 'PHP',
        imageUrl: MainLogo
    },
    {
        id: 4,
        title: 'Java',
        imageUrl: MainLogo
    }
]

const searchOptions = [
    'Option 1',
    'Option 2',
    'Option 3',
    // Diğer seçenekler...
];

const StyledTextField = styled(TextField)({
    borderRadius:'9999px',
    padding: 0,
        background: '#0e0e0e',
    '& .MuiInputLabel-root': {
        color: 'white',
    },
    '& .MuiInputBase-input': {
        color: 'white',
    },
    '& .MuiOutlinedInput-notchedOutline':{
      border:'0',
    },
    '& .MuiOutlinedInput-root': {
        padding:'5px',

        '& .MuiAutocomplete-input': {
            padding:'7.5px 4px 7.5px 10px',
        },
        '&:hover fieldset': {
            borderColor: 'currentColor',
        },
        '&.Mui-focused fieldset': {
            borderColor: 'currentColor',
            borderWidth: 1,
        },
    },
});

const CustomSearch = ({ onSearch, onResult, options }) => {
    const [searchText, setSearchText] = useState('');
    const handleSearch = (event, newValue, reason) => {
        if (reason === 'input') {
            setSearchText(newValue);
            if (onSearch) {
                onSearch(newValue);
            }
        }
    };

    const handleResult = (event, value) => {
        if (onResult) {
            onResult(value);
        }
    };

    return (
        <VerticalSearch>
            <SearchField>
                <Autocomplete
                    freeSolo
                    className={"rounded-full"}
                    options={searchOptions}
                    inputValue={searchText}
                    onInputChange={handleSearch}
                    onChange={handleResult}
                    renderInput={(params) => (
                        <StyledTextField
                            {...params}
                            placeholder="Ara.."
                            InputProps={{
                                ...params.InputProps,
                                startAdornment: (
                                  /*  bg-darkgray*/
                                    <div className={" h-10 w-10 rounded-full flex justify-center items-center"}>
                                        <InputAdornment  position="start" className={"mr-0"}>
                                            <button>
                                                <Icon name={'search'} fill={'white'} size={18}></Icon>
                                            </button>
                                        </InputAdornment>
                                    </div>
                                ),
                                endAdornment: searchText && (
                                    <InputAdornment position="end" onClick={() => setSearchText('')}>
                                        <CloseIcon style={{ color: "white", cursor: "pointer", fontSize: 20 }} ></CloseIcon>
                                    </InputAdornment>
                                ),
                            }}
                        />
                    )}
                />
            </SearchField>
        </VerticalSearch>
    );
};

export default CustomSearch;

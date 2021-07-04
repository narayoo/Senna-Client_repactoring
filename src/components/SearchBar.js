import React from 'react';
import styled from 'styled-components';
import { Link , useHistory } from 'react-router-dom'

const Search_Bar = styled.input`
  width: 100%;
  height: 3rem;
  border-radius: 25px;
  border: none;
  background-color: #e0e0e0;
  margin: 0 auto;
  color: #1b1b1b;
  background: linear-gradient( 90deg, #f5f5f5, #8d8d8d );
  box-shadow: 2px 2px 2px 2px gray inset;
  padding: 15px;

  &:focus {
  background: none;
  background-color: #f5f5f5;
  box-shadow: none;
  outline:none;
}
`;
const SearchForm = styled.form`
 max-width: 800px;
  width: 50%;
  height: 3rem;
`;
export default function SearchBar({}) {

  const history = useHistory();

  const onKeyPress = (e) => {
    if(e.key == 'Enter') {
      history.push('/search')
    }
  }
    
  return (
    <>
    {}
      <SearchForm method="post">
        <Search_Bar placeholder=' where do you want to go?' 
        onKeyPress={onKeyPress}
        ></Search_Bar>
      </SearchForm>
    </>
  )
}


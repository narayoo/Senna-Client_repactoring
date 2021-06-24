import styled from 'styled-components';

const Search_Bar = styled.input`
  max-width: 800px;
  width: 50%;
  height: 38px;
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

export default Search_Bar;
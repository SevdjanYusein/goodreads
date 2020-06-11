import React from 'react';
import Input from '../Input/Input';
import Button from '../Button/Button';

const SearchArea = (props) => {
  const searchConfig = {
    elementType: 'input',
    elementConfig: {
      type: 'text',
      placeholder: 'Serch book'
    }
  };
  
  return (
    <form onSubmit={props.searchBook}>
      <Input
        {...searchConfig}
        changed={props.handleSearch}
      />
      <Button type="submit" title="Search" />
    </form>
  );
};

export default SearchArea;

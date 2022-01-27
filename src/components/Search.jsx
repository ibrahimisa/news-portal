import React from "react";
import Category from "./Category";

const Search = (props) => (
  <>
    <h1>Search results for "{props.queryValue}" </h1>
    <Category
      loadNews={() => props.search(false)}
      handleLoadMore={() => props.search(true)}
      articles={props.searchResult.articles}
    />
  </>
);
export default Search;

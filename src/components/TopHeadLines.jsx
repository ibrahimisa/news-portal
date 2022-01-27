import React from "react";
import TopHeadLine from "./TopHeadLine";

export default function Categories(props) {
  props.topHeadlines.pop(); // remove general from categories
  return (
    <div>
      {props.topHeadlines.map((el, i) => {
        return (
          <TopHeadLine category={props.categories[i]} articles={el.articles} />
        );
      })}
    </div>
  );
}

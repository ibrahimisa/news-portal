import React from "react";
import CardGroup from "react-bootstrap/CardGroup";
import NewsCard from './NewsCard'

export default function TopHeadLinesTemplate(props) {

    const {category, articles= new Array(4).fill({})} = props
    
    return (
    <div>
      <h2 className="my-3">{category}</h2>
      <CardGroup
        className="p-2"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(20rem, 1fr))",
        }}
      >
        {Array.from({ length: 4 }).map((_, idx) => {

          return <NewsCard article={articles[idx]} />

        })}
      </CardGroup>
    </div>
  );
}

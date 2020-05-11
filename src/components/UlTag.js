import React, { useState, useEffect } from "react";
import LiTag from "./LiTag";
export default function UlTag(props) {
  let { ul } = props,
    [liTags, setLiTags] = useState([]);
  useEffect(() => {
    setLiTags(createLiTags(ul));
  }, [ul]);
  return (
    <ul className="mtr-ul">
      {liTags.map((li, ind) => (
        <LiTag key={"" + Date.now() + ind} {...{ li }} />
      ))}
    </ul>
  );
  function createLiTags(list) {
    let nested = /^\s{2}\-\s/.test(list),
      regex = nested
        ? "(^\\s{2}\\-s.*)+"
        : "(^\\-\\s.+\\n)|(^\\-\\s.+\\n)(?:^\\-\\s.+\\n)?(^\\s{2}\\-\\s.+\\s)+?";
    return list.split(new RegExp(regex, "gm"));
  }
}

import React from "react";
import { useNavigate } from "react-router-dom";
import {
  DirectoryItemContainer,
  BackGroundImage,
  DirectoryItemBody,
} from "./directory-item.styles.jsx";

const DirectoryItem = ({ category }) => {
  const { title, imageUrl, route } = category;
  const navigate = useNavigate();

  const onNavigateHanlder = () => navigate(route);
  return (
    <DirectoryItemContainer onClick={onNavigateHanlder}>
      <BackGroundImage imageUrl={imageUrl} />
      <DirectoryItemBody>
        <h2>{title}</h2>
        <p>Shop Now</p>
      </DirectoryItemBody>
    </DirectoryItemContainer>
  );
};

export default DirectoryItem;

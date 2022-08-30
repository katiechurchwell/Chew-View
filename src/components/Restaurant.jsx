import { ListGroup } from "react-bootstrap";
import { useEffect, useState } from "react";
import {getRestaurantCategories} from '../utilities/getRestaurantCategories';

function Restaurant() {
  const [loading, setLoading] = useState();
  const restaurantApiKey = "c449a8d1b1mshcbe3ee310732590p115c8ejsn3b8d1f48601a";

useEffect(() => {
  setLoading(true);

}, [])

  return (
    <ListGroup>
      <ListGroup.Item>RESTAURANT1</ListGroup.Item>
      <ListGroup.Item>RESTAURANT2</ListGroup.Item>
      <ListGroup.Item>RESTAURANT3</ListGroup.Item>
    </ListGroup>
  );
}

export default Restaurant;

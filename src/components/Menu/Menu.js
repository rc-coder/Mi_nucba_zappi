import styled from 'styled-components';
import { formatprice } from '../../Utils';
import { FoodGrid, Food, FoodLable } from './FoodGrid';
import { useSelector } from 'react-redux';
import { TagCard, TagImg, TagsMenu } from './TagsMenu';
import { useState } from 'react';

const MenuStyled = styled.div`
  height: 1000px;
  margin: 0px 20px 50px 20px;
  z-index: 3;
`;

export const Menu = ({ setOpenFood }) => {
  const [section, setSection] = useState(null);
  let { foods } = useSelector((state) => state.products);
  const { categories } = useSelector((state) => state.categories);

  if (section) {
    foods = { [section]: foods[section] };
  }

  return (
    <MenuStyled>
      <h2>Menu</h2>
      <TagsMenu>
        {section && (
          <TagCard onClick={() => setSection(null)}>
            <p>Mostrar Todo</p>
          </TagCard>
        )}
        {categories.map((category) => (
          <TagCard
            key={category.id}
            onClick={() => setSection(category.section)}
            selected={category.section === section}
          >
            <TagImg img={category.imgTag} />
            <p>{category.section}</p>
          </TagCard>
        ))}
      </TagsMenu>
      {Object.entries(foods).map(([sectionName, Foods]) => {
        return (
          <>
            <h3 key={Foods.id}>{sectionName}</h3>
            <FoodGrid key={Foods.id}>
              {Foods.map((food) => (
                <Food
                  key={food.id}
                  img={food.img}
                  onClick={() => setOpenFood(food)}
                >
                  <FoodLable key={food.id}>
                    <div>{food.name}</div>
                    <div>{formatprice(food.price)}</div>
                  </FoodLable>
                </Food>
              ))}
            </FoodGrid>
          </>
        );
      })}
    </MenuStyled>
  );
};

//ATENCION object.keys devuelve un array de las propiedades name de un objeto
// Object.entries devuelve la propiedad y el valor en formato de array
// Array [Array ["a", "somestring"], Array ["b", 42]]

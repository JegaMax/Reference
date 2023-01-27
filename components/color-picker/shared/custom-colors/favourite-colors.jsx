import { useAppSelector } from 'hooks';
import { memo } from 'react';
import { useAddFavouriteColorMutation } from 'appredux/services/auth/auth';
import { toRGBObject, toRGBString } from 'utils/parseColors';
import CustomColor from './custom-color';
import CustomColorsLabel from './custom-colors-label';
import CustomColorsWrapper from './custom-colors-wrapper';

const FavouriteColors = ({ selectedColor, color, handleColorChange }) => {
  const favouriteColors = useAppSelector((state) => state.auth.user?.favouriteColors);
  const [addFavouriteColor] = useAddFavouriteColorMutation();

  const handleFavouriteColorAdd = () => addFavouriteColor(toRGBString(color));

  return (
    <>
      <CustomColorsLabel title={'Favorites'} />
      <CustomColorsWrapper>
        <CustomColor withPlus={true} handleClick={handleFavouriteColorAdd} />

        {favouriteColors?.map((color, index) => (
          <CustomColor
            selectedColor={selectedColor}
            key={`favourite-color-${index}`}
            color={color}
            handleClick={() => handleColorChange(toRGBObject(color))}
          />
        ))}
      </CustomColorsWrapper>
    </>
  );
};

export default memo(FavouriteColors);

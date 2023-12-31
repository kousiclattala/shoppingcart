import {ImageSourcePropType} from 'react-native';

export type BottomBarItemProps = {
  id: number;
  name: string;
  selected: boolean;
  icon: ImageSourcePropType;
};

export type SubHeaderProps = {
  isScrolled: boolean;
  title: string;
  onPress: () => void;
  onCartPress: () => void;
};

export type ProductProps = {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
  isAddedToCart: boolean;
  isAddedToFavourite: boolean;
  quantity: number;
};

export type CartRenderProps = {
  item: ProductProps;
  index: number;
  onMinusPress: (item: ProductProps) => void;
  onPlusPress: (item: ProductProps) => void;
  onDeletePress: (item: ProductProps) => void;
};

export type HomeHeaderProps = {
  title: string;
};

export type ErrorComponentProps = {
  onPress: () => void;
};

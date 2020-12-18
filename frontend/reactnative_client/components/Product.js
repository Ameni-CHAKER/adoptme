import React, { Component } from 'react';
import { Dimensions, Image, FlatList, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';

//import Button from './Button';
import Block from './Block';
import Text  from './Text';
//import Input  from './Input';
import Divider  from './Divider';

const { width, height } = Dimensions.get('window');

const colors = {
  accent: "#F3534A",
  primary: "#0AC4BA",
  secondary: "#2BDA8E",
  tertiary: "#FFE358",
  black: "#323643",
  white: "#FFFFFF",
  gray: "#9DA3B4",
  gray2: "#C5CCD6",
};

const sizes = {
  // global sizes
  base: 16,
  font: 14,
  radius: 6,
  padding: 25,

  // font sizes
  h1: 26,
  h2: 20,
  h3: 18,
  title: 18,
  header: 16,
  body: 14,
  caption: 12,
};

const fonts = {
  h1: {
    fontSize: sizes.h1
  },
  h2: {
    fontSize: sizes.h2
  },
  h3: {
    fontSize: sizes.h3
  },
  header: {
    fontSize: sizes.header
  },
  title: {
    fontSize: sizes.title
  },
  body: {
    fontSize: sizes.body
  },
  caption: {
    fontSize: sizes.caption
  },
};

class Product extends Component {
/*   static navigationOptions = ({navigation}) => {
    return {
      headerRight: (
        <Button onPress={() => {}}>
          <Icon name="dots-three-horizontal" color={theme.colors.gray} />
        </Button>
      )
    }
  } */

  renderGallery() {
    const { product } = this.props;
    return (
      <FlatList
        horizontal
        pagingEnabled
        scrollEnabled
        showsHorizontalScrollIndicator={false}
        snapToAlignment="center"
        data={product.images}
        keyExtractor={(item, index) => `${index}`}
        renderItem={({item}) => (
          <Image
            source={item}
            resizeMode="contain"
            style={{ width, height: height / 2.8 ,marginTop:sizes.base * 3}}
          />
        )}
      />
    );
  }

  render() {
    const { product } = this.props;

    return (
      <ScrollView showsVerticalScrollIndicator={false} >
        {this.renderGallery()}

        <Block style={styles.product}>
          <Text h2 bold>{product.name}</Text>
          <Block flex={false} row margin={[sizes.base, 0]}>
            {product.tags.map(tag => (
              <Text key={`tag-${tag}`} caption gray style={styles.tag}>
                {tag}
              </Text>
            ))}
          </Block>
          <Text gray light height={22}>{product.description}</Text>
          
          <Divider margin={[sizes.padding * 0.9, 0]} />
          
          <Block>
            <Text semibold>Gallery</Text>
            <Block row margin={[sizes.padding * 0.9, 0]}>
              {product.images.slice(1, 3).map(
                (image, index) => (
                  <Image
                    key={`gallery-${index}`}
                    source={image}
                    style={styles.image}
                  />
                )
              )}
              <Block
                flex={false}
                card
                center
                middle
                color="rgba(197,204,214,0.20)"
                style={styles.more}
              >
                <Text gray>+{product.images.slice(3).length}</Text>
              </Block>
            </Block>
          </Block>
        </Block>
      </ScrollView>
    )
  }
}

Product.defaultProps = {
  product:  [
    {
      id: 1, 
      name: '16 Best Plants That Thrive In Your Bedroom',
      description: 'Bedrooms deserve to be decorated with lush greenery just like every other room in the house – but it can be tricky to find a plant that thrives here. Low light, high humidity and warm temperatures mean only certain houseplants will flourish.',
      tags: ['Interior', '27 m²', 'Ideas'],
      images: [
        require('../assets/images/plants_1.png'),
        require('../assets/images/plants_2.png'),
        require('../assets/images/plants_3.png'),
        // showing only 3 images, show +6 for the rest
        require('../assets/images/plants_1.png'),
        require('../assets/images/plants_2.png'),
        require('../assets/images/plants_3.png'),
        require('../assets/images/plants_1.png'),
        require('../assets/images/plants_2.png'),
        require('../assets/images/plants_3.png'),
      ]
    }
  ][0],
}

export default Product;

const styles = StyleSheet.create({
  product: {
    
    paddingHorizontal: sizes.base * 2,
    paddingVertical: sizes.padding,
  },
  tag: {
    borderColor: colors.gray2,
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: sizes.base,
    paddingHorizontal: sizes.base,
    paddingVertical: sizes.base / 2.5,
    marginRight: sizes.base * 0.625,
  },
  image: {
    
    width: width / 3.26,
    height: width / 3.26,
    marginRight: sizes.base,
  },
  more: {
    width: 55,
    height: 55,
  }
})

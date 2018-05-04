import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Text, View } from 'react-native';
import FastImage from 'react-native-fast-image';

// https://medium.com/one-more-thing-studio/caching-your-images-on-react-native-with-expo-7bff361dbd54

const bgArr = ['#B3E5FC', '#B2EBF2', '#B2DFDB',
  '#C8E6C9', '#DCEDC8', '#FFF9C4',
  '#FFECB3', '#FFE0B2', '#FFCCBC',
  '#EEEEEE', '#CFD8DC'];

export class CacheImage extends PureComponent {
  // Prop type warnings
  static propTypes = {
    userId: PropTypes.number,
    imgSize: PropTypes.number.isRequired,
    fontColor: PropTypes.string,
    imageUrl: PropTypes.string,
  }

  static defaultProps = {
    userId: 0,
    fontColor: '#626262',
    imageUrl: '',
  }

  getInitials() {
    let initials = '';
    if (this.props.fullName) {
      const nameParts = this.props.fullName.split(' ');
      for (let idx = 0; idx < nameParts.length; idx += 1) {
        initials += nameParts[idx][0];
      }
    }
    return initials;
  }

  bgColorRand() {
    return bgArr[Math.abs(this.props.userId % bgArr.length)];
  }

  fontSize() {
    if (this.props.imgSize === 100) {
      return 30;
    }
    if (this.props.imgSize === 30) {
      return 10;
    }
    if (this.props.imgSize === 190) {
      return 50;
    }
    return 16;
  }

  render() {
    return (
      <View style={[
          { width: this.props.imgSize, height: this.props.imgSize },
          this.props.containerStyle,
        ]}
      >
        <View style={{
          position: 'absolute',
          justifyContent: 'center',
          width: this.props.imgSize - 2,
          height: this.props.imgSize - 2,
          left: 1,
          borderRadius: (this.props.imgSize - 2) / 2,
          backgroundColor: this.bgColorRand(),
        }}
        >
          <Text style={{
            textAlign: 'center',
            backgroundColor: 'rgba(0,0,0,0)',
            fontSize: this.fontSize(),
            color: this.props.fontColor,
          }}
          >
            {this.getInitials()}
          </Text>
        </View>
        { this.props.userId !== 0 && (this.props.imageUrl && this.props.imageUrl !== '') &&
          <View>
            <FastImage
              source={{ uri: this.props.imageUrl }}
              style={{
                width: this.props.imgSize,
                height: this.props.imgSize,
                borderRadius: (this.props.imgSize - 2) / 2,
              }}
            />
          </View>
        }
      </View>
    );
  }
}

const UserImage = CacheImage;
export { UserImage };
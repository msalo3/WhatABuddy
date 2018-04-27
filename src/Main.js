import React, { Component } from 'react';
import {
  Text,
  View,
  ActivityIndicator,
  Image,
  Dimensions,
  TouchableOpacity
} from 'react-native';
import { connect } from 'react-redux';
import { FontAwesome } from '@expo/vector-icons'
import Deck from './Deck';
import Settings from './Settings';
import {
  getMorePictures,
  noLongerHittingApi,
  getBreeds,
  getPicturesOfABreed
} from './actions/apiActions';
import { saveBreed } from './actions/settingsActions';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;
const IMG_WIDTH = WIDTH * 0.90;
const IMG_HEIGHT = HEIGHT * 0.5;

const styles = {
  container: {
    flex: 1,
    justifyContent: 'space-between',
    paddingTop: 30
  },
  header: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  headerText: { fontSize: 50, textAlign: 'center' },
  image: {
    width: IMG_WIDTH,
    height: IMG_HEIGHT,
    left: 20
  }
};

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = { configOpen: false };
  }

  renderCard(item) {
    if (this.props.hittingTheApi) {
      this.props.noLongerHittingApi();
    }
    return (
      <View>
        <Image
          key={item.id}
          style={styles.image}
          source={{ uri: item.uri }}
        />
        <View style={{ height: 20 }} />
      </View>
    );
  }

  renderNoMoreCards() {
    const { hittingTheApi, breed } = this.props;
    if (!hittingTheApi) {
      if (breed) {
        console.log('Getting pictures of a', breed);
        this.props.getPicturesOfABreed(breed);
      } else {
        console.log('Getting pictures of NOT', breed);
        this.props.getMorePictures();
      }
    }
    return (
      <View style={{ flex: 1, justifyContent: 'center', paddingTop: 60 }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  render() {
    if (this.state.configOpen) {
      return (
        <Settings
          breeds={this.props.breeds}
          getBreeds={() => this.props.getBreeds()}
          configClosed={() => this.setState({ configOpen: false })}
          configSave={breed => this.props.saveBreed(breed)}
        />
      );
    }
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>What a buddy!</Text>
          <TouchableOpacity onPress={() => this.setState({ configOpen: true })}>
            <Text>
              <FontAwesome name="gear" size={32} color="blue" />
            </Text>
          </TouchableOpacity>
        </View>
        <View style={{ flex: 6 }}>
          <Deck
            onSwipeLeft={() => null}
            onSwipeRight={() => null}
            data={this.props.data}
            renderCard={item => this.renderCard(item)}
            renderNoMoreCards={() => this.renderNoMoreCards()}
          />
        </View>
        <View style={styles.header}>
          <Text style={{ fontSize: 25 }}>
            Currently Viewing: { `${this.props.breed}s` || 'All Dogs'}
          </Text>
        </View>
        <View style={styles.header}>
          <Text>
            <FontAwesome name="thumbs-o-down" size={32} color="red" />
          </Text>
          <Text style={{ fontSize: 32 }}>SWIPE AWAY!</Text>
          <Text>
            <FontAwesome name="thumbs-o-up" size={32} color="green" />
          </Text>
        </View>
      </View>
    );
  }
}

const mapStateToProps = ({ dataReducer, settingsReducer }) => {
  const { data, hittingTheApi, breeds } = dataReducer;
  const { breed } = settingsReducer;
  return {
    data,
    hittingTheApi,
    breeds,
    breed
  };
};

export default connect(mapStateToProps, {
  getMorePictures,
  noLongerHittingApi,
  getBreeds,
  getPicturesOfABreed,
  saveBreed
})(Main);

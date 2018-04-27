import React, { Component } from 'react';
import {
  Picker,
  View,
  Text,
  TouchableOpacity
} from 'react-native';
import { Header, Button } from 'react-native-elements';

const styles = {
  inputStyle: {
    height: 60,
    borderColor: 'gray',
    borderWidth: 1,
    fontSize: 20,
    flex: 1
  }
};

class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: 'Pug',
      message: ''
    };
  }

  componentWillMount() {
    if (this.props.breeds.length < 1) {
      this.props.getBreeds();
    }
  }

  maybeRenderMessage() {
    if (this.state.message === null) {
      return null;
    }
    return (
      <TouchableOpacity
        style={{ flex: 1, alignItems: 'center' }}
        onPress={() => this.setState({ message: null })}
      >
        <Text>{this.state.message}</Text>
      </TouchableOpacity>
    );
  }

  renderPickerItems() {
    const { breeds } = this.props;
    return breeds.map((item, i) => <Picker.Item label={item} value={item} key={i} />);
  }

  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'flex-start' }}>
        <Header
          leftComponent={{
            icon: 'chevron-left',
            color: '#fff',
            onPress: () => this.props.configClosed(),
            size: 25
          }}
          centerComponent={{ text: 'Settings', style: { color: '#fff', fontSize: 25 } }}
        />
        <View style={{ flex: 2 }} />
        <Text style={{ fontSize: 28, textAlign: 'center' }}>Select a Breed</Text>
        <Picker
          selectedValue={this.state.text}
          onValueChange={itemValue => this.setState({ text: itemValue })}
        >
          {this.renderPickerItems()}
        </Picker>
        <View style={{ flex: 2 }} />
        <View style={{ flex: 1 }}>
          <Button
            title="Save"
            onPress={() => {
              this.props.configSave(this.state.text);
              this.setState({ message: 'Settings have been saved!' });
            }}
            color="#fff"
            backgroundColor="#3e6dc5"
          />
        </View>
        <View style={{ flex: 1 }} />
        {this.maybeRenderMessage()}
        <View style={{ flex: 2 }} />
      </View>
    );
  }
}

export default Settings;

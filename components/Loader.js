/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Animated,
} from 'react-native';

var styles = StyleSheet.create({
  container: {
    width: 125,
    height: 125,
    flexDirection: 'row',
    justifyContent: 'center',
    flex: 0,
    alignItems: 'center'
  },
  bars: {
    width: 10,
    margin: 5
  },
});

class Loader extends Component {

  constructor (props) {
    super(props);

    this.state = {
      loading: [1,2,3].map(() => new Animated.Value(0)),
      opacity: [1,2,3].map(() => new Animated.Value(0.65)),
    };

    var loadingAnimation = () => {
      Animated.stagger(200,
        this.state.loading.map(
          (animation) => Animated.timing(animation, {toValue: 100})
        ).concat(
          this.state.loading.map(
            (animation) => Animated.timing(animation, {toValue: 50})
          )
        )
      ).start(() => { loadingAnimation(); });
    };

    var opacityAnimation = () => {
      Animated.stagger(200,
        this.state.opacity.map((animation) => Animated.timing(animation, {toValue: 1})).concat(
          this.state.opacity.map((animation) => Animated.timing(animation, {toValue: 0.65}))
        )
      ).start(() => { opacityAnimation(); });
    };

    loadingAnimation();
    setTimeout(() => { opacityAnimation(); }, 500);

  }

  render() {
    return (
      <View style={styles.container}>
        {[0,1,2].map((val) => (
              <Animated.View
                key={val}
                style={[
                  styles.bars,
                  {
                    backgroundColor: this.props.color,
                    height: this.state.loading[val],
                    opacity: this.state.opacity[val],
                  }]}
              />
            )
          )
        }
      </View>
    );
  }

}

module.exports = Loader;

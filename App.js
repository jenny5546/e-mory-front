import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import FeedNew from './components/FeedNew';
import FeedDetail from './components/FeedDetail';
import FeedEmoji from './components/FeedEmoji';
import Comment from './components/Comment';
import FeedListAll from './components/FeedListAll';
import FeedListSpecific from './components/FeedListSpecific';

export default class extends React.Component {
  state = {
    edit: true
  }

  render() {
    const { edit } = this.state;
    return edit ? <FeedListSpecific /> : <FeedNew />;
    // return (
    //   <View style={styles.container}>
    //     <Text>E-mory</Text>
    //   </View>
    // );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'pink',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

import React, { PropTypes, Component } from 'react'
import { ScrollView, View, Text, StyleSheet, Image, Dimensions, TouchableOpacity} from 'react-native';
import { Gear, Hamburger, Heart, TagLabel, MoreDots} from './../../components'
const { height,width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
  },
  descriptions: {
    backgroundColor: '#ffffff',
    paddingLeft: 10,
    paddingTop: 5,
    paddingBottom: 30,
    paddingRight: 10
  },
  separationLine: {
    borderColor: '#dddddd',
    borderBottomWidth: 1
  },
  iconContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
    marginTop: 5
  },
  heartIcon: {
    flexDirection: 'row',
  },
  addIcon: {
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },
  descriptionText: {
    marginTop: 10,
    fontSize: 12,
    marginBottom: 12
  },
  avatar: {
    flexDirection: 'row', 
    height: 50,
    width: 50,
    borderRadius: 25,
  },
  avatarName: {
    flexDirection: 'row', 
    backgroundColor: "#000000",
    color: '#ffffff',
    marginTop: 15,
    marginRight: 5,
    height: 20,
    borderRadius: 2
  },
  avatarContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginRight: 5,
    marginTop: 5
  },
  tagList:{
    marginTop: 8,
    flexDirection: 'row'
  },
  tagTitle: {
    fontSize: 12
  }
 
});



class PostContainer extends Component {
  static propTypes = {
    onPress: PropTypes.func,
    active: PropTypes.bool
  }
  constructor (props) {
    super(props)
    this.state = {
      active: props.active,
    }
  }
  componentDidMount() {
    // Set a ratio. We should allow picture with the height between 1/2 and 3/2 of the width
    Image.getSize(this.props.picture, (srcWidth, srcHeight) => {
      const maxHeight = Dimensions.get('window').height; // or something else
      const maxWidth = Dimensions.get('window').width;
      const imageRatio = srcWidth/srcHeight;
      this.setState({ width: width, height: width/imageRatio });
    }, error => {
      console.log('error:', error);
    });
  }

  onPress = () =>{
    console.log(this.props);
    const newState = !this.state.active;
     this.setState({
          active: newState
        });
 
    if(this.props.onPress) {
      this.props.onPress()
    } 
  }
  render(){
    console.log('**')
    console.log(this.props)
    return (
      <ScrollView style={styles.container}>
       <Image source={{uri:this.props.picture }} style={{ width: this.state.width, height: this.state.height }}>
        <View style={styles.avatarContainer} >
          <Text style={styles.avatarName}> nicolabortignon </Text>
          <Image style={styles.avatar} source={{uri:this.props.avatar}} /> 
        </View>
       </Image>
       <View style={styles.descriptions}>
        <View style={styles.iconContainer}>
          <Heart style={styles.heartIcon} onPress={this.onPress.bind(this)}/>
          <MoreDots style={styles.addIcon} onPress={this.onPress.bind(this)}/>
        </View>
        <View style={styles.separationLine} />
        <Text style={styles.descriptionText}>This is a detail description of something long.</Text>
        <View style={styles.tagList}>
          <Text style={styles.tagTitle}>Tags: </Text>
          <TagLabel description="Black & White" />
          <TagLabel description="Daily Fashion" />
          <TagLabel description="Trendy" />
        </View>
        <View style={styles.tagList}>
          <Text style={styles.tagTitle}>Brands: </Text>
          <TagLabel description="Adidas" />
          <TagLabel description="H&M" />
        </View>
       </View>
      </ScrollView>

    )
  }
}

export default PostContainer
import React, { Component } from 'react';
import {
  Box,
  Button,
  Grid,
  Image,
  Keyboard,
  Markdown,
} from 'grommet';
import {
  CaretNext,
  CaretPrevious,
} from 'grommet-icons';


class PostCorousel extends Component {
  state = {
    activeIndex: 0,
    posts: []
  };

  updatePosts(posts) {
    this.setState({posts: posts});
    posts.map(post => fetch(post.Post).then(response => response.text()).then(data => {
      post.Content = data;
      this.setState({posts: posts, activeIndex: posts.length-1});
    }))
  }

  componentDidMount() {
    const { title } = this.props;
    this.setState({
      title: title,
    });
    fetch('/posts.json')
      .then(response => response.json())
      .then(data => this.updatePosts(data.posts))
  }

  onRight = () => {
    const { activeIndex, posts } = this.state;

    if (activeIndex < posts.length - 1) {
      this.setState({
        activeIndex: activeIndex + 1,
        title: null,
      });
    }
  };

  onLeft = () => {
    const { activeIndex } = this.state;

    if (activeIndex > 0) {
      this.setState({
        activeIndex: activeIndex - 1,
        title: null,
      });
    }
  };

  postToUrl = (post) => {
    return post.Title.replace(" ", "_");
  }

  findIndex = function(posts, title) {
    if (!posts) {
      return -1;
    }
    for (let i= 0; i< posts.length; i++) {
      let posttitle = this.postToUrl(posts[i])
      if (title === posttitle) {
        return i;
      }
    }
  }

  render() {
    const { activeIndex, posts, title} = this.state;

    if (title) {
      let index = this.findIndex(posts, title);
      if (index !== -1) {
        if (activeIndex !== index) {
          this.setState({
            activeIndex: index,
          });
          return null;
        }
      } else {
        console.log("Post not found");
      }
    }

    var left = (activeIndex > 0 ? posts[activeIndex-1].Image : "1px.png");
    const leftpic = left;

    var center;
    if (posts.length > 0) {
      center = posts[activeIndex].Image;
    } else {
      center = "1px.png";
    }
    const centerpic = center;

    var right;
    if ((posts.length > 1) && (activeIndex < posts.length - 1)) {
      right = posts[activeIndex + 1].Image;
    } else {
      right = "1px.png";
    }
    const rightpic = right;

    const onLeft = this.onLeft;
    const onRight = this.onRight;

    var content;
    if (posts.length > 0) {
      if (posts[activeIndex].Content) {
        content = posts[activeIndex].Content;
      } else {
        content = "Loading...";
      }
    } else {
      content = "";
    }
    const postcontent = content;

    return (
      <Box flex align='center' justify='center'>
        <Keyboard onLeft={onLeft} onRight={onRight}>
          <Box height='medium' direction='row'>
            <Grid
              areas = {[
                { name: 'previcon', start: [0, 0], end: [0, 1] },
                { name: 'left', start: [1, 0], end: [1, 0] },
                { name: 'center', start: [2, 0], end: [2, 0] },
                { name: 'right', start: [3, 0], end: [3, 0] },
                { name: 'nexticon', start: [4, 0], end: [4, 1] },
                { name: 'title', start: [1, 1], end: [3, 1] },
              ]}
              columns = {['xxsmall', 'flex', 'medium', 'flex', 'xxsmall']}
              rows = {['medium', 'small']}
            >

              <Button
                fill
                icon={<CaretPrevious />}
                gridArea='previcon'
                onClick={onLeft}
                hoverIndicator
              />

              <Box gridArea='left' overflow='hidden'>
                <Image alignSelf='end' src={leftpic} fit='contain' opacity="0.2"/>
              </Box>

              <Box gridArea='center' direction="row">
                <Image alignSelf="center" src={centerpic} fit='contain'/>
              </Box>

              <Box gridArea='right' overflow='hidden'>
                <Image alignSelf='start' src={rightpic} fit='contain' opacity="0.2"/>
              </Box>

              <Button
                fill
                icon={<CaretNext />}
                gridArea='nexticon'
                onClick={onRight}
                hoverIndicator
              />
            </Grid>
          </Box>
        </Keyboard>
        <Box align="center" flex width="large">
          <Markdown>
            {postcontent}
          </Markdown>
        </Box>
      </Box>
    )
  }
}

export default PostCorousel

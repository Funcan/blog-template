import React, { Component } from 'react';
import {
  Box,
  Button,
  Collapsible,
  Grommet,
  Heading,
  Layer,
  ResponsiveContext,
} from 'grommet';
import {
  FormClose,
  Menu,
} from 'grommet-icons';

import AppBar from './Appbar'
import PostCorousel from './PostCorousel'
import Sidebar from './Sidebar'

const theme = {
  global: {
    colors: {
      brand: '#228BE6',
      buttonbg: '#FFA500',
      sidebar: '#114583',
    },
    font: {
      family: 'Roboto',
      size: '14px',
      height: '20px',
    },
  },
};




class Main extends Component {
  state = {
    showSidebar: false,
    loading: true,
    posts: [],
  }

  updatePosts(posts) {
    this.setState({posts: posts});
    posts.map(post => fetch(post.Post).then(response => response.text()).then(data => {post.Content = data; this.setState({posts: posts});}))
  }

  componentDidMount() {
    fetch('posts.json')
      .then(response => response.json())
      .then(data => this.updatePosts(data.posts))
  }

  render() {
    const { showSidebar } = this.state;
    const { posts } = this.state;

    return (
      <Grommet theme={theme} full>
        <ResponsiveContext.Consumer>
          {size => (
            <Box fill>
              <AppBar>
                <Button
                  icon={<Menu />}
                  onClick={() => this.setState(prevState => ({ showSidebar: !prevState.showSidebar }))}
                />
                <Heading level='3' margin='none'>funcan.github.io</Heading>
              </AppBar>
              <Box direction='row' flex overflow={{ horizontal: 'hidden' }}>
                {(!showSidebar || size !== 'small') ? (
                  <Collapsible direction="horizontal" open={showSidebar}>
                    <Box
                      flex
                      width='small'
                      background='sidebar'
                      elevation='small'
                      align='center'
                      justify='center'
                    >
                      {Sidebar}
                    </Box>
                  </Collapsible>
                ): (
                  <Layer>
                    <Box
                      background='sidebar'
                      tag='header'
                      justify='end'
                      align='center'
                      direction='row'
                    >
                      <Button
                        icon={<FormClose />}
                        onClick={() => this.setState({ showSidebar: false })}
                      />
                    </Box>
                    <Box
                      fill
                      align='center'
                      justify='center'
                    >
                      {Sidebar}
                    </Box>
                  </Layer>
                )}

                <Box flex align='center' justify='center'>
                  <PostCorousel posts={posts}>
                  </PostCorousel>
                </Box>

              </Box>
            </Box>
          )}
        </ResponsiveContext.Consumer>
      </Grommet>
    );
  }
}

export default Main;

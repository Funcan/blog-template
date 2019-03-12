import React, { Component } from 'react';
import {
  Box,
  Button,
  Collapsible,
  Grid,
  Grommet,
  Heading,
  Image,
  Keyboard,
  Layer,
  Markdown,
  ResponsiveContext,
} from 'grommet';
import {
  CaretNext,
  CaretPrevious,
  FormClose,
  Github,
  Linkedin,
  Mail,
  Menu,
  Rss,
  Search,
} from 'grommet-icons';

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

const sidebar = (
  <Box>
    <Box background='buttonbg' margin='xsmall' round='medium'>
      <Button
        icon={<Rss />}
	label="Subscribe"
	onClick={() => {}}
      />
    </Box>
    <Box background='buttonbg' margin='xsmall' round='medium'>
      <Button
        icon={<Search />}
	label='Posts'
	onClick={() => {}}
      />
    </Box>
    <Box background='buttonbg' margin='xsmall' round='medium'>
      <Button
        icon={<Mail />}
	label='EMail'
	onClick={() => {}}
      />
    </Box>
    <Box background='buttonbg' margin='xsmall' round='medium'>
      <Button
        icon={<Linkedin />}
	label='Connect'
	onClick={() => {}}
      />
    </Box>
    <Box background='buttonbg' margin='xsmall' round='medium'>
      <Button
        icon={<Github />}
	label='Code'
	onClick={() => {}}
      />
    </Box>
  </Box>
)

const postcontent = `
# Unit Testing Considered Difficult

Foo bar baz

More test would go here if I was a real post... Markdown stuff like **this** and __this__. Not sure if /this/ works too?
`;

const AppBar = (props) => (
  <Box
    tag='header'
    direction='row'
    align='center'
    justify='between'
    background='brand'
    pad={{ left: 'medium', right: 'small', vertical: 'small' }}
    elevation='medium'
    style={{ zIndex: '1' }}
    {...props}
  />
);

class PostCorousel extends Component {
  state = { activeIndex: 0};

  onRight = () => {
    const { activeIndex } = this.state;
    const { posts } = this.props;

    if (activeIndex < posts.length - 1) {
      this.setState({
        activeIndex: activeIndex + 1,
      });
    }
  };

  onLeft = () => {
    const { activeIndex } = this.state;

    if (activeIndex > 0) {
      this.setState({
        activeIndex: activeIndex - 1,
      });
    }
  };

  render() {
    const { posts } = this.props;

    const { activeIndex } = this.state;

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

    return (
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
              <Image alignSelf='end' src={leftpic} fit='contain'/>
            </Box>

            <Box gridArea='center' direction="row">
              <Image alignSelf="center" src={centerpic} fit='contain'/>
            </Box>

            <Box gridArea='right' overflow='hidden'>
              <Image alignSelf='start' src={rightpic} fit='contain'/>
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
    )
  }
}

class App extends Component {
  state = {
    showSidebar: false,
    loading: true,
    posts: [],
  }

  updatePosts(posts) {
    this.setState({posts: posts})
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
                      {sidebar}
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
                      {sidebar}
                    </Box>
                  </Layer>
                )}

                <Box flex align='center' justify='center'>
                  <PostCorousel posts={posts}>
                  </PostCorousel>
                  <Markdown>
                    {postcontent}
                  </Markdown>
                </Box>

              </Box>
            </Box>
          )}
        </ResponsiveContext.Consumer>
      </Grommet>
    );
  }
}

export default App;

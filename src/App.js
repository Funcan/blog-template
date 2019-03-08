import React, { Component } from 'react';
import {
  Box,
  Button,
  Carousel,
  Collapsible,
  Grommet,
  Heading,
  Image,
  Layer,
  Markdown,
  ResponsiveContext,
} from 'grommet';
import {
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

class App extends Component {
  state = {
    showSidebar: false,
  }

  render() {
    const { showSidebar } = this.state;
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
                  <Carousel>
                    <Image src="posts/unit-tests-1/unittests.png" />
                    <Image src="posts/unit-tests-2-mutation/biohazard.png" />
                  </Carousel>
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

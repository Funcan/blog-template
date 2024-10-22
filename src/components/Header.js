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
import Theme from './Theme'


class Header extends Component {
  state = {
    showSidebar: false,
  }


  render() {
    const { showSidebar } = this.state;
    const { post } = this.props;

    console.log("Header.render(): Post: " + post);

    let ContentChoice
    if (post) {
      ContentChoice = ( <PostCorousel title={post}/> )
    } else  {
      ContentChoice = ( <PostCorousel /> )
    }

    const Content = ContentChoice;

    return (
      <Grommet theme={Theme} full>
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
                  {Content}
                </Box>

              </Box>
            </Box>
          )}
        </ResponsiveContext.Consumer>
      </Grommet>
    );
  }
}

export default Header;

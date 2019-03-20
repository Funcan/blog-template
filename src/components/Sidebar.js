import React from 'react';
import {
  Box,
  Button,
} from 'grommet';
import {
  Github,
  Linkedin,
  Mail,
  Rss,
  Search,
} from 'grommet-icons';

const Sidebar = (
  <Box>
    <Box background='buttonbg' margin='xsmall' round='medium'>
      <Button
        icon={<Rss />}
	label='Subscribe'
	href='/rss.xml'
	target='#'
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
	href='mailto:duncan.thomas@gmail.com'
	target="#"
      />
    </Box>
    <Box background='buttonbg' margin='xsmall' round='medium'>
      <Button
        icon={<Linkedin />}
	label='Connect'
	href = "https://www.linkedin.com/in/duncanthomas/"
	target="#"
      />
    </Box>
    <Box background='buttonbg' margin='xsmall' round='medium'>
      <Button
        icon={<Github />}
	label='Code'
	href="https://github.com/Funcan"
	target="#"
      />
    </Box>
  </Box>
)

export default Sidebar

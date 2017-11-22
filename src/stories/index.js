import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';

import Globe from '../Globe'
import BarChart from '../BarChart'

storiesOf('Globe', module)
	.add('webGL tests', () => <Globe />)

storiesOf('BarChart', module)
	.add('D3 tests', () => <BarChart data={[1,2,4,9,16,9,4,2,1]} size ={[100,100]} />)

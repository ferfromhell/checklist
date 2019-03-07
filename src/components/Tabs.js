import React from 'react'
import { Tab } from 'semantic-ui-react'

import Checklist from './Checklist';

const panes = [
  { menuItem: 'Checklist', render: () => <Tab.Pane> <Checklist/> </Tab.Pane> },
  { menuItem: 'PNC', render: () => <Tab.Pane>PNC Checklist</Tab.Pane> }
]

const Tabs = () => <Tab panes={panes} />

export default Tabs
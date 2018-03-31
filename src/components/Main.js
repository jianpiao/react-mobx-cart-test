import React, {PropTypes} from 'react'
import {observer} from 'mobx-react'
import Content from './Content'

@observer
export default class Main extends React.Component {

  static contextTypes = {
    store: PropTypes.object
  }

  render() {
    const {store} = this.context
    return (
      <div className="main">
        {store.list.map((z, i) => <Content data={z} key={i}/>)}
      </div>
    )
  }
}

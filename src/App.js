import React from 'react'
import AppState from './stores'
import Provider from './components/Provider'
import Main from './components/Main'
import Footer from './components/Footer'
import Header from './components/Header'
import {observer} from 'mobx-react'
import './main.css'


const store = new AppState()

//  使用@observer  开启mobx的严格模式
@observer
export default class App extends React.Component {

  render() {
    return (
      //  把值传到父组件 供给自组建使用
      <Provider store={store}>
        <div className="container">
          <h1>React+Mobx简单的购物车示例</h1>
          <Header />
          <Main />
          <Footer />
        </div>
      </Provider>
    )
  }
}

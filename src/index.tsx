import * as React from "react"
import ReactDOM from "react-dom"
import App from "./components/app"
// import { Provider } from 'react-redux'
// import 'normalize.css';
// import '$css/style.css'
// import './stylesheets/index.styl'
import "./stylesheets/iconfont.css"

// import(/* webpackChunkName: "app" */ "./script/components/app")
//   .then(({ default: App }) => {
//     ReactDOM.render(<App />, document.getElementById("root"))
//   })
//   .catch((err) => {
//     console.log(err)
//   })

ReactDOM.render(<App />, document.getElementById("root"))

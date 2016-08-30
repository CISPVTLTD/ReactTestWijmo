import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Link, browserHistory, IndexRoute  } from 'react-router'
import Home from './components/home';
import Grid from './components/grid';
import About  from './components/about';
class App extends React.Component {
    render() {
        return (
           <div>
              <ul className="header-box">
                 <li><Link to="/home"> Home</Link></li>
                 <li><Link to="/grid"> Grid </Link></li>
                 <li><Link to="/about"> About</Link></li>

              </ul>
				
        {this.props.children}
        </div>
      )
         }
}

    export default App;


ReactDOM.render((
   <Router history = {browserHistory}>
      <Route path = "/" component = {App}>
          
         <IndexRoute component = {Home} />
         <Route path = "home" component = {Home} />
         <Route path = "about" component = {About} />
         <Route path = "grid" component = {Grid} />
      </Route>
   </Router>
	
    ), document.getElementById('app'))





import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from "./features/Home"
import Signin from "./features/Signin"
import Signup from "./features/Signup"
import Admin from "./features/Admin"
import AdminDashboard from "./features/AdminDashboard"
import ConsulterDemande from "./features/ConsulterDemande"
import Dashboard from "./features/Dashboard"
import DossierCompte from "./features/DossierCompte"
import DossierInfoPer from "./features/DossierInfoPer"
import DossierInfoPro from "./features/DossierInfoPro"
import DossierJustifs from "./features/DossierJustifs"
import ForgotPassword from "./features/ForgotPassword"
// import Calendar from "./features/Calendar"
// const Context = React.createContext({'user':{}});
function App() {
  return (
    <Switch>
      <Route exact path='/' component={Home}/>
      <Route path='/home' component={Home}/>
      <Route path='/signin' component={Signin}/>
      <Route path='/signup' component={Signup}/>
      <Route path='/admin' component={Admin}/>
      <Route path='/admin-dashboard' component={AdminDashboard}/>
      <Route path='/consulter-demande' component={ConsulterDemande}/>
      <Route path='/dossier-info-personnelles' component={DossierInfoPer}/>
      <Route path='/dossier-info-professionnelles' component={DossierInfoPro}/>
      <Route path='/dossier-justificatifs' component={DossierJustifs}/>
      <Route path='/dossier-compte' component={DossierCompte}/>
      <Route path='/dashboard' component={Dashboard}/>
      <Route path='/reset-password' component={ForgotPassword}/>
      {/* <Route path='/Calendar' component={Calendar}/> */}
    </Switch>
  );
}

export default App;

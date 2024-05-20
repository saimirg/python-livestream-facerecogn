import {
    Admin,
    Resource,
    CustomRoutes,
  } from "react-admin";
  import dataProvider from "./provider";
  import authProvider from "./provider/authProvider";
  import MyResourceList  from "./faceRecognition/list";
  import Dashboard  from "./faceRecognition/Dashboard";
  import Myshow  from "./faceRecognition/show";
  import { Route } from 'react-router-dom';
  import Charts from './components/Charts'
  
  export const App = () => {
    return(
      <Admin authProvider={authProvider} dataProvider={dataProvider} dashboard={Dashboard}>
        <Resource name="recognitions" list={MyResourceList} show={Myshow}/>
        <CustomRoutes>
          <Route path="/charts/:id/:name/:date" element={<Charts />} />
        </CustomRoutes>
      </Admin>
    )
  }
  
  
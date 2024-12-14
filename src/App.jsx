import { BrowserRouter, Route, Routes } from "react-router-dom"
import ChatComponent from "./components/chat-component"
import FooterComponent from "./components/footer-component"
import FormPage from "./Page/FormPage"

import AIGovernmentLandingPage from "./Page/LandingPage"
import CitizenFeedback from "./components/sentimentAnalysis-component"


function App(){
  return (
    <>
    {/* <AIGovernmentLandingPage/>
    <FormPage/> */}
    <div>
      
      <BrowserRouter>
      
      <Routes>
        <Route path="/" element={<AIGovernmentLandingPage/>}/>
        <Route path="/form" element ={ <FormPage/> }/>
        <Route path="/feedback" element={<CitizenFeedback/>}/>
      </Routes>
      
      </BrowserRouter>
    </div>
     
    </>
  )
}
export default App
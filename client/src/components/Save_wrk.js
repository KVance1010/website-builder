import React from "react";
import { saveContent } from '../utils/api';
import Auth from "../utils/auth";
// {buildCode: body.buildCode},{description: body.description},{title: body.title}
// codeCompileArr
const save = ({myProp}) => {
const saveCont = async (e) => {
    e.preventDefault();
    let title = prompt('what would you like to title your project')
    let desc = prompt('describe your project')
    console.log(myProp[0])
    // console.log(codeCompileArr.conte + 'props');
    // console.log({codeCompileArr} + "props with {");
    // console.log({codeCompileArr})
    let userData = {
        buildCode: myProp[0],
        title: title,
        description: desc
    }
    try {
        // const token = Auth.loggedIn() ? Auth.getToken() : null;
        // if (!token) {
        //   return false;
        // }
        userData.userId = Auth.getUserId();
        // let userId = 
        const response = await saveContent(userData);

        if (!response.ok) {
            throw new Error('something went wrong!');
        }

    } catch (err) {
        console.error(err);
    }
   
}
 return (
        <button onClick={saveCont}>
            Save Build
        </button>
    )
}
export default save;
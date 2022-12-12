import React from "react";
import { saveContent } from '../utils/api';
// {buildCode: body.buildCode},{description: body.description},{title: body.title}
// codeCompileArr
const save = (props) => {
const saveCont = async (e) => {
    e.preventDefault();
    let title = prompt('what would you like to title your project')
    let desc = prompt('describe your project')
    let userData = {
        buildCode: props.codeCompileArr,
        title: title,
        description: desc
    }
    try {
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
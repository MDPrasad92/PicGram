import * as type from './types'
import axios from 'axios'

function getImaginaryAction(data)
{
    return{
        type : type.Imaginary,
        payload:data
    }
}

export const asyncGetImaginaryAction = (url) =>{
    return async dispatch => {
      const res =  await axios.get(url)
      const { data: {pics}} = res;
      dispatch(getImaginaryAction(pics));
    }
}
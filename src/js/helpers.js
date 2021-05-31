import {TIME_OUT_SEC} from './config'

const timeout = function (s) {
    return new Promise(function (_, reject) {
        setTimeout(function () {
        reject(new Error(`Request took too long! Timeout after ${s} second`));
        }, s * 1000);
    });
};

export const AJAX = async function(url,uploadData = undefined) {
    try {
        const fetchPro = uploadData 
        ? fetch(url,{
            method:'POST',
            headers:{
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify(uploadData),
        })
        : fetch(url)

        const response = await Promise.race([fetchPro,timeout(TIME_OUT_SEC)]) 
        const data = await response.json()

        if(!response.ok) throw Error(`${data.message} (${response.status})`)
        return data
    } catch (error) {
        throw error
    }  
}

/*
export const getJSON = async (url) => {
    try {
        const response = await Promise.race([fetch(url),timeout(TIME_OUT_SEC)]) 
        const data = await response.json()
        if(!response.ok) throw Error(`${data.message} (${response.status})`)
        return data
    } catch (error) {
        throw error
    }  
}

export const sendJSON = async (url,uploadData) => {
    try {
        const fetchPro = fetch(url,{
            method:'POST',
            headers:{
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify(uploadData),
        })
        const response = await Promise.race([fetchPro,timeout(TIME_OUT_SEC)]) 
        const data = await response.json()
        if(!response.ok) throw Error(`${data.message} (${response.status})`)
        return data
    } catch (error) {
        throw error
    }  
}
*/
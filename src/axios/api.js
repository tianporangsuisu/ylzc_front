import request from "@/axios/axiosInstance";

export default {
    login:(username,password)=>{
        return request({
            url: `/user/login?username=${username}&password=${password}`,
            method: 'POST',
        })
    },
    getAllMachines:()=>{
        return request({
            url: `/device/all`,
            method: 'GET'
        })
    },
    getMachines:(id)=>{
        return request({
            url: `/member/${id}`
        })
    },
    getEnvirData:()=>{
        return request({
            url: `/environmentData/all`
        })
    },
    getImages:(deviceId)=>{
        return request({
            url: `environmentData/queryAllImageByDeviceId/${deviceId}`,
            method: 'POST'
        })
    },
    getPosition:(deviceId)=>{
        return request({
            url: `{{APIURL}}/machines/${deviceId}/status`,
            method: 'GET'
        })
    }
}
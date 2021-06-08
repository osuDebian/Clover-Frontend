
import axios from 'axios'

const loading = false;

const getScoreData = async (bid) => {
    try{
        let getdata = await axios({
            method: "get",
            url: `https://dev.debian.moe/api/v1/beatmap/scores`,
            data: {
                "Id": Number(bid),
                "Relax": true,
                "Mode": 0,
                "Page": 0
            }
        })
        return getdata.data;
    } catch (e) {
        loading = false;
        return console.log('error');
    }
}

const getServerOnline = async () => {
    try{
        let data = [];
        getdata = axios.get(`https://api.debian.moe/web/online`)
        .then(response => data = response.data)
        return data;
    } catch (e) {
        return console.log('error');
    }
}

const getTodayMostPlay = async () => {
    try{
        let data = [];
        getdata = axios.get(`https://api.debian.moe/web/today/most`)
        .then(response => data = response.data)
        return data;
    } catch (e) {
        return console.log('error');
    }
}

const getRecentRanked = async () => {
    try{
        let data = [];
        getdata = axios.get(`https://api.debian.moe/web/recent/ranked`)
        .then(response => data = response.data)
        return data;
    } catch (e) {
        return console.log('error');
    }
}


const scoreData = (bid) => getScoreData(bid);
const serverOnline = () => getServerOnline();
const todayMostPlay = () => getTodayMostPlay();
const recentRanked = () => getRecentRanked();

const Api = {
    scoreData,
    serverOnline,
    todayMostPlay,
    recentRanked,
    loading
}

export default Api;
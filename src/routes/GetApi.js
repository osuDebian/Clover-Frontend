
import axios from 'axios'

const getScoreData = async (bid) => {
    // console.log(bid);
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
        // console.log(getdata.data);
        return getdata.data;
    } catch (e) {
        return console.log('error');
    }
}

const scoreData = (bid) => getScoreData(bid);

const Api = {
    scoreData,
}

export default Api;
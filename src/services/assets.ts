import Config from 'react-native-config'
import get_all_assets from '../mocks/get_all_assets.json'

export default class Assets {

    async getAll(){

        if(Config.APP_MODE==='dev'){

            return Promise.resolve(get_all_assets)

        }else if(Config.APP_MODE==='prod'){

            const response = await fetch(`${Config.API_BASE_URI}/assets`)
            return response.json()

        }else{
            
            return Promise.resolve([])
            
        }

    }
}
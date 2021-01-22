import React, {useContext, useState} from "react";
import {Configuration, ConfigurationParameters, DevelopersApi} from "workout-api";

// interface IApiContext {
//     api: DevelopersApi
// }

const ApiContext = React.createContext<DevelopersApi>({} as DevelopersApi);

export function useApi(): DevelopersApi {
    return useContext(ApiContext);
}

export const ApiProvider = ({children}: any) => {

    // TODO - does the createApi call happen every time we render a component?
    // or every time we reload the SPA (hit refresh) or what?
    const [developersApi] = useState<DevelopersApi>(createApi());

    // useEffect(() =>{
    //     setDevelopersApi(createApi());
    // }, []);

    //setDevelopersApi(createApi());

    return (
        <ApiContext.Provider value={developersApi}>
            {children}
        </ApiContext.Provider>
    );
}

function createApi(): DevelopersApi {

    const configParams: ConfigurationParameters = {basePath: process.env.REACT_APP_API_BASE_URL};
    // console.log("configParams");
    // console.log(process.env.REACT_APP_API_BASE_URL);
    // console.log(configParams);
    const apiConfig: Configuration = new Configuration(configParams);
    return new DevelopersApi(apiConfig);

    // devApi.createPlaylist(2, ActivityType.Cardio)
    //     .then(r => console.log(r))
    //     .catch(r => console.log(r));
}


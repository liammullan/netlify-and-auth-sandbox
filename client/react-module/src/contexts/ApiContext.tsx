import React, {useContext, useEffect, useState} from "react";
import {Configuration, ConfigurationParameters, DevelopersApi} from "workout-api";
import {useAuth} from "./AuthContext";

// interface IApiContext {
//     api: DevelopersApi
// }

const ApiContext = React.createContext<DevelopersApi|undefined>({} as DevelopersApi);

export function useApi(): DevelopersApi|undefined {
    return useContext(ApiContext);
}

export const ApiProvider = ({children}: any) => {

    let [api, setApi] = useState<DevelopersApi>();

    // TODO - does the createApi call happen every time we render a component?
    // or every time we reload the SPA (hit refresh) or what?

    const authContext = useAuth();


    useEffect(() =>{
        if (authContext.user) {
            console.log("We have a user!")
            const token = authContext.user.getIdToken();
            console.log("token:");
            console.log(token);
            setApi(createApi(token));
        }else{
            setApi(undefined);
        }
    }, [authContext]);

    // useEffect(() =>{
    //     setDevelopersApi(createApi());
    // }, []);

    //setDevelopersApi(createApi());

    return (
        <ApiContext.Provider value={api}>
            {children}
        </ApiContext.Provider>
    );
}

function createApi(token: Promise<string>): DevelopersApi {

    const configParams: ConfigurationParameters = {
        basePath: process.env.REACT_APP_API_BASE_URL,
        apiKey: token,
        accessToken: token};

    // console.log("configParams");
    // console.log(process.env.REACT_APP_API_BASE_URL);
    // console.log(configParams);
    const apiConfig: Configuration = new Configuration(configParams);
    return new DevelopersApi(apiConfig);

    // devApi.createPlaylist(2, ActivityType.Cardio)
    //     .then(r => console.log(r))
    //     .catch(r => console.log(r));
}


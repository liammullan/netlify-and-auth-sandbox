import {useApi} from "../../contexts/ApiContext";
import {ActivityType} from 'workout-api';

export function HomeScreen() {
    // const authContext: IAuthContext = useAuth();
    // //console.log(authContext);
    // //const name = authContext.user.displayName;
    // //console.log(firebaseContext.firebase);
    // //console.log(firebaseContext.firebase.auth().currentUser);
    //
    // const name = authContext.user ? authContext.user.displayName : "Anon";

    const api = useApi();

    api.createPlaylist(2, ActivityType.Pilates)
        .then(r => console.log(r))
        .catch(err => console.log(err));

    return (
        <h2>Home screen.</h2>
    );

    // return <h2>Home screen. User: {name}</h2>
}
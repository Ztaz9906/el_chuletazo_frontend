import {Provider} from "react-redux";
import store from "@/servicios/redux/store.js";



const Providers = ({children}) => {
    return (
        <Provider store={store}>
            {children}
        </Provider>
    );
};

export default Providers;


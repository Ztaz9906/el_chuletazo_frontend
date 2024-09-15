import {Provider} from "react-redux";
import store from "@/servicios/redux/store.js";
import {ChakraProvider} from "@chakra-ui/react";


const Providers = ({children}) => {
    return (
        <Provider store={store}>
            <ChakraProvider>
                {children}
            </ChakraProvider>
        </Provider>
    );
};

export default Providers;


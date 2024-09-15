import {Provider} from "react-redux";
import store from "@/servicios/redux/store.js";
import {ChakraProvider} from "@chakra-ui/react";
import theme from "@/theme/theme.js";


const Providers = ({children}) => {
    return (
        <Provider store={store}>
            <ChakraProvider theme={theme}>
               <div className={'font-rounded'}>
                  {children}
               </div>
            </ChakraProvider>
        </Provider>
    );
};

export default Providers;


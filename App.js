import React from 'react';
import { Root } from 'native-base'
import { Provider } from 'react-redux'
import store from './src/redux/store'
import SplashScreen from './src/components/SplashScreen'

const App: () => React$Node = () => {
	return (
		<Root>
			<Provider store={store}>
				{/*<Navigator />*/}
				<SplashScreen />
			</Provider>
		</Root>
	);
};

export default App;
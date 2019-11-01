import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

import Main from './pages/Main';
import User from './pages/User';

const Routes = createAppContainer(
  createStackNavigator(
    {
      Main,
      User,
    },
    {
      headerLayoutPreset: 'center', // centralizar texto header
      headerBackTitleVisible: false, // não mostrar texto do link para retornar
      // configurações padrão do navigation
      defaultNavigationOptions: {
        // estilo do header
        headerStyle: {
          backgroundColor: '#7159c1',
        },
        headerTintColor: '#FFF', // cor do titulo do header
      },
    }
  )
);

export default Routes;

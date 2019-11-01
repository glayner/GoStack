import Reactotron from 'reactotron-react-native';

if (__DEV__) {
  const tron = Reactotron.configure({host: '192.168.25.29'})
    .useReactNative()
    .connect();
  // cria variavel tron no escopo global para ser acessado por todos sem ter que importar sempre o reactotron
  console.tron = tron;

  tron.clear(); // limpa toda timeline depois de dar um refresh na aplicação
}

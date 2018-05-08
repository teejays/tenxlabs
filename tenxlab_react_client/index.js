import { AppRegistry } from 'react-native';
import { YellowBox } from 'react-native';
import App from './App';

AppRegistry.registerComponent('TenXLab', () => App);
YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);
YellowBox.ignoreWarnings(['Remote debugger is in a background tab', 'Module RCTImageLoader']);


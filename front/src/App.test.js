import React from 'react';
import { shallow } from 'enzyme';
import { StyleSheetTestUtils } from 'aphrodite';
import App from './App';
import About from './views/About';
import Authentication from './views/Authentication';
import Dashboard from './views/Dashboard';
import NotFound from './views/NotFound';
import MainView from './components/dashboard/mainview/MainView';
import Login from './components/authentication/Login';
import Register from './components/authentication/Register';
import Validation from './components/authentication/Validation';
import RoundedButton from './components/buttons/RoundedButton';
import RoundedIcon from './components/buttons/RoundedIcon';
import Footer from './components/Footer';
import HeaderDb from './components/dashboard/header/HeaderDb';
import ServiceIcon from './components/dashboard/sidebar/ServiceIcon';
import SideBar from './components/dashboard/sidebar/SideBar';
import PlusView from './components/dashboard/sidebar/PlusService';
import WidgetsContainer from './components/dashboard/mainview/widgets/WidgetsContainer';
import Widget from './components/dashboard/mainview/widgets/Widget';
import AddWidget from './components/dashboard/mainview/widgets/AddWidget';
import GithubOwnFavsWidget from './components/dashboard/mainview/widgets/github/GithubOwnFavsWidget';
import GithubOwnFollowersWidget from './components/dashboard/mainview/widgets/github/GithubOwnFollowersWidget';
import GithubOwnReposWidget from './components/dashboard/mainview/widgets/github/GithubOwnReposWidget';
import GithubWidgets from './components/dashboard/mainview/widgets/github/GithubWidgets';
import TwitchWidgets from './components/dashboard/mainview/widgets/twitch/TwitchWidgets';
import WeatherWidgets from './components/dashboard/mainview/widgets/weather/WeatherWidgets';
import YoutubeWidgets from './components/dashboard/mainview/widgets/youtube/YoutubeWidgets';
import TwitchStreamWidget from './components/dashboard/mainview/widgets/twitch/TwitchStreamWidget';
import TwitchUserWidget from './components/dashboard/mainview/widgets/twitch/TwitchUserWidget';
import WeatherTemperatureWidget from './components/dashboard/mainview/widgets/weather/WeatherTemperatureWidget';
import YoutubeSubsWidget from './components/dashboard/mainview/widgets/youtube/YoutubeSubsWidget';
import YoutubeViewWidgets from './components/dashboard/mainview/widgets/youtube/YoutubeViewsWidget';
import DeleteWidget from './components/dashboard/mainview/widgets/widgets_actions/DeleteWidget';
import SettingsWidget from './components/dashboard/mainview/widgets/widgets_actions/SettingsWidget';

StyleSheetTestUtils.suppressStyleInjection();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory: () => ({
    push: jest.fn()
  })
}));

describe('Views rendering tests', () => {
  it('App renders without crashing', () => {
    shallow(<App />);
  });
  it('About renders without crashing', () => {
    shallow(<About />);
  });
  it('Authentication renders without crashing', () => {
    shallow(<Authentication />);
  });
  it('Dashboard renders without crashing', () => {
    shallow(<Dashboard />);
  });
  it('NotFound renders without crashing', () => {
    shallow(<NotFound />);
  });
});

describe('Authentication components rendering tests', () => {
  it('Login renders without crashing', () => {
    shallow(<Login />);
  });
  it('Register renders without crashing', () => {
    shallow(<Register />);
  });
  it('Validation renders without crashing', () => {
    shallow(<Validation />);
  });
});

describe('Buttons components rendering tests', () => {
  it('RoundedButton renders without crashing', () => {
    shallow(<RoundedButton />);
  });
  it('RoundedIcon renders without crashing', () => {
    shallow(<RoundedIcon />);
  });
});

describe('Dashboard components rendering tests', () => {
  it('MainView renders without crashing', () => {
    shallow(<MainView />);
  });
  it('HeaderDb renders without crashing', () => {
    shallow(<HeaderDb />);
  });
  it('ServiceIcon renders without crashing', () => {
    shallow(<ServiceIcon />);
  });
  it('SideBar renders without crashing', () => {
    shallow(<SideBar />);
  });
  it('PlusService renders without crashing', () => {
    shallow(<PlusView />);
  });
});

describe('Widgets components rendering tests', () => {
  it('WidgetsContainer renders without crashing', () => {
    shallow(<WidgetsContainer />);
  });
  it('Widget renders without crashing', () => {
    shallow(<Widget />);
  });
  it('AddWidget renders without crashing', () => {
    shallow(<AddWidget />);
  });
  it('GithubWidgets renders without crashing', () => {
    shallow(<GithubWidgets />);
  });
  it('TwitchWidgets renders without crashing', () => {
    shallow(<TwitchWidgets />);
  });
  it('WeatherWidgets renders without crashing', () => {
    shallow(<WeatherWidgets />);
  });
  it('Youtube renders without crashing', () => {
    shallow(<YoutubeWidgets />);
  });
  it('GithubOwnFavsWidget renders without crashing', () => {
    shallow(<GithubOwnFavsWidget />);
  });
  it('GithubOwnFollowersWidget renders without crashing', () => {
    shallow(<GithubOwnFollowersWidget />);
  });
  it('GithubOwnReposWidget renders without crashing', () => {
    shallow(<GithubOwnReposWidget />);
  });
  it('TwitchStreamWidget renders without crashing', () => {
    shallow(<TwitchStreamWidget />);
  });
  it('TwitchUserWidget renders without crashing', () => {
    shallow(<TwitchUserWidget />);
  });
  it('WeatherTemperatureWidget renders without crashing', () => {
    shallow(<WeatherTemperatureWidget />);
  });
  it('YoutubeSubsWidget renders without crashing', () => {
    shallow(<YoutubeSubsWidget />);
  });
  it('YoutubeViewWidgets renders without crashing', () => {
    shallow(<YoutubeViewWidgets />);
  });
  it('DeleteWidget renders without crashing', () => {
    shallow(<DeleteWidget />);
  });
  it('SettingsWidget renders without crashing', () => {
    shallow(<SettingsWidget />);
  });
});

describe('Other components rendering tests', () => {
  it('Footer renders without crashing', () => {
    shallow(<Footer />);
  });
});

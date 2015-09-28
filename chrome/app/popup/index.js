require('expose?$!expose?jQuery!jquery');
require('expose?React!react');
require('../../assets/stylesheets/application.css');
require('bootstrap/dist/css/bootstrap.min.css');

import {settings} from '../settings'
import OpenedGames from '../../../app/components/OpenedGames';
import StartedGames from '../../../app/components/StartedGames';
import ReactDOM from 'react-dom';

$(() => {
  ReactDOM.render(<OpenedGames type="opened"/>, $('#opened_games')[0]);
  ReactDOM.render(<StartedGames type="started"/>, $('#started_games')[0]);
});

import { connect } from 'react-redux';
import Dashboard from '../components/Dashboard';
import * as userActions from '../store/user/actions';

export default connect(null, userActions)(Dashboard);

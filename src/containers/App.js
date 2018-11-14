import { connect } from 'react-redux';
import App from '../components/App';
import { signup } from '../reducers/isRegistered';
import { updateUsername } from '../reducers/username';

const mapStateToProps = ({ username, isRegistered }) => ({ username, isRegistered });

export default connect(mapStateToProps, { signup, updateUsername })(App);

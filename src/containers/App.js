import { connect } from 'react-redux';
import App from '../components/App';

const mapStateToProps = ({ username, isRegistered }) => ({ username, isRegistered });

export default connect(mapStateToProps)(App);

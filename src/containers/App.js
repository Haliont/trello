import { connect } from 'react-redux';
import * as userSelectors from '../store/user/selectors';
import App from '../components/App';

const mapStateToProps = state => ({
  isSignedIn: userSelectors.isSignedIn(state),
});

export default connect(mapStateToProps)(App);

import { connect } from 'react-redux';
import { signIn } from '../store/user/actions';
import { isSigningIn } from '../store/user/selectors';
import Component from '../components/SignIn';

const mapStateToProps = state => ({
  isSigningIn: isSigningIn(state),
});

export default connect(
  mapStateToProps,
  { signIn },
)(Component);

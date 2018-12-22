import { connect } from 'react-redux';
import { signUp } from '../store/user/actions';
import { isSigningUp } from '../store/user/selectors';
import Component from '../components/SignUp';

const mapStateToProps = state => ({
  isSigningUp: isSigningUp(state),
});

export default connect(
  mapStateToProps,
  { signUp },
)(Component);

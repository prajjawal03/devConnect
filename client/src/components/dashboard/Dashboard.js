import React, { useEffect } from "react";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
import { getCurrentProfile } from "../../actions/profile";
const Dashboard = ({ getCurrentProfile, profile, loading }) => {
  useEffect(() => {
    getCurrentProfile();
  }, [getCurrentProfile]);
  return <>{loading && profile === null ? <Spinner /> : <>hello</>}</>;
};
const mapStateToProps = (state) => ({
  profile: state.profile.profile,
  loading: state.auth.loading,
});
export default connect(mapStateToProps, { getCurrentProfile })(Dashboard);

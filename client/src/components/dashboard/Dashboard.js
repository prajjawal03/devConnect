import React, { useEffect } from "react";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
import { getCurrentProfile } from "../../actions/profile";
const Dashboard = ({ getCurrentProfile, profile, loading, auth: { user } }) => {
  useEffect(() => {
    getCurrentProfile();
  }, [getCurrentProfile]);
  return (
    <>
      {loading && profile === null ? (
        <Spinner />
      ) : (
        <>
          {profile === null ? (
            <>
              <h1>welcome {user.name}</h1>
              <p>you dont have a profile!</p>
            </>
          ) : (
            <>
              <h1>welcome {user.name}</h1>
              <p>you have a profile!</p>
            </>
          )}
        </>
      )}
    </>
  );
};
const mapStateToProps = (state) => ({
  profile: state.profile.profile,
  loading: state.profile.loading,
  auth: state.auth,
});
export default connect(mapStateToProps, { getCurrentProfile })(Dashboard);

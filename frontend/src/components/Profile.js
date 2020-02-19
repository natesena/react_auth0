import React, { Fragment } from "react";
import { useAuth0 } from "../react-auth0-wrapper";

const Profile = () => {
  const { loading, user } = useAuth0();

  if (loading || !user) {
    return <div>{loading ? "Loading..." : "No user to see"}</div>;
  }

  return (
    <div>
      <Fragment>
        <img src={user.picture} alt="Profile" className={"profile-picture"} />
        <h2 className={"profile-name"}>{user.name}</h2>
        <p>{user.email}</p>
        <code>{JSON.stringify(user, null, 2)}</code>
      </Fragment>
    </div>
  );
};

export default Profile;
